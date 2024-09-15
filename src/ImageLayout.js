import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { collection, query, orderBy, limit, getDocs, startAfter } from 'firebase/firestore';
import { db } from './firebase'; // Firestore config

import { useSpring, animated } from '@react-spring/web';
import { toggle } from './styles';
import { BackSquareO } from './icons';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
`;

const BackButton = styled(animated.button)`
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  font-size: 1rem;
  color: #333;
  padding: 0.5rem;
  margin-right: 1rem;
  border-radius: 4px;
  transition: background-color 0.3s;

  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.1);
  }
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
  flex-grow: 1;
`;

const Gallery = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-auto-rows: 0;
  grid-gap: 1rem;
`;

const ImageWrapper = styled.div`
  grid-row-end: span ${(props) => Math.ceil(props.height / 10)};
  cursor: pointer;
`;

const StyledImage = styled(animated.img)`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
`;

const ImageItem = ({ src, alt, width, height }) => {
  const [props, set] = useSpring(() => ({ scale: 1 }));

  return (
    <ImageWrapper height={height}>
      <StyledImage src={src} alt={alt} style={props} onMouseEnter={() => set({ scale: 1.05 })} onMouseLeave={() => set({ scale: 1 })} />
    </ImageWrapper>
  );
};

export default function ImageGallery() {
  const [backButtonProps, setBackButtonProps] = useSpring(() => ({ x: 0 }));
  const [images, setImages] = useState([]);
  const [lastVisible, setLastVisible] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Fetch initial batch of images
  const fetchImages = async () => {
    setLoading(true);
    const imagesRef = collection(db, 'images');
    const q = query(imagesRef, orderBy('timestamp', 'desc'), limit(4));
    const snapshot = await getDocs(q);

    const imageList = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setImages(imageList);
    setLastVisible(snapshot.docs[snapshot.docs.length - 1]);
    setLoading(false);
  };

  // Load more images on demand
  const loadMoreImages = async () => {
    if (!lastVisible) return;

    setLoading(true);
    const imagesRef = collection(db, 'images');
    const q = query(imagesRef, orderBy('timestamp', 'desc'), startAfter(lastVisible), limit(4));
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
    fetchImages(); // Fetch images on component mount
  }, []);

  const handleBackClick = () => {
    navigate('/'); // Add your navigation logic here
    console.log('Navigating back to main page');
  };

  return (
    <Container>
      <Header>
        <BackButton
          onClick={handleBackClick}
          onMouseEnter={() => setBackButtonProps({ x: 5 })}
          onMouseLeave={() => setBackButtonProps({ x: 0 })}
          style={backButtonProps}
          aria-label="Go back to main page"
        >
          <BackSquareO style={{ ...toggle, opacity: 1, width: `50px` }} />
          Back
        </BackButton>
        <Title>My Image Gallery</Title>
      </Header>
      <Gallery>
        {images.map((image, index) => (
          <ImageItem key={image.id} src={image.url} alt={image.alt} width={`300`} height={'485'} />
        ))}
      </Gallery>
    </Container>
  );
}
