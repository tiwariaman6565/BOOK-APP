import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ViewBook.css';

const ViewBook = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    handleView();
  }, []);

  const handleView = async () => {
    try {
      setLoading(true);
      const res = await axios.get('http://localhost:9000/books');
      setBooks(res.data);
      setError(null);
    } catch (err) {
      console.log(err);
      setError('Failed to fetch books. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="view-book-container">
      <div className="view-header">
        <h2>📚 Browse Your Collection</h2>
        <p className="view-subtitle">Discover and explore your digital bookshelf</p>
      </div>
      
      {loading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading your books...</p>
        </div>
      ) : error ? (
        <div className="error-message">
          <p>⚠️ {error}</p>
          <button onClick={handleView} className="retry-button">Try Again</button>
        </div>
      ) : books.length === 0 ? (
        <div className="empty-state">
          <p>No books found in your collection.</p>
          <p>Start by adding some books!</p>
        </div>
      ) : (
        <div className="book-grid">
          {books.map((book) => (
            <div className="book-card" key={book._id}>
              <div className="book-image-container">
                <img src={book.image} alt={book.title} />
              </div>
              <div className="book-details">
                <h3>{book.title}</h3>
                <p className="book-author"><span>By:</span> {book.author}</p>
                <p className="book-date"><span>Published:</span> {new Date(book.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewBook;
