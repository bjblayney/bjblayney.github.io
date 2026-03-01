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

const ImageItem = ({ src, alt }) => {
  const [props, set] = useSpring(() => ({ scale: 1 }));
  return (
    <ImageWrapper>
      <StyledImage
        src={src}
        alt={alt}
        style={props}
        onMouseEnter={() => set({ scale: 1.03 })}
        onMouseLeave={() => set({ scale: 1 })}
      />
    </ImageWrapper>
  );
};

export default function ImageGallery({ embedded = false }) {
  const [images, setImages] = useState([]);
  const [lastVisible, setLastVisible] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchImages = async () => {
    setLoading(true);
    const imagesRef = collection(db, 'images');
    const q = query(imagesRef, orderBy('timestamp', 'desc'), limit(6));
    const snapshot = await getDocs(q);

    const imageList = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setImages(imageList);
    setLastVisible(snapshot.docs[snapshot.docs.length - 1]);
    setLoading(false);
  };

  const loadMoreImages = async () => {
    if (!lastVisible) return;

    setLoading(true);
    const imagesRef = collection(db, 'images');
    const q = query(imagesRef, orderBy('timestamp', 'desc'), startAfter(lastVisible), limit(6));
    const snapshot = await getDocs(q);

    const moreImages = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setImages((prevImages) => [...prevImages, ...moreImages]);
    setLastVisible(snapshot.docs[snapshot.docs.length - 1]);
    setLoading(false);
  };

  useEffect(() => {
    fetchImages();
  }, []);

  return (
    <div>
      <Gallery $embedded={embedded}>
        {images.map((image) => (
          <ImageItem key={image.id} src={image.url} alt={image.alt} />
        ))}
      </Gallery>
      {lastVisible && (
        <div style={{ textAlign: 'center', marginTop: '1.5rem', paddingBottom: embedded ? 16 : 0 }}>
          <button onClick={loadMoreImages} disabled={loading}>
            {loading ? 'Loading...' : 'Load More'}
          </button>
        </div>
      )}
    </div>
  );
}
