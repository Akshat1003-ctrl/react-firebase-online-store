import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig.js';
import ProductCard from '../components/ProductCard.jsx';
import './SearchResultsPage.css';

const SearchResultsPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q'); 
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
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
        setAllProducts(productList);
        setError(null);
      } catch (err) {
        setError("Failed to load products. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    if (!loading && query) {
      const lowercasedQuery = query.toLowerCase();
      const results = allProducts.filter(product =>
        product.name.toLowerCase().includes(lowercasedQuery) ||
        product.description.toLowerCase().includes(lowercasedQuery) ||
        product.category.toLowerCase().includes(lowercasedQuery)
      );
      setFilteredProducts(results);
    }
  }, [query, allProducts, loading]);

  if (loading) {
    return <p className="search-status-message">Loading search results...</p>;
  }

  if (error) {
    return <p className="search-status-message error">{error}</p>;
  }

  return (
    <div className="search-results-container">
      <h1 className="search-results-title">
        {filteredProducts.length > 0
          ? `Showing results for "${query}"`
          : `No results found for "${query}"`
        }
      </h1>
      <p className="search-results-count">{filteredProducts.length} products found</p>
      
      {filteredProducts.length > 0 && (
        <div className="search-results-grid">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResultsPage;