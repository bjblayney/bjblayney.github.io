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
      <h1>Latest Uploaded Images</h1>
      <div className="image-grid">
        {images.map((image) => (
          <img key={image.id} src={image.url} alt={image.name} style={{ width: '300px', margin: '10px' }} />
        ))}
      </div>
      {loading && <p>Loading...</p>}
      {!loading && lastVisible && (
        <button onClick={loadMoreImages} style={{ display: `block`, margin: `5px 0px` }}>
          Load More
        </button>
      )}
    </div>
  );
};

export default MainPageImages;
