// src/MainPage.js
import React, { useState, useEffect } from 'react';
import { collection, query, orderBy, limit, getDocs, startAfter } from 'firebase/firestore';
import { db } from './firebase'; // Firestore config

const MainPageImages = () => {
  const [images, setImages] = useState([]);
  const [lastVisible, setLastVisible] = useState(null);
  const [loading, setLoading] = useState(false);

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

  return (
    <div>
      <span>Latest Uploaded Images</span>
      <div className="image-grid">
        {images.map((image) => (
          <img key={image.id} src={image.url} alt={image.name} style={{ width: '300px', borderRadius: '4px' }} />
        ))}
      </div>
      {loading && <p>Loading...</p>}
      {!loading && lastVisible && (
        <button
          onClick={loadMoreImages}
          style={{
            padding: '0.5rem 1rem',
            border: 'none',
            borderRadius: '4px',
            backgroundColor: '#007BFF',
            color: '#fff',
            cursor: 'pointer',
            transition: 'background-color 0.3s',
            marginTop: '1rem',
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = '#0056b3')}
          onMouseOut={(e) => (e.target.style.backgroundColor = '#007BFF')}
        >
          Load More
        </button>
      )}
    </div>
  );
};

export default MainPageImages;
