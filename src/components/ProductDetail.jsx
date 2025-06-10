import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig.js';
import { useCart } from '../context/CartContext.jsx'; // 1. Import useCart
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const { addToCart } = useCart(); // 2. Get the addToCart function

  // ... (useEffect for fetching the product remains the same)
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const productDocRef = doc(db, 'products', id);
        const docSnap = await getDoc(productDocRef);
        if (docSnap.exists()) {
          setProduct({ id: docSnap.id, ...docSnap.data() });
        } else {
          setError("Product not found.");
        }
      } catch (err) {
        console.error(err);
        setError("Failed to fetch product details.");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return <p className="status-message">Loading product...</p>;
  if (error) return <p className="status-message error">{error}</p>;
  if (!product) return null;

  return (
    <div className="product-detail-container">
      <div className="product-detail-image-container">
        <img src={product.imageUrl} alt={product.name} className="product-detail-image" />
      </div>
      <div className="product-detail-info">
        <h1 className="product-detail-name">{product.name}</h1>
        <p className="product-detail-category">{product.category}</p>
        <p className="product-detail-price">${product.price.toFixed(2)}</p>
        <p className="product-detail-description">{product.description}</p>
        {/* 3. Call addToCart when the button is clicked */}
        <button className="add-to-cart-btn" onClick={() => addToCart(product)}>
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;