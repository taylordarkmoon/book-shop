import React from 'react';
import { Link } from 'react-router-dom';
import { FaBook, FaShoppingCart, FaUser } from 'react-icons/fa';

const Navbar = ({ user, onLogout, cartCount }) => {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="logo">
          <FaBook className="logo-icon" />
          <span>Читай</span>
        </Link>

        <div className="nav-right">
          <Link to="/cart" className="cart-link">
            <FaShoppingCart />
            <span>Корзина</span>
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </Link>

          {user ? (
            <div className="user-info">
              <FaUser className="user-icon" />
              <span>Привет, {user.name || user.email.split('@')[0]}!</span>
              <button onClick={onLogout} className="logout-btn">Выйти</button>
            </div>
          ) : (
            <Link to="/auth" className="login-link">
              <FaUser />
              <span>Войти</span>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;