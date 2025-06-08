import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import Pages
import HomePage from './pages/HomePage.jsx';

// Import Components
import ProductList from './components/ProductList.jsx';
import ProductDetail from './components/ProductDetail.jsx';
import './App.css';

function App() {
  return (
    <Router>
      {/* You would put a Navbar component here, above the main content */}
      <main>
        <Routes>
          {/* The root route now shows our new HomePage */}
          <Route path="/" element={<HomePage />} />

          {/* The old product grid is now at /shop */}
          <Route path="/shop" element={<ProductList />} />

          {/* The product detail page remains the same */}
          <Route path="/product/:id" element={<ProductDetail />} /> 
        </Routes>
      </main>
    </Router>
  );
}

export default App;