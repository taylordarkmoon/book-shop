import React from 'react';
import { Link } from 'react-router-dom';
import { FaTrash, FaPlus, FaMinus, FaShoppingCart } from 'react-icons/fa';

const CartPage = ({ cart, user, onUpdateQuantity, onRemove, onClear }) => {
  const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleOrder = () => {
    if (!user) {
      alert('Пожалуйста, войдите в аккаунт для оформления заказа');
      return;
    }
    alert(`Заказ оформлен! Сумма: ${totalAmount} ₽. Спасибо за покупку!`);
    onClear();
  };

  if (cart.length === 0) {
    return (
      <div className="cart-empty">
        <FaShoppingCart className="empty-icon" />
        <h2>Ваша корзина пуста</h2>
        <p>Добавьте книги, чтобы оформить заказ</p>
        <Link to="/" className="shop-link">К покупкам</Link>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h1>Корзина</h1>
      
      <div className="cart-content">
        <div className="cart-items">
          {cart.map(item => (
            <div key={item.id} className="cart-item">
              <img src={item.cover || 'https://via.placeholder.com/80x100?text=Книга'} alt={item.title} />
              
              <div className="item-info">
                <Link to={`/book/${item.id}`} className="item-title">{item.title}</Link>
                <p className="item-author">{item.author}</p>
                <p className="item-price">{item.price} ₽</p>
              </div>
              
              <div className="item-quantity">
                <button onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}>
                  <FaMinus />
                </button>
                <span>{item.quantity}</span>
                <button onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}>
                  <FaPlus />
                </button>
              </div>
              
              <div className="item-total">
                {item.price * item.quantity} ₽
              </div>
              
              <button onClick={() => onRemove(item.id)} className="remove-btn">
                <FaTrash />
              </button>
            </div>
          ))}
        </div>
        
        <div className="cart-summary">
          <h3>Итого</h3>
          <div className="summary-row">
            <span>Товаров: {cart.length}</span>
            <span>{cart.reduce((sum, i) => sum + i.quantity, 0)} шт.</span>
          </div>
          <div className="summary-row total">
            <span>Сумма:</span>
            <span>{totalAmount} ₽</span>
          </div>
          <button onClick={handleOrder} className="order-btn">
            Оформить заказ
          </button>
          <Link to="/" className="continue-btn">
            Продолжить покупки
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartPage;