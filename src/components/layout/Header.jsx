
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useMovieContext } from '../../context/MovieContext';

const Header = () => {
  const location = useLocation();
  const { darkMode, dispatch } = useMovieContext();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Check if route is active
  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Toggle dark mode
  const toggleDarkMode = () => {
    dispatch({ type: 'TOGGLE_DARK_MODE' });
  };

  // Handle search submit
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      setSearchVisible(false);
      window.location.href = `/search?query=${encodeURIComponent(searchTerm)}`;
    }
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-background/95 backdrop-blur-sm shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-2"
          >
            <svg 
              className="w-8 h-8 text-movie-secondary" 
              viewBox="0 0 24 24" 
              fill="currentColor"
            >
              <path d="M4,6H2v14c0,1.1,0.9,2,2,2h14v-2H4V6z" />
              <path d="M20,2H8C6.9,2,6,2.9,6,4v12c0,1.1,0.9,2,2,2h12c1.1,0,2-0.9,2-2V4C22,2.9,21.1,2,20,2z M20,16H8V4h12V16z" />
              <path d="M12,5.5v9l6-4.5L12,5.5z" />
            </svg>
            <span className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-movie-secondary to-movie-accent">
              MovieLens
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className={`nav-link ${isActive('/')}`}>
              Home
            </Link>
            <Link to="/movies" className={`nav-link ${isActive('/movies')}`}>
              Movies
            </Link>
            <Link to="/tv" className={`nav-link ${isActive('/tv')}`}>
              TV Series
            </Link>
            <Link to="/about" className={`nav-link ${isActive('/about')}`}>
              About
            </Link>
            <Link to="/contact" className={`nav-link ${isActive('/contact')}`}>
              Contact
            </Link>
            <Link to="/favorites" className={`nav-link ${isActive('/favorites')}`}>
              Favorites
            </Link>
          </nav>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            {/* Search Toggle */}
            <button
              className="p-1 rounded-full hover:bg-muted transition-colors"
              onClick={() => setSearchVisible(!searchVisible)}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </button>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-1 rounded-full hover:bg-muted transition-colors"
            >
              {darkMode ? (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  ></path>
                </svg>
              ) : (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                  ></path>
                </svg>
              )}
            </button>

            {/* Login Button */}
            <Link
              to="/login"
              className="hidden md:block px-4 py-2 rounded-lg bg-movie-secondary text-white font-medium hover:bg-movie-secondary/90 transition-colors"
            >
              Login
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-1 rounded-full hover:bg-muted transition-colors"
            >
              {mobileMenuOpen ? (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              ) : (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </svg>
              )}
            </button>
          </div>
        </div>
        
        {/* Search Bar (Conditional) */}
        {searchVisible && (
          <div className="pt-2 pb-4 animate-slide-down">
            <form onSubmit={handleSearchSubmit} className="w-full">
              <div className="relative">
                <input
                  type="text"
                  className="w-full p-2 pl-10 pr-4 rounded-lg border border-muted bg-background placeholder-muted-foreground focus:outline-none focus:border-movie-secondary transition-colors"
                  placeholder="Search for movies or TV shows..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  autoFocus
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <svg
                    className="w-5 h-5 text-muted-foreground"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    ></path>
                  </svg>
                </div>
              </div>
            </form>
          </div>
        )}
      </div>

      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-sm animate-slide-down shadow-lg">
          <nav className="container mx-auto px-4 py-3 flex flex-col">
            <Link 
              to="/" 
              className="py-2 border-b border-muted"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/movies" 
              className="py-2 border-b border-muted"
              onClick={() => setMobileMenuOpen(false)}
            >
              Movies
            </Link>
            <Link 
              to="/tv" 
              className="py-2 border-b border-muted"
              onClick={() => setMobileMenuOpen(false)}
            >
              TV Series
            </Link>
            <Link 
              to="/about" 
              className="py-2 border-b border-muted"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link 
              to="/contact" 
              className="py-2 border-b border-muted"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </Link>
            <Link 
              to="/favorites" 
              className="py-2 border-b border-muted"
              onClick={() => setMobileMenuOpen(false)}
            >
              Favorites
            </Link>
            <Link
              to="/login"
              className="mt-2 text-center py-2 rounded bg-movie-secondary text-white"
              onClick={() => setMobileMenuOpen(false)}
            >
              Login
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
