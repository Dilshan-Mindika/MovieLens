
import React from 'react';
import Layout from '../components/layout/Layout';
import MovieGrid from '../components/movies/MovieGrid';
import { useMovieContext } from '../context/MovieContext';
import { Link } from 'react-router-dom';

const FavoritesPage = () => {
  const { favorites } = useMovieContext();

  return (
    <Layout>
      {/* Page header */}
      <div className="bg-movie-primary text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Your Favorites</h1>
          <p className="text-white/80 max-w-2xl">
            All your favorite movies and TV shows in one place.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {favorites.length > 0 ? (
          <>
            {/* Movies */}
            <MovieGrid 
              movies={favorites.filter(item => item.media_type === 'movie' || (!item.media_type && item.release_date))} 
              title="Favorite Movies"
              mediaType="movie"
            />
            
            {/* TV Shows */}
            <div className="mt-12">
              <MovieGrid 
                movies={favorites.filter(item => item.media_type === 'tv' || (!item.media_type && item.first_air_date))} 
                title="Favorite TV Shows"
                mediaType="tv"
              />
            </div>
          </>
        ) : (
          <div className="text-center py-16">
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
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              ></path>
            </svg>
            <h2 className="text-xl font-semibold mb-2">No favorites yet</h2>
            <p className="text-muted-foreground mb-6">
              Start exploring and click the heart icon to add movies and TV shows to your favorites
            </p>
            <div className="flex justify-center gap-4">
              <Link
                to="/movies"
                className="px-6 py-2 bg-movie-secondary text-white font-medium rounded-full hover:bg-movie-secondary/90 transition-colors"
              >
                Browse Movies
              </Link>
              <Link
                to="/tv"
                className="px-6 py-2 bg-white/10 backdrop-blur-sm text-foreground font-medium rounded-full hover:bg-muted transition-colors border border-border"
              >
                Browse TV Shows
              </Link>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default FavoritesPage;
