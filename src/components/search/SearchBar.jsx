
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchBar = ({ defaultValue = '', className = '' }) => {
  const [searchQuery, setSearchQuery] = useState(defaultValue);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`relative ${className}`}>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search for movies or TV shows..."
        className="w-full px-4 py-3 pl-10 rounded-full border border-border bg-background/80 backdrop-blur-sm placeholder-muted-foreground focus:outline-none focus:border-movie-secondary transition-colors"
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
      <button
      type="submit"
        className="absolute right-2 inset-y-1/2 -translate-y-1/2 px-4 h-10 flex items-center justify-center bg-movie-secondary text-white rounded-full hover:bg-movie-secondary/90 transition-colors"
          >
          Search
      </button>

    </form>
  );
};

export default SearchBar;
