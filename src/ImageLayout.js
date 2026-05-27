import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { collection, query, orderBy, limit, getDocs, startAfter } from 'firebase/firestore';
import { db } from './firebase';
import { useSpring, animated } from '@react-spring/web';

const Gallery = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  grid-gap: 1rem;
  padding: ${(props) => (props.$embedded ? '16px' : '0')};
`;

const ImageWrapper = styled.div`
  aspect-ratio: 3/5;
  width: 100%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledImage = styled(animated.img)`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 2px;
  aspect-ratio: 3/5;
`;

const SkeletonWrapper = styled.div`
  aspect-ratio: 3/5;
  width: 100%;
  background: linear-gradient(90deg, #EDE8E0 25%, #F5F0EA 50%, #EDE8E0 75%);
  background-size: 200% 100%;
  animation: shimmer 1.4s ease infinite;
  border-radius: 2px;

  @keyframes shimmer {
    0%   { background-position: 200% 0; }
    100% { background-position: -200% 0; }
  }
`;

const StatusText = styled.p`
  font-family: 'Space Mono', monospace;
  font-size: 0.75rem;
  color: #7A7A7A;
  text-align: center;
  padding: 16px;
  letter-spacing: 0.04em;
`;

const ErrorText = styled(StatusText)`
  color: #A94442;
`;

const ImageItem = ({ src, alt }) => {
  const [loaded, setLoaded] = useState(false);
  const [errored, setErrored] = useState(false);
  const [props, set] = useSpring(() => ({ scale: 1 }));

  return (
    <ImageWrapper>
      {!loaded && !errored && <SkeletonWrapper aria-hidden="true" />}
      {errored ? (
        <StatusText style={{ fontSize: '0.65rem', color: '#BBBBBB' }}>
          Image unavailable
        </StatusText>
      ) : (
        <StyledImage
          src={src}
          alt={alt || ''}
          loading="lazy"
          style={{ ...props, display: loaded ? 'block' : 'none' }}
          onLoad={() => setLoaded(true)}
          onError={() => { setErrored(true); setLoaded(false); }}
          onMouseEnter={() => set({ scale: 1.03 })}
          onMouseLeave={() => set({ scale: 1 })}
        />
      )}
    </ImageWrapper>
  );
};

export default function ImageGallery({ embedded = false }) {
  const [images, setImages] = useState([]);
  const [lastVisible, setLastVisible] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchImages = async () => {
    setLoading(true);
    setError(null);
    try {
      const imagesRef = collection(db, 'images');
      const q = query(imagesRef, orderBy('timestamp', 'desc'), limit(6));
      const snapshot = await getDocs(q);

      const imageList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setImages(imageList);
      setLastVisible(snapshot.docs[snapshot.docs.length - 1] ?? null);
    } catch (err) {
      console.error('Failed to load images:', err);
      setError('Could not load images. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  const loadMoreImages = async () => {
    if (!lastVisible) return;

    setLoading(true);
    setError(null);
    try {
      const imagesRef = collection(db, 'images');
      const q = query(
        imagesRef,
        orderBy('timestamp', 'desc'),
        startAfter(lastVisible),
        limit(6)
      );
      const snapshot = await getDocs(q);

      const moreImages = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setImages((prev) => [...prev, ...moreImages]);
      setLastVisible(snapshot.docs[snapshot.docs.length - 1] ?? null);
    } catch (err) {
      console.error('Failed to load more images:', err);
      setError('Could not load more images. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  return (
    <div>
      <Gallery $embedded={embedded}>
        {/* Skeleton placeholders on first load */}
        {loading && images.length === 0
          ? Array.from({ length: 6 }, (_, i) => (
              <SkeletonWrapper key={`skeleton-${i}`} />
            ))
          : images.map((image) => (
              <ImageItem
                key={image.id}
                src={image.url}
                alt={image.alt || image.name || ''}
              />
            ))}
      </Gallery>

      {error && (
        <ErrorText>{error}</ErrorText>
      )}

      {!loading && images.length === 0 && !error && (
        <StatusText>No images yet.</StatusText>
      )}

      {lastVisible && (
        <div style={{ textAlign: 'center', marginTop: '1.5rem', paddingBottom: embedded ? 16 : 0 }}>
          <button onClick={loadMoreImages} disabled={loading}>
            {loading ? 'Loading…' : 'Load More'}
          </button>
        </div>
      )}
    </div>
  );
}
