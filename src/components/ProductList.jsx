import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig.js'; // Make sure this path is correct
import ProductCard from './ProductCard.jsx';
import './ProductList.css';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const productsCollection = collection(db, 'products');
        const productSnapshot = await getDocs(productsCollection);
        const productList = productSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setProducts(productList);
        setError(null);
      } catch (err) {
        setError("Failed to fetch products. Check console for details.");
        console.error("Firebase fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []); // Empty dependency array means this runs once on mount

  if (loading) {
    return <p className="status-message">Loading products...</p>;
  }

  if (error) {
    return <p className="status-message error">{error}</p>;
  }

  if (products.length === 0) {
    return <p className="status-message">No products found. Please add products to your Firestore database.</p>;
  }

  return (
    <div className="product-list-container">
      <h2>Our Products</h2>
      <div className="product-grid">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;