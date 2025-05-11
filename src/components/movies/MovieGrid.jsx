
import React from 'react';
import MovieCard from './MovieCard';

const MovieGrid = ({ movies, title, mediaType = 'movie', loading = false }) => {
  // Skeleton loading component
  const renderSkeletons = () => {
    return Array(12)
      .fill(0)
      .map((_, index) => (
        <div key={`skeleton-${index}`} className="animate-pulse">
          <div className="aspect-[2/3] bg-muted rounded-lg"></div>
          <div className="mt-2 space-y-2">
            <div className="h-4 bg-muted rounded w-2/3"></div>
            <div className="h-3 bg-muted rounded w-1/3"></div>
          </div>
        </div>
      ));
  };

  return (
    <section className="container mx-auto px-4 py-8">
      {title && <h2 className="text-2xl md:text-3xl font-bold mb-6">{title}</h2>}
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
        {loading 
          ? renderSkeletons() 
          : movies?.map(movie => (
              <MovieCard key={movie.id} movie={movie} mediaType={mediaType} />
            ))}
      </div>
      
      {movies?.length === 0 && !loading && (
        <div className="text-center py-12 text-muted-foreground">
          <svg
            className="w-16 h-16 mx-auto mb-4 text-muted-foreground/50"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 2a10 10 0 110 20 10 10 0 010-20z"
            ></path>
          </svg>
          <p className="text-xl">No movies found</p>
        </div>
      )}
    </section>
  );
};

export default MovieGrid;
