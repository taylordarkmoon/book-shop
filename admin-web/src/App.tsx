import React, { useState, useEffect } from 'react';

// Типы
interface Book {
  id: number;
  title: string;
  author: string;
  year?: string;
  description?: string;
  price?: string;
  photo?: string;
  quantity: number;
}

// Стили для авторизации (центрирование, крупно)
const loginStyles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    flexDirection: 'column' as const,
    // backgroundColor: '#f5f5f5',
  },
  form: {
    padding: '40px',
    borderRadius: '8px',
    backgroundColor: '#fff',
    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
    width: '400px',
    maxWidth: '90%',
  },
  title: {
    fontSize: '32px',
    marginBottom: '24px',
    textAlign: 'center' as const,
  },
  field: {
    marginBottom: '16px',
  },
  label: {
    display: 'block',
    fontSize: '18px',
    marginBottom: '4px',
    fontWeight: 500,
  },
  input: {
    width: '100%',
    padding: '12px 16px',
    fontSize: '18px',
    borderRadius: '6px',
    border: '1px solid #ccc',
    boxSizing: 'border-box' as const,
  },
  button: {
    width: '100%',
    padding: '14px',
    fontSize: '20px',
    fontWeight: 600,
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    marginTop: '8px',
  },
  error: {
    color: 'red',
    marginTop: '8px',
    textAlign: 'center' as const,
  },
};

// Компонент авторизации с fetch
function LoginPage({ onLoginSuccess }: { onLoginSuccess: (token: string) => void }) {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!login.trim() || !password.trim()) {
      setError('Заполните оба поля');
      return;
    }

    try {
      const response = await fetch('http://localhost:8002/admin/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ login, password }),
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.message || 'Ошибка авторизации');
      }

      const data = await response.json();
      // Предполагаем, что сервер возвращает { token: '...' }
      const token = data.token;
      if (!token) throw new Error('Токен не получен');
      onLoginSuccess(token);
    } catch (err: any) {
      setError(err.message || 'Ошибка соединения');
    }
  };

  return (
    <div style={loginStyles.container}>
      <div style={loginStyles.form}>
        <h2 style={loginStyles.title}>Авторизация</h2>
        <form onSubmit={handleSubmit}>
          <div style={loginStyles.field}>
            <label style={loginStyles.label}>Логин</label>
            <input
              type="text"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              maxLength={20}
              placeholder="до 20 символов"
              style={loginStyles.input}
            />
          </div>
          <div style={loginStyles.field}>
            <label style={loginStyles.label}>Пароль</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              maxLength={20}
              placeholder="до 20 символов"
              style={loginStyles.input}
            />
          </div>
          {error && <div style={loginStyles.error}>{error}</div>}
          <button type="submit" style={loginStyles.button}>Войти</button>
        </form>
      </div>
    </div>
  );
}

// Компонент со списком книг и добавлением (с fetch)
function BookListPage({ token }: { token: string }) {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Поля для новой книги
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [year, setYear] = useState('');
  const [author, setAuthor] = useState('');
  const [price, setPrice] = useState('');
  const [photo, setPhoto] = useState('');
  const [quantity, setQuantity] = useState('');

  // Загрузка книг при монтировании и при изменении токена
  const fetchBooks = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch('http://localhost:8002/books', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        throw new Error(err.message || 'Ошибка загрузки книг');
      }
      const data = await response.json();
      setBooks(data);
    } catch (err: any) {
      setError(err.message || 'Не удалось загрузить книги');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, [token]);

  // Добавление книги
  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !author.trim()) {
      alert('Название и автор обязательны');
      return;
    }

    const newBook = {
      title,
      description,
      year,
      author,
      price,
      photo,
      quantity: parseInt(quantity, 10) || 0,
    };

    try {
      const response = await fetch('http://localhost:8002/books', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(newBook),
      });
      if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        throw new Error(err.message || 'Ошибка добавления книги');
      }
      const created = await response.json();
      setBooks([...books, created]); // добавляем полученную книгу (с id от сервера)
      // Очистка формы
      setTitle('');
      setDescription('');
      setYear('');
      setAuthor('');
      setPrice('');
      setPhoto('');
      setQuantity('');
    } catch (err: any) {
      alert('Ошибка: ' + err.message);
    }
  };

  if (loading) return <div style={{ padding: '20px' }}>Загрузка книг...</div>;
  if (error) return <div style={{ padding: '20px', color: 'red' }}>Ошибка: {error}</div>;

  return (
    <div style={{ padding: '20px' }}>
      <h2>Список книг</h2>
      {books.length === 0 ? (
        <p>Книг пока нет</p>
      ) : (
        <table border={1} cellPadding={8} style={{ width: '100%', borderCollapse: 'collapse', fontSize: '16px' }}>
          <thead>
            <tr>
              <th>Название</th>
              <th>Автор</th>
              <th>Год</th>
              <th>Описание</th>
              <th>Цена</th>
              <th>Кол-во</th>
              <th>Фото</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book.id}>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.year}</td>
                <td>{book.description}</td>
                <td>{book.price}</td>
                <td>{book.quantity}</td>
                <td>
                  {book.photo && <img src={book.photo} alt={book.title} width={60} />}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <h3>Добавить книгу</h3>
      <form onSubmit={handleAdd} style={{ maxWidth: '500px' }}>
        <div style={{ marginBottom: '10px' }}>
          <label>Название *: </label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} style={{ width: '100%', padding: '8px' }} />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Автор *: </label>
          <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} style={{ width: '100%', padding: '8px' }} />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Год: </label>
          <input type="text" value={year} onChange={(e) => setYear(e.target.value)} style={{ width: '100%', padding: '8px' }} />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Описание: </label>
          <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} style={{ width: '100%', padding: '8px' }} />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Цена: </label>
          <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} style={{ width: '100%', padding: '8px' }} />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Количество в наличии: </label>
          <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} style={{ width: '100%', padding: '8px' }} />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Фото (URL): </label>
          <input type="text" value={photo} onChange={(e) => setPhoto(e.target.value)} placeholder="https://example.com/image.jpg" style={{ width: '100%', padding: '8px' }} />
        </div>
        <button type="submit" style={{ padding: '10px 20px', fontSize: '16px' }}>Добавить</button>
      </form>
    </div>
  );
}

// Главный компонент
export default function App() {
  const [token, setToken] = useState<string | null>(null);

  const handleLoginSuccess = (newToken: string) => {
    setToken(newToken);
  };

  return (
    <div>
      {!token ? (
        <LoginPage onLoginSuccess={handleLoginSuccess} />
      ) : (
        <BookListPage token={token} />
      )}
    </div>
  );
}