import React from 'react';
import ProductCard from './ProductCard.jsx';
import './ProductCarousel.css';

const ProductCarousel = ({ title, products }) => {
  if (!products || products.length === 0) {
    return null; 
  }

  return (
    <div className="carousel-container">
      <h2 className="carousel-title">{title}</h2>
      <div className="carousel-track">
        {products.map(product => (
          <div className="carousel-item" key={product.id}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductCarousel;