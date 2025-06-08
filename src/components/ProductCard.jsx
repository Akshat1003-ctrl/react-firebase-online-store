import React from 'react';
import { Link } from 'react-router-dom';
import './ProductCard.css'; // We'll create this CSS file next

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <Link to={`/product/${product.id}`}>
        <img src={product.imageUrl} alt={product.name} className="product-card-image" />
        <div className="product-card-info">
          <h3 className="product-card-name">{product.name}</h3>
          <p className="product-card-price">${product.price.toFixed(2)}</p>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;