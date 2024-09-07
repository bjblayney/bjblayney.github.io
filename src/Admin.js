import React, { useState } from 'react';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { auth } from './firebase'; // Your Firebase configuration
import { useAuthState } from 'react-firebase-hooks/auth';

import { doc, setDoc, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from './firebase'; // Import Firestore

import { signOut } from 'firebase/auth';

const Admin = () => {
  const [user] = useAuthState(auth); // Use Firebase auth hook to check if logged in
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [imageUrl, setImageUrl] = useState('');

  const handleSignOut = () => {
    signOut(auth).then(() => {
      console.log('Signed out successfully');
    });
  };

  // Handle file selection
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Handle file upload
  const handleFileUpload = () => {
    if (!file) {
      alert('Please select a file first!');
      return;
    }

    const storage = getStorage();
    const storageRef = ref(storage, `images/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);
      },
      (error) => {
        console.error('Upload failed:', error);
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        // Store image metadata in Firestore
        await addDoc(collection(db, 'images'), {
          url: downloadURL,
          name: file.name,
          timestamp: serverTimestamp(), // Automatically add a timestamp
        });
        setImageUrl(downloadURL); // Display the uploaded image
      }
    );
  };

  if (!user) {
    return <p>Please log in to upload files</p>; // Ensure user is logged in
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '300px', margin: '0 auto', gap: '1rem', alignItems: 'center' }}>
      <h1>Admin Page</h1>
      <button
        onClick={handleSignOut}
        style={{
          padding: '0.5rem 1rem',
          border: 'none',
          borderRadius: '4px',
          backgroundColor: '#007BFF',
          color: '#fff',
          cursor: 'pointer',
          transition: 'background-color 0.3s',
        }}
        onMouseOver={(e) => (e.target.style.backgroundColor = '#0056b3')}
        onMouseOut={(e) => (e.target.style.backgroundColor = '#007BFF')}
      >
        Sign Out
      </button>
      <input
        type="file"
        onChange={handleFileChange}
        style={{
          padding: '0.5rem',
          border: '1px solid #ccc',
          borderRadius: '4px',
          fontSize: '1rem',
          outline: 'none',
          transition: 'border-color 0.3s',
        }}
        onFocus={(e) => (e.target.style.borderColor = '#007BFF')}
        onBlur={(e) => (e.target.style.borderColor = '#ccc')}
      />
      <button
        onClick={handleFileUpload}
        style={{
          padding: '0.5rem 1rem',
          border: 'none',
          borderRadius: '4px',
          backgroundColor: '#28a745',
          color: '#fff',
          cursor: 'pointer',
          transition: 'background-color 0.3s',
        }}
        onMouseOver={(e) => (e.target.style.backgroundColor = '#218838')}
        onMouseOut={(e) => (e.target.style.backgroundColor = '#28a745')}
      >
        Upload
      </button>
      {progress > 0 && <p>Upload Progress: {progress}%</p>}
      {imageUrl && (
        <div style={{ textAlign: 'center' }}>
          <h3>Uploaded Image:</h3>
          <img src={imageUrl} alt="Uploaded" style={{ width: '100%', maxWidth: '300px', borderRadius: '4px' }} />
        </div>
      )}
    </div>
  );
};

export default Admin;
