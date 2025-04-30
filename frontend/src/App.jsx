import React, { useState } from 'react'
import {BrowserRouter as Router, Routes, Route, Link, Navigate} from 'react-router-dom'
import AddBook from './components/AddBook'
import ViewBook from './components/ViewBook'
import SearchBook from './components/SearchBook'
import UpdateBook from './components/UpdateBook'
import DeleteBook from './components/DeleteBook'
import './App.css'
const App = () => {
  const [activeLink, setActiveLink] = useState('/view')

  const handleNavClick = (path) => {
    setActiveLink(path)
  }

  return (
    <div className="app-container">
      <Router>
        <header className="app-header">
          <div className="logo-container">
            <h1>📚 BookShelf</h1>
            <p>Your Digital Library</p>
          </div>
          <nav className="main-nav">
            <Link 
              to="/view" 
              className={activeLink === '/view' ? 'active' : ''}
              onClick={() => handleNavClick('/view')}
            >
              <i className="nav-icon">📖</i> View Books
            </Link>
            <Link 
              to="/add" 
              className={activeLink === '/add' ? 'active' : ''}
              onClick={() => handleNavClick('/add')}
            >
              <i className="nav-icon">➕</i> Add Book
            </Link>
            <Link 
              to="/search" 
              className={activeLink === '/search' ? 'active' : ''}
              onClick={() => handleNavClick('/search')}
            >
              <i className="nav-icon">🔍</i> Search
            </Link>
            <Link 
              to="/update" 
              className={activeLink === '/update' ? 'active' : ''}
              onClick={() => handleNavClick('/update')}
            >
              <i className="nav-icon">✏️</i> Update
            </Link>
            <Link 
              to="/delete" 
              className={activeLink === '/delete' ? 'active' : ''}
              onClick={() => handleNavClick('/delete')}
            >
              <i className="nav-icon">🗑️</i> Delete
            </Link>
          </nav>
        </header>
        
        <main className="content-container">
          <Routes>
            <Route path='/' element={<Navigate to='/view' />} />
            <Route path='/add' element={<AddBook/>} />
            <Route path='/view' element={<ViewBook/>} />
            <Route path='/search' element={<SearchBook/>} />
            <Route path='/update' element={<UpdateBook/>} />
            <Route path='/delete' element={<DeleteBook/>} />
          </Routes>
        </main>
        
        <footer className="app-footer">
          <p>&copy; {new Date().getFullYear()} BookShelf App | All Rights Reserved</p>
        </footer>
      </Router>
    </div>
  )
}

export default App
