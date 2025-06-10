import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiSearch, FiShoppingCart, FiUser, FiMenu, FiX } from 'react-icons/fi';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig.js';
import { useCart } from '../context/CartContext.jsx';
import './Navbar.css';

// --- SOLUTION: Step 1 ---
// Define SearchBarForm as a standalone component outside of Navbar.
// It now receives all the data and functions it needs as props.
const SearchBarForm = ({
  searchTerm,
  setSearchTerm,
  handleSearchSubmit,
  categories
}) => {
  return (
    <form className="search-bar" onSubmit={handleSearchSubmit}>
      <select className="search-category-dropdown">
        <option value="all">All</option>
        {categories.map(category => (
          <option key={category} value={category}>{category}</option>
        ))}
      </select>
      <input
        type="text"
        className="search-input"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button type="submit" className="search-button">
        <FiSearch />
      </button>
    </form>
  );
};


// --- The Navbar Component ---
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [categories, setCategories] = useState([]);
  const { cartItems } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      const productsCollection = collection(db, 'products');
      const productSnapshot = await getDocs(productsCollection);
      const uniqueCategories = [...new Set(productSnapshot.docs.map(doc => doc.data().category))];
      setCategories(uniqueCategories);
    };
    fetchCategories();
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${searchTerm.trim()}`);
      setSearchTerm('');
      setIsMenuOpen(false); // Close menu after search
    }
  };

  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  // --- SOLUTION: Step 2 ---
  // Create a props object to pass to the SearchBarForm component
  const searchBarProps = {
    searchTerm,
    setSearchTerm,
    handleSearchSubmit,
    categories
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-left">
          <Link to="/" className="navbar-logo" onClick={() => setIsMenuOpen(false)}>
            STORE
          </Link>
        </div>

        <div className="navbar-center-desktop">
          {/* Pass the props to the SearchBarForm */}
          <SearchBarForm {...searchBarProps} />
        </div>

        <div className="navbar-right-desktop">
          <Link to="/shop" className="navbar-link">Shop</Link>
          <Link to="/account" className="navbar-icon"><FiUser size={24} /></Link>
          <Link to="/cart" className="navbar-icon">
            <FiShoppingCart size={24} />
            {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
          </Link>
        </div>

        <div className="navbar-mobile-menu-icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
        </div>
      </nav>
      
      <div className={`mobile-menu ${isMenuOpen ? 'open' : ''}`}>
        <div className="mobile-menu-search">
           {/* Pass the props to the SearchBarForm here as well */}
           <SearchBarForm {...searchBarProps} />
        </div>
        <nav className="mobile-menu-links">
            <Link to="/shop" className="mobile-menu-link" onClick={() => setIsMenuOpen(false)}>Shop All Products</Link>
            <Link to="/account" className="mobile-menu-link" onClick={() => setIsMenuOpen(false)}>My Account</Link>
            <Link to="/cart" className="mobile-menu-link" onClick={() => setIsMenuOpen(false)}>Shopping Cart ({totalItems})</Link>
        </nav>
      </div>
    </>
  );
};

export default Navbar;