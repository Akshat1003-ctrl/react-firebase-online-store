import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig.js';
import './ProductDetail.css';

const ProductDetail = () => {
  // useParams() hook from react-router-dom gets the 'id' from the URL
  const { id } = useParams(); 
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        // Create a reference to the single document in the 'products' collection
        const productDocRef = doc(db, 'products', id);
        
        // Fetch the document
        const docSnap = await getDoc(productDocRef);

        if (docSnap.exists()) {
          setProduct({ id: docSnap.id, ...docSnap.data() });
          setError(null);
        } else {
          setError("Product not found.");
        }
      } catch (err) {
        setError("Failed to fetch product details.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]); // Re-run the effect if the product ID in the URL changes

  if (loading) {
    return <p className="status-message">Loading product...</p>;
  }

  if (error) {
    return <p className="status-message error">{error}</p>;
  }

  if (!product) {
    return null; // Or some other fallback UI
  }

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
        <button className="add-to-cart-btn">
          Add to Cart
        </button>
        {/* We'll add functionality to this button later */}
      </div>
    </div>
  );
};

export default ProductDetail;