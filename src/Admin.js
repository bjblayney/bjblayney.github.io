import React, { useState, useEffect, useRef, useCallback } from 'react';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { collection, addDoc, serverTimestamp, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';
import { auth, db } from './firebase';
import { BookPage, BackLink, HorizontalRule } from './styles';

const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB

function formatBytes(bytes) {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
}

export default function Admin() {
  const [user] = useAuthState(auth);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState('');
  const [error, setError] = useState('');
  const [recentUploads, setRecentUploads] = useState([]);
  const [dragging, setDragging] = useState(false);
  const fileInputRef = useRef(null);

  const fetchRecent = useCallback(async () => {
    const q = query(collection(db, 'images'), orderBy('timestamp', 'desc'), limit(6));
    const snapshot = await getDocs(q);
    setRecentUploads(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
  }, []);

  useEffect(() => {
    if (user) fetchRecent();
  }, [user, fetchRecent]);

  const validateFile = (f) => {
    if (!ACCEPTED_TYPES.includes(f.type)) {
      return 'File type not supported. Use JPEG, PNG, WebP, or GIF.';
    }
    if (f.size > MAX_FILE_SIZE) {
      return `File too large (${formatBytes(f.size)}). Maximum is 10 MB.`;
    }
    return null;
  };

  const selectFile = (f) => {
    setError('');
    setUploadedUrl('');
    setProgress(0);

    const validationError = validateFile(f);
    if (validationError) {
      setError(validationError);
      setFile(null);
      setPreview(null);
      return;
    }

    setFile(f);
    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result);
    reader.readAsDataURL(f);
  };

  const handleFileChange = (e) => {
    if (e.target.files[0]) selectFile(e.target.files[0]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const dropped = e.dataTransfer.files[0];
    if (dropped) selectFile(dropped);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => setDragging(false);

  const handleUpload = () => {
    if (!file) return;
    setUploading(true);
    setError('');

    const storage = getStorage();
    const timestamp = Date.now();
    const storageRef = ref(storage, `images/${timestamp}_${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        setProgress(Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100));
      },
      (err) => {
        setError('Upload failed: ' + err.message);
        setUploading(false);
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        await addDoc(collection(db, 'images'), {
          url: downloadURL,
          name: file.name,
          timestamp: serverTimestamp(),
        });
        setUploadedUrl(downloadURL);
        setUploading(false);
        setFile(null);
        setPreview(null);
        fetchRecent();
      }
    );
  };

  const clearSelection = () => {
    setFile(null);
    setPreview(null);
    setError('');
    setProgress(0);
    setUploadedUrl('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  if (!user) {
    return (
      <BookPage>
        <p style={styles.body}>Please log in to access the admin area.</p>
        <Link to="/login" style={styles.link}>Go to Login</Link>
      </BookPage>
    );
  }

  return (
    <BookPage>
      <BackLink as={Link} to="/">Title Page</BackLink>

      <div style={{ marginTop: 32 }}>
        <h1 style={styles.heading}>Gallery Admin</h1>
        <p style={styles.meta}>
          Signed in as {user.email}
          <span style={styles.separator}>/</span>
          <button onClick={() => signOut(auth)} style={styles.signOut}>Sign Out</button>
        </p>
      </div>

      <HorizontalRule />

      {/* Upload area */}
      <section>
        <h2 style={styles.sectionHeading}>Upload Image</h2>

        <div
          onClick={() => !uploading && fileInputRef.current?.click()}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          style={{
            ...styles.dropZone,
            borderColor: dragging ? '#8B4513' : '#D4C5A9',
            backgroundColor: dragging ? 'rgba(139,69,19,0.04)' : 'transparent',
          }}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept={ACCEPTED_TYPES.join(',')}
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
          {preview ? (
            <img src={preview} alt="Preview" style={styles.previewImage} />
          ) : (
            <div style={styles.dropText}>
              <span style={styles.dropIcon}>+</span>
              <span>Drop an image here or click to browse</span>
              <span style={styles.dropHint}>JPEG, PNG, WebP, GIF — max 10 MB</span>
            </div>
          )}
        </div>

        {file && (
          <div style={styles.fileInfo}>
            <span>{file.name}</span>
            <span style={styles.fileSize}>{formatBytes(file.size)}</span>
            {!uploading && (
              <button onClick={clearSelection} style={styles.clearBtn}>Remove</button>
            )}
          </div>
        )}

        {error && <p style={styles.error}>{error}</p>}

        {uploading && (
          <div style={styles.progressTrack}>
            <div style={{ ...styles.progressBar, width: `${progress}%` }} />
            <span style={styles.progressLabel}>{progress}%</span>
          </div>
        )}

        {file && !uploading && (
          <button onClick={handleUpload} style={styles.uploadBtn}>
            Upload
          </button>
        )}

        {uploadedUrl && (
          <p style={styles.success}>Image uploaded successfully.</p>
        )}
      </section>

      <HorizontalRule />

      {/* Recent uploads */}
      <section>
        <h2 style={styles.sectionHeading}>Recent Uploads</h2>
        {recentUploads.length === 0 ? (
          <p style={styles.body}>No images yet.</p>
        ) : (
          <div style={styles.recentGrid}>
            {recentUploads.map((img) => (
              <div key={img.id} style={styles.recentItem}>
                <img src={img.url} alt={img.name || ''} style={styles.recentThumb} />
                <span style={styles.recentName}>{img.name}</span>
              </div>
            ))}
          </div>
        )}
      </section>
    </BookPage>
  );
}

const styles = {
  heading: {
    fontFamily: "'EB Garamond', serif",
    fontSize: '2rem',
    fontWeight: 700,
    color: '#2C2C2C',
    margin: '0 0 8px',
  },
  sectionHeading: {
    fontFamily: "'EB Garamond', serif",
    fontSize: '1.4rem',
    fontWeight: 600,
    color: '#2C2C2C',
    margin: '0 0 16px',
  },
  meta: {
    fontFamily: "'Space Mono', monospace",
    fontSize: '0.75rem',
    color: '#7A7A7A',
    letterSpacing: '0.04em',
    margin: 0,
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    flexWrap: 'wrap',
  },
  separator: {
    color: '#D4C5A9',
  },
  signOut: {
    background: 'none',
    border: 'none',
    color: '#8B4513',
    fontFamily: "'Space Mono', monospace",
    fontSize: '0.75rem',
    cursor: 'pointer',
    padding: 0,
    margin: 0,
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    display: 'inline',
  },
  body: {
    fontFamily: "'EB Garamond', serif",
    fontSize: '1.1rem',
    color: '#2C2C2C',
    lineHeight: 1.6,
  },
  link: {
    fontFamily: "'Space Mono', monospace",
    fontSize: '0.8rem',
    color: '#8B4513',
    textDecoration: 'none',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
  },
  dropZone: {
    border: '2px dashed #D4C5A9',
    borderRadius: 2,
    padding: 32,
    textAlign: 'center',
    cursor: 'pointer',
    transition: 'border-color 0.2s, background-color 0.2s',
    minHeight: 180,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dropText: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 8,
    fontFamily: "'EB Garamond', serif",
    fontSize: '1.05rem',
    color: '#7A7A7A',
  },
  dropIcon: {
    fontFamily: "'Space Mono', monospace",
    fontSize: '2rem',
    color: '#D4C5A9',
    lineHeight: 1,
  },
  dropHint: {
    fontFamily: "'Space Mono', monospace",
    fontSize: '0.65rem',
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    color: '#BBBBBB',
    marginTop: 4,
  },
  previewImage: {
    maxWidth: '100%',
    maxHeight: 300,
    objectFit: 'contain',
    borderRadius: 2,
  },
  fileInfo: {
    fontFamily: "'Space Mono', monospace",
    fontSize: '0.75rem',
    color: '#2C2C2C',
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    marginTop: 12,
    flexWrap: 'wrap',
  },
  fileSize: {
    color: '#7A7A7A',
  },
  clearBtn: {
    background: 'none',
    border: 'none',
    color: '#8B4513',
    fontFamily: "'Space Mono', monospace",
    fontSize: '0.7rem',
    cursor: 'pointer',
    padding: 0,
    margin: 0,
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    display: 'inline',
  },
  error: {
    fontFamily: "'Space Mono', monospace",
    fontSize: '0.75rem',
    color: '#A94442',
    marginTop: 12,
  },
  progressTrack: {
    position: 'relative',
    height: 6,
    background: '#EDE8E0',
    borderRadius: 3,
    marginTop: 16,
    overflow: 'hidden',
  },
  progressBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    background: '#8B4513',
    borderRadius: 3,
    transition: 'width 0.2s ease',
  },
  progressLabel: {
    position: 'absolute',
    right: 0,
    top: -18,
    fontFamily: "'Space Mono', monospace",
    fontSize: '0.65rem',
    color: '#7A7A7A',
  },
  uploadBtn: {
    display: 'block',
    marginTop: 16,
    padding: '10px 28px',
    background: 'transparent',
    color: '#8B4513',
    border: '1px solid #D4C5A9',
    fontFamily: "'Space Mono', monospace",
    fontSize: '0.8rem',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    cursor: 'pointer',
    transition: 'border-color 0.2s, background-color 0.2s',
  },
  success: {
    fontFamily: "'Space Mono', monospace",
    fontSize: '0.75rem',
    color: '#4A7C59',
    marginTop: 12,
  },
  recentGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: 12,
  },
  recentItem: {
    display: 'flex',
    flexDirection: 'column',
    gap: 6,
  },
  recentThumb: {
    width: '100%',
    aspectRatio: '1',
    objectFit: 'cover',
    borderRadius: 2,
    border: '1px solid #D4C5A9',
  },
  recentName: {
    fontFamily: "'Space Mono', monospace",
    fontSize: '0.6rem',
    color: '#7A7A7A',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
};
