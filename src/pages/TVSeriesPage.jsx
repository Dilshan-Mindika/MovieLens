
import React, { useState, useEffect } from 'react';
import Layout from '../components/layout/Layout';
import MovieGrid from '../components/movies/MovieGrid';
import SearchBar from '../components/search/SearchBar';
import { useMovieContext } from '../context/MovieContext';
import apiService from '../services/api';

const TVSeriesPage = () => {
  const { dispatch } = useMovieContext();
  const [tvShows, setTvShows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [sortBy, setSortBy] = useState('popularity.desc');
  
  useEffect(() => {
    const fetchTvShows = async () => {
      try {
        setLoading(true);
        const response = await apiService.getPopularTvShows(page);
        setTvShows(response.results);
        setTotalPages(Math.min(response.total_pages, 500)); // TMDb API has a limit of 500 pages
      } catch (error) {
        console.error('Error fetching TV shows:', error);
        dispatch({ type: 'SET_ERROR', payload: 'Failed to load TV shows. Please try again.' });
      } finally {
        setLoading(false);
      }
    };
    
    fetchTvShows();
  }, [page, dispatch]);

  // Handle sort change
  const handleSortChange = (e) => {
    setSortBy(e.target.value);
    setPage(1);
  };

  return (
    <Layout>
      {/* Page header */}
      <div className="bg-movie-primary text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">TV Series</h1>
          <p className="text-white/80 max-w-2xl mb-8">
            Explore popular TV shows and discover new series to binge watch.
          </p>
          <div className="max-w-2xl">
            <SearchBar />
          </div>
        </div>
      </div>

      {/* Filter bar */}
      <div className="sticky top-16 md:top-20 z-30 bg-background/95 backdrop-blur-sm border-b border-border shadow-sm">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center">
            {/* Sort dropdown */}
            <div className="flex items-center">
              <label htmlFor="sort" className="mr-2 text-sm font-medium hidden sm:inline">Sort by:</label>
              <select
                id="sort"
                value={sortBy}
                onChange={handleSortChange}
                className="bg-muted px-3 py-1.5 rounded-lg text-sm border border-border focus:outline-none focus:border-movie-secondary"
              >
                <option value="popularity.desc">Popularity (High to Low)</option>
                <option value="popularity.asc">Popularity (Low to High)</option>
                <option value="vote_average.desc">Rating (High to Low)</option>
                <option value="vote_average.asc">Rating (Low to High)</option>
                <option value="first_air_date.desc">First Air Date (Newest)</option>
                <option value="first_air_date.asc">First Air Date (Oldest)</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="container mx-auto px-4 py-8">
        <MovieGrid 
          movies={tvShows} 
          title="Popular TV Series" 
          loading={loading}
          mediaType="tv"
        />

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-8">
            <div className="inline-flex rounded-md shadow-sm">
              <button
                onClick={() => setPage(p => Math.max(p - 1, 1))}
                disabled={page === 1}
                className="px-3 py-2 border border-border rounded-l-lg hover:bg-muted transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <div className="px-4 py-2 border-t border-b border-border bg-muted flex items-center">
                <span>Page {page} of {totalPages}</span>
              </div>
              <button
                onClick={() => setPage(p => Math.min(p + 1, totalPages))}
                disabled={page === totalPages}
                className="px-3 py-2 border border-border rounded-r-lg hover:bg-muted transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default TVSeriesPage;
