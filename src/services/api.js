
import axios from 'axios';

// Add TMDB API key and base URL
const API_KEY = '3fd2be6f0c70a2a598f084ddfb75487c'; // This is a public demo API key from TMDB docs
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

// Create axios instance with default config
const tmdbApi = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
    language: 'en-US',
  },
});

// Handle API errors
tmdbApi.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response ? error.response.data : error.message);
    return Promise.reject(error);
  }
);

// API service methods
const apiService = {
  // Get movie image URL
  getImageUrl: (path, size = 'w500') => {
    if (!path) return 'https://via.placeholder.com/500x750?text=No+Image+Available';
    return `${IMAGE_BASE_URL}/${size}${path}`;
  },

  // Search movies
  searchMovies: async (query, page = 1) => {
    const response = await tmdbApi.get('/search/movie', {
      params: { query, page },
    });
    return response.data;
  },

  // Get trending movies
  getTrendingMovies: async (timeWindow = 'day', page = 1) => {
    const response = await tmdbApi.get(`/trending/movie/${timeWindow}`, {
      params: { page },
    });
    return response.data;
  },

  // Get movie details
  getMovieDetails: async (movieId) => {
    const response = await tmdbApi.get(`/movie/${movieId}`, {
      params: {
        append_to_response: 'videos,credits,similar',
      },
    });
    return response.data;
  },

  // Get popular movies
  getPopularMovies: async (page = 1) => {
    const response = await tmdbApi.get('/movie/popular', {
      params: { page },
    });
    return response.data;
  },

  // Get movie genres
  getGenres: async () => {
    const response = await tmdbApi.get('/genre/movie/list');
    return response.data.genres;
  },

  // Get movies by genre
  getMoviesByGenre: async (genreId, page = 1) => {
    const response = await tmdbApi.get('/discover/movie', {
      params: {
        with_genres: genreId,
        page,
      },
    });
    return response.data;
  },

  // Get TV shows
  getPopularTvShows: async (page = 1) => {
    const response = await tmdbApi.get('/tv/popular', {
      params: { page },
    });
    return response.data;
  },

  // Get TV show details
  getTvShowDetails: async (tvId) => {
    const response = await tmdbApi.get(`/tv/${tvId}`, {
      params: {
        append_to_response: 'videos,credits,similar',
      },
    });
    return response.data;
  },

  // Get trending TV shows
  getTrendingTvShows: async (timeWindow = 'day', page = 1) => {
    const response = await tmdbApi.get(`/trending/tv/${timeWindow}`, {
      params: { page },
    });
    return response.data;
  },
};

export default apiService;
