
import React, { createContext, useContext, useReducer, useEffect } from 'react';

const MovieContext = createContext();

// Initial state
const initialState = {
  movies: [],
  tvShows: [],
  favorites: [],
  searchResults: [],
  trending: [],
  currentMovie: null,
  loading: false,
  error: null,
  darkMode: localStorage.getItem('darkMode') === 'true' || false
};

// Reducer function
function movieReducer(state, action) {
  switch (action.type) {
    case 'SET_MOVIES':
      return { ...state, movies: action.payload };
    case 'SET_TV_SHOWS':
      return { ...state, tvShows: action.payload };
    case 'SET_TRENDING':
      return { ...state, trending: action.payload };
    case 'SET_SEARCH_RESULTS':
      return { ...state, searchResults: action.payload };
    case 'SET_CURRENT_MOVIE':
      return { ...state, currentMovie: action.payload };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'TOGGLE_FAVORITE':
      const isFavorite = state.favorites.some(movie => movie.id === action.payload.id);
      return { 
        ...state, 
        favorites: isFavorite 
          ? state.favorites.filter(movie => movie.id !== action.payload.id) 
          : [...state.favorites, action.payload] 
      };
    case 'TOGGLE_DARK_MODE':
      localStorage.setItem('darkMode', !state.darkMode);
      return { ...state, darkMode: !state.darkMode };
    default:
      return state;
  }
}

// Provider component
export function MovieProvider({ children }) {
  const [state, dispatch] = useReducer(movieReducer, initialState);

  // Load favorites from localStorage on component mount
  useEffect(() => {
    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) {
      const favorites = JSON.parse(savedFavorites);
      state.favorites = favorites;
    }
  }, []);

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(state.favorites));
  }, [state.favorites]);

  // Apply dark mode class to document
  useEffect(() => {
    if (state.darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [state.darkMode]);

  const value = {
    movies: state.movies,
    tvShows: state.tvShows,
    favorites: state.favorites,
    searchResults: state.searchResults,
    trending: state.trending,
    currentMovie: state.currentMovie,
    loading: state.loading,
    error: state.error,
    darkMode: state.darkMode,
    dispatch
  };

  return <MovieContext.Provider value={value}>{children}</MovieContext.Provider>;
}

// Custom hook to use the movie context
export function useMovieContext() {
  const context = useContext(MovieContext);
  if (!context) {
    throw new Error('useMovieContext must be used within a MovieProvider');
  }
  return context;
}
