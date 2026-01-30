import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ShopProvider } from './context/ShopContext';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Login from './pages/Login';
import Admin from './pages/Admin';
import Cart from './pages/Cart';

import './App.css'; 

function App() {
  return (
    <ShopProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/men" element={<Shop category="men" />} />
          <Route path="/women" element={<Shop category="women" />} />
          <Route path="/unisex" element={<Shop category="unisex" />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </Router>
    </ShopProvider>
  );
}

export default App;
