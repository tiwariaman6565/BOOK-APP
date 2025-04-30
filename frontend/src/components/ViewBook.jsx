import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ViewBook.css';
import { Link } from 'react-router-dom';

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
      console.error('Error fetching books:', err);
      setError('Failed to fetch books. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="view-book-container">
      <div className="view-header">
        <h2>📚 Your Digital Library</h2>
        <p className="view-subtitle">Explore your collection of books</p>
        <Link to="/add-book" className="add-book-btn">
          <span>+</span> Add New Book
        </Link>
      </div>
      
      {loading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading your books...</p>
        </div>
      ) : error ? (
        <div className="error-message">
          <p>⚠️ {error}</p>
          <button onClick={handleView} className="retry-button">Retry</button>
        </div>
      ) : books.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-content">
            <div className="empty-state-icon">📚</div>
            <h3>Your Library is Empty</h3>
            <p>Start building your digital library by adding your first book.</p>
            <Link to="/add-book" className="add-first-book-btn">
              Add Your First Book
            </Link>
          </div>
        </div>
      ) : (
        <div className="book-grid">
          {books.map((book) => (
            <div className="book-card" key={book._id}>
              <div className="book-image-container">
                <img 
                  src={book.image || '/default-book-cover.png'} 
                  alt={book.title} 
                  onError={(e) => {
                    e.target.src = '/default-book-cover.png';
                  }}
                />
              </div>
              <div className="book-details">
                <h3>{book.title}</h3>
                <p className="book-author"><span>Author:</span> {book.author}</p>
                <p className="book-date"><span>Added:</span> {new Date(book.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                <div className="book-actions">
                  <Link to={`/update-book/${book._id}`} className="action-btn edit">
                    <span>✏️</span> Edit
                  </Link>
                  <Link to={`/delete-book/${book._id}`} className="action-btn delete">
                    <span>🗑️</span> Delete
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewBook;
