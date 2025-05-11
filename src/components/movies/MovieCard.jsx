
import React from 'react';
import { Link } from 'react-router-dom';
import { useMovieContext } from '../../context/MovieContext';
import apiService from '../../services/api';

const MovieCard = ({ movie, mediaType = 'movie' }) => {
  const { favorites, dispatch } = useMovieContext();
  
  // Check if movie is in favorites
  const isFavorite = favorites?.some(fav => fav.id === movie.id);
  
  // Toggle favorite status
  const handleToggleFavorite = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch({ 
      type: 'TOGGLE_FAVORITE', 
      payload: { 
        ...movie, 
        media_type: mediaType
      } 
    });
  };

  return (
    <div className="movie-card group">
      <Link to={`/${mediaType}/${movie.id}`} className="block relative">
        {/* Poster Image */}
        <div className="aspect-[2/3] bg-muted rounded-lg overflow-hidden">
          <img
            src={apiService.getImageUrl(movie.poster_path)}
            alt={movie.title || movie.name}
            className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-110"
            loading="lazy"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://via.placeholder.com/300x450?text=No+Image';
            }}
          />
        </div>
        
        {/* Overlay with info */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
          <h3 className="font-bold text-white text-lg mb-1 line-clamp-2">
            {movie.title || movie.name}
          </h3>
          <div className="flex items-center justify-between">
            <span className="text-white text-sm">
              {movie.release_date && new Date(movie.release_date).getFullYear()}
              {movie.first_air_date && new Date(movie.first_air_date).getFullYear()}
            </span>
            <div className="bg-movie-primary text-white text-xs font-bold rounded-full px-2 py-1 flex items-center">
              <svg className="w-3 h-3 mr-1 text-movie-accent" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
              {movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}
            </div>
          </div>
        </div>
        
        {/* Favorite Button */}
        <button
          onClick={handleToggleFavorite}
          className="absolute top-2 right-2 w-8 h-8 rounded-full bg-black/60 flex items-center justify-center transition-colors hover:bg-black/80"
        >
          <svg
            className={`w-5 h-5 ${isFavorite ? 'text-red-500' : 'text-white'}`}
            fill={isFavorite ? 'currentColor' : 'none'}
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            ></path>
          </svg>
        </button>
        
        {/* Rating badge */}
        <div className="absolute bottom-2 left-2 bg-movie-primary text-white text-xs font-bold rounded-full px-2 py-1 flex items-center opacity-100 group-hover:opacity-0 transition-opacity">
          <svg className="w-3 h-3 mr-1 text-movie-accent" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
          </svg>
          {movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}
        </div>
      </Link>
      
      {/* Title and Year (visible by default) */}
      <div className="mt-2 px-1">
        <h3 className="font-medium line-clamp-1 text-foreground">
          {movie.title || movie.name}
        </h3>
        <p className="text-xs text-muted-foreground">
          {movie.release_date && new Date(movie.release_date).getFullYear()}
          {movie.first_air_date && new Date(movie.first_air_date).getFullYear()}
        </p>
      </div>
    </div>
  );
};

export default MovieCard;
