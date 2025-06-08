import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductList from './components/ProductList.jsx';
import ProductDetail from './components/ProductDetail.jsx'; // Correctly imports the renamed file
import './App.css';

function App() {
  return (
    <Router>
      <main>
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/product/:id" element={<ProductDetail />} /> 
        </Routes>
      </main>
    </Router>
  );
}

export default App;