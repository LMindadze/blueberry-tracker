// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import PurchaseForm from './components/PurchaseForm';
import Tracking from './components/Tracking';
import './styles.css';

function App() {
  return (
    <Router>
      <div className="container">
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/purchase/:id" element={<PurchaseForm />} />
          <Route path="/tracking" element={<Tracking />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
