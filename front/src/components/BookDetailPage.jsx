import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaStar, FaShoppingCart, FaArrowLeft } from 'react-icons/fa';
import axios from 'axios';

const API_BASE = 'http://localhost:8002/books';

const BookDetailPage = ({ user, addToCart }) => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    fetchBook();
  }, [id]);

  const fetchBook = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE}/${id}`);
      setBook(response.data);
    } catch (error) {
      console.error('Ошибка загрузки книги:', error);
      // Демо данные
      setBook({
        id: parseInt(id),
        title: 'Мастер и Маргарита',
        author: 'Михаил Булгаков',
        price: 450,
        rating: 4.9,
        cover: 'https://via.placeholder.com/300x400?text=Книга',
        description: 'Знаменитый роман Михаила Булгакова, в котором переплетаются сатира, философия и мистика. Действие разворачивается в Москве 1930-х годов, куда прибывает Воланд со своей свитой.',
        age: 1967,
        list_count: 416,
        izdatek: 'АСТ'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    const success = addToCart(book, quantity);
    if (success) {
      alert(`"${book.title}" добавлена в корзину!`);
    }
  };

  if (loading) {
    return <div className="loading-container">Загрузка книги...</div>;
  }

  if (!book) {
    return <div className="error-container">Книга не найдена</div>;
  }

  return (
    <div className="book-detail-page">
      <Link to="/" className="back-link">
        <FaArrowLeft /> На главную
      </Link>

      <div className="book-detail-container">
        <div className="book-cover-large">
          <img src={book.cover || 'https://via.placeholder.com/300x400?text=Нет+обложки'} alt={book.title} />
        </div>

        <div className="book-info-large">
          <h1>{book.title}</h1>
          <p className="author">{book.author}</p>
          
          <div className="rating">
            <FaStar className="star" /> {book.rating || '4.5'}
            {book.age && <span className="year"> • {book.age} год</span>}
          </div>
          
          <div className="price">{book.price} ₽</div>
          
          <div className="description">
            <h3>Описание</h3>
            <p>{book.descroption || 'Описание отсутствует'}</p>
          </div>
          
          {book.list_count && (
            <div className="details">
              <p><strong>Страниц:</strong> {book.list_count}</p>
              <p><strong>Издательство:</strong> {book.izdatek}</p>
            </div>
          )}
          
          <div className="quantity-selector">
            <label>Количество:</label>
            <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
            <span>{quantity}</span>
            <button onClick={() => setQuantity(quantity + 1)}>+</button>
          </div>
          
          <button 
            onClick={handleAddToCart} 
            className="add-to-cart-large"
            disabled={!user}
          >
            <FaShoppingCart /> {user ? 'Добавить в корзину' : 'Войдите чтобы купить'}
          </button>
          
          {!user && (
            <p className="login-message">
              <Link to="/auth">Войдите</Link> в аккаунт, чтобы добавить книгу в корзину
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookDetailPage;