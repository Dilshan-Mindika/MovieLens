
import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import MovieCard from '../movies/MovieCard';

const TrendingSection = ({ movies, title, linkTo, mediaType = 'movie' }) => {
  const scrollContainerRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  // Scroll function
  const scroll = (direction) => {
    const container = scrollContainerRef.current;
    if (!container) return;
    
    const scrollAmount = container.clientWidth * 0.8;
    const newScrollPosition = direction === 'right' 
      ? container.scrollLeft + scrollAmount 
      : container.scrollLeft - scrollAmount;
    
    container.scrollTo({
      left: newScrollPosition,
      behavior: 'smooth',
    });
  };

  // Handle scroll events to show/hide arrows
  const handleScroll = () => {
    const container = scrollContainerRef.current;
    if (!container) return;
    
    // Check if we're at the start
    setShowLeftArrow(container.scrollLeft > 0);
    
    // Check if we're near the end
    const isAtEnd = container.scrollLeft + container.clientWidth >= container.scrollWidth - 10;
    setShowRightArrow(!isAtEnd);
  };

  // Render skeletons for loading state
  const renderSkeletons = () => {
    return Array(8)
      .fill(0)
      .map((_, index) => (
        <div key={`skeleton-${index}`} className="animate-pulse min-w-[180px] md:min-w-[200px]">
          <div className="aspect-[2/3] bg-muted rounded-lg"></div>
          <div className="mt-2 space-y-2">
            <div className="h-4 bg-muted rounded w-2/3"></div>
            <div className="h-3 bg-muted rounded w-1/3"></div>
          </div>
        </div>
      ));
  };

  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl md:text-3xl font-bold">{title}</h2>
          {linkTo && (
            <Link
              to={linkTo}
              className="text-movie-secondary hover:text-movie-secondary/80 flex items-center font-medium"
            >
              View More
              <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          )}
        </div>

        <div className="relative">
          {/* Scroll buttons */}
          {showLeftArrow && (
            <button
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-black/30 backdrop-blur-sm text-white rounded-full flex items-center justify-center hover:bg-black/50 transition-colors transform -translate-x-1/2"
              onClick={() => scroll('left')}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}
          {showRightArrow && movies?.length > 0 && (
            <button
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-black/30 backdrop-blur-sm text-white rounded-full flex items-center justify-center hover:bg-black/50 transition-colors transform translate-x-1/2"
              onClick={() => scroll('right')}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}

          {/* Scrollable content */}
          <div
            className="flex overflow-x-auto scrollbar-none gap-4 py-2 -mx-4 px-4"
            ref={scrollContainerRef}
            onScroll={handleScroll}
          >
            {movies?.length > 0 
              ? movies.map(movie => (
                  <div key={movie.id} className="min-w-[180px] md:min-w-[200px]">
                    <MovieCard movie={movie} mediaType={mediaType} />
                  </div>
                ))
              : renderSkeletons()
            }
          </div>

          {/* Gradient fades for scroll edges */}
          {showLeftArrow && (
            <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-background to-transparent pointer-events-none"></div>
          )}
          {showRightArrow && (
            <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-background to-transparent pointer-events-none"></div>
          )}
        </div>
      </div>
    </section>
  );
};

export default TrendingSection;
