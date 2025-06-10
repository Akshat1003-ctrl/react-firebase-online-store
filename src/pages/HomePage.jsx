import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig.js';
import ProductCarousel from '../components/ProductCarousel.jsx';
import './HomePage.css';

const HomePage = () => {
  const [productsByCategory, setProductsByCategory] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAndGroupProducts = async () => {
      try {
        setLoading(true);
        const productsCollection = collection(db, 'products');
        const productSnapshot = await getDocs(productsCollection);
        
        const groupedProducts = productSnapshot.docs.reduce((acc, doc) => {
          const product = { id: doc.id, ...doc.data() };
          const category = product.category || 'Other'; // Group products without a category under 'Other'
          
          if (!acc[category]) {
            acc[category] = [];
          }
          acc[category].push(product);
          return acc;
        }, {});

        setProductsByCategory(groupedProducts);
        setError(null);
      } catch (err) {
        setError("Failed to load products.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAndGroupProducts();
  }, []);

  if (loading) {
    return <p className="home-status-message">Loading store...</p>;
  }

  if (error) {
    return <p className="home-status-message error">{error}</p>;
  }

  return (
    <div className="homepage-container">
      {/* You can add a hero banner or welcome message here */}
      <div className="hero-section">
          <h1>Welcome to the future of Shopping</h1>
          <p>Discover products curated just for you.</p>
      </div>

      {Object.entries(productsByCategory).map(([category, products]) => (
        <ProductCarousel key={category} title={category} products={products} />
      ))}
    </div>
  );
};

export default HomePage;