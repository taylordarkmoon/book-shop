import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaStar } from 'react-icons/fa';
import axios from 'axios';

const API_BASE = 'http://localhost:8002/';

const HomePage = ({ user, addToCart }) => {
  const [books, setBooks] = useState([]);
  const [newBooks, setNewBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState('title');

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const [booksRes, newBooksRes] = await Promise.all([
        axios.get(`${API_BASE}/catalog/recomend`),
        axios.get(`${API_BASE}/catalog/new`)
      ]);
      
      setBooks(booksRes.data || []);
      setNewBooks(newBooksRes.data || []);
    } catch (error) {
      console.error('Ошибка загрузки книг:', error);
      // Демо данные для теста
      setBooks([
        { id: 1, title: 'Мастер и Маргарита', author: 'Михаил Булгаков', price: 450, rating: 4.9, cover: 'https://via.placeholder.com/150x200?text=Книга1', is_recommended: true },
        { id: 2, title: '1984', author: 'Джордж Оруэлл', price: 520, rating: 4.8, cover: 'https://via.placeholder.com/150x200?text=Книга2', is_recommended: true },
        { id: 3, title: 'Гарри Поттер', author: 'Дж.К. Роулинг', price: 680, rating: 4.9, cover: 'https://via.placeholder.com/150x200?text=Книга3', is_recommended: false },
      ]);
      setNewBooks([
        { id: 4, title: 'Новая книга 1', author: 'Автор 1', price: 590, rating: 4.7, cover: 'https://via.placeholder.com/150x200?text=Новинка1' },
        { id: 5, title: 'Новая книга 2', author: 'Автор 2', price: 780, rating: 4.8, cover: 'https://via.placeholder.com/150x200?text=Новинка2' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      fetchBooks();
      return;
    }

    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE}/catalog/new`, {
        params: { [searchType]: searchTerm, q: searchTerm }
      });
      setBooks(response.data || []);
    } catch (error) {
      console.error('Ошибка поиска:', error);
      alert('Ошибка поиска. Попробуйте позже.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (book) => {
    const success = addToCart(book);
    if (success) {
      alert(`"${book.title}" добавлена в корзину!`);
    }
  };

  const BookCard = ({ book }) => (
    <div className="book-card">
      <Link to={`/book/${book.id}`} className="book-link">
        <img src={book.cover || 'https://via.placeholder.com/150x200?text=Нет+обложки'} alt={book.title} className="book-cover" />
        <div className="book-info">
          <h3>{book.title}</h3>
          <p className="author">{book.author}</p>
          <div className="rating">
            <FaStar className="star" /> {book.rating || '4.5'}
          </div>
          <p className="price">{book.price} ₽</p>
        </div>
      </Link>
      <button 
        onClick={() => handleAddToCart(book)} 
        className="add-to-cart-btn"
        disabled={!user}
      >
        {user ? 'В корзину' : 'Войдите чтобы купить'}
      </button>
    </div>
  );

  const recommendedBooks = books.filter(b => b.is_recommended === true);

  if (loading) {
    return <div className="loading-container">Загрузка книг...</div>;
  }

  return (
    <div className="homepage">
      <div className="hero">
        <h1>Читай</h1>
        <p>Книжный магазин</p>
      </div>

      <div className="search-section">
        <div className="search-box">
          <select value={searchType} onChange={(e) => setSearchType(e.target.value)}>
            <option value="title">По названию</option>
            <option value="author">По автору</option>
          </select>
          <input
            type="text"
            placeholder="Поиск книг..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          />
          <button onClick={handleSearch}>
            <FaSearch /> Найти
          </button>
        </div>
      </div>

      {recommendedBooks.length > 0 && (
        <section className="books-section">
          <h2>📚 Рекомендуемые книги</h2>
          <div className="books-grid">
            {recommendedBooks.slice(0, 8).map(book => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </section>
      )}

      <section className="books-section">
        <h2>✨ Новинки</h2>
        <div className="books-grid">
          {newBooks.slice(0, 8).map(book => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </section>

    </div>
  );
};

export default HomePage;