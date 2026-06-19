import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import AuthPage from './components/AuthPage';
import CartPage from './components/CartPage';
import BookDetailPage from './components/BookDetailPage';
import './styles/global.css';

const App = () => {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  // Загрузка данных из localStorage
  useEffect(() => {
    const token = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');
    
    if (token && savedUser) {
      setUser(JSON.parse(savedUser));
    }
    
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
    
    setLoading(false);
  }, []);

  // Сохранение корзины
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const handleLogin = (userData, token) => {
    setUser(userData);
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setCart([]);
  };

  const addToCart = (book, quantity = 1) => {
    if (!user) {
      alert('Пожалуйста, войдите в аккаунт чтобы добавить книги в корзину');
      return false;
    }
    
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === book.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === book.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [...prevCart, { ...book, quantity: quantity }];
      }
    });
    return true;
  };

  const removeFromCart = (bookId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== bookId));
  };

  const updateQuantity = (bookId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(bookId);
      return;
    }
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === bookId ? { ...item, quantity: quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  if (loading) {
    return <div className="loading">Загрузка...</div>;
  }

  return (
    <Router>
      <div className="app">
        <Navbar user={user} onLogout={handleLogout} cartCount={cart.length} />
        <Routes>
          <Route path="/" element={
            <HomePage 
              user={user} 
              addToCart={addToCart} 
            />
          } />
          <Route path="/auth" element={
            <AuthPage onLogin={handleLogin} />
          } />
          <Route path="/cart" element={
            <CartPage 
              cart={cart} 
              user={user}
              onUpdateQuantity={updateQuantity}
              onRemove={removeFromCart}
              onClear={clearCart}
            />
          } />
          <Route path="/book/:id" element={
            <BookDetailPage 
              user={user}
              addToCart={addToCart}
            />
          } />
        </Routes>
      </div>
    </Router>
  );
};

export default App;