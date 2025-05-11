
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import apiService from '../../services/api';

const HeroSection = ({ movies = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Auto advance slides
  useEffect(() => {
    if (movies.length === 0) return;
    
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % movies.length);
        setIsTransitioning(false);
      }, 500); // Match this with CSS transition time
    }, 6000);
    
    return () => clearInterval(interval);
  }, [movies.length]);

  // Navigate to specific slide
  const goToSlide = (index) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex(index);
      setIsTransitioning(false);
    }, 500);
  };

  // Navigate to previous/next slide
  const handlePrevNext = (direction) => {
    setIsTransitioning(true);
    setTimeout(() => {
      if (direction === 'prev') {
        setCurrentIndex((prevIndex) => 
          prevIndex === 0 ? movies.length - 1 : prevIndex - 1
        );
      } else {
        setCurrentIndex((prevIndex) => 
          (prevIndex + 1) % movies.length
        );
      }
      setIsTransitioning(false);
    }, 500);
  };

  if (movies.length === 0) {
    return (
      <div className="w-full h-[70vh] bg-muted animate-pulse flex items-center justify-center">
        <div className="text-muted-foreground">Loading featured content...</div>
      </div>
    );
  }

  const movie = movies[currentIndex];

  return (
    <div className="relative w-full h-[70vh] md:h-[80vh] overflow-hidden">
      {/* Background image with gradient overlay */}
      <div 
        className={`absolute inset-0 bg-cover bg-center transition-opacity duration-500 ${
          isTransitioning ? 'opacity-0' : 'opacity-100'
        }`}
        style={{
          backgroundImage: `url(${apiService.getImageUrl(movie.backdrop_path, 'original')})`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 h-full flex items-end pb-16 md:pb-20 relative z-10">
        <div className={`max-w-2xl transition-all duration-500 ${
          isTransitioning ? 'opacity-0 translate-y-10' : 'opacity-100 translate-y-0'
        }`}>
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-3">
            {movie.title || movie.name}
          </h1>
          <div className="flex items-center space-x-4 mb-4">
            <div className="bg-movie-primary text-white text-sm font-bold rounded-full px-3 py-1 flex items-center">
              <svg className="w-4 h-4 mr-1 text-movie-accent" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
              {movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}
            </div>
            <span className="text-white text-sm">
              {movie.release_date && new Date(movie.release_date).getFullYear()}
              {movie.first_air_date && new Date(movie.first_air_date).getFullYear()}
            </span>
            {movie.genres && movie.genres.length > 0 && (
              <span className="text-white text-sm hidden md:inline-block">
                {movie.genres.slice(0, 2).map(g => g.name).join(', ')}
              </span>
            )}
          </div>
          <p className="text-white/90 mb-6 line-clamp-3 md:line-clamp-4">
            {movie.overview}
          </p>
          <div className="flex flex-wrap gap-3">
            <Link 
              to={`/movie/${movie.id}`}
              className="px-6 py-2 bg-movie-secondary text-white font-medium rounded-full hover:bg-movie-secondary/90 transition-colors flex items-center"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
              Watch Details
            </Link>
            <button 
              className="px-6 py-2 bg-white/10 backdrop-blur-sm text-white font-medium rounded-full hover:bg-white/20 transition-colors border border-white/30"
            >
              Add to Watchlist
            </button>
          </div>
        </div>
      </div>
      
      {/* Navigation arrows */}
      <button 
        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/30 backdrop-blur-sm text-white flex items-center justify-center hover:bg-black/50 transition-colors z-20 hidden md:flex"
        onClick={() => handlePrevNext('prev')}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button 
        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/30 backdrop-blur-sm text-white flex items-center justify-center hover:bg-black/50 transition-colors z-20 hidden md:flex"
        onClick={() => handlePrevNext('next')}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
        {movies.slice(0, 5).map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentIndex 
                ? 'bg-white w-6' 
                : 'bg-white/50 hover:bg-white/80'
            }`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSection;
