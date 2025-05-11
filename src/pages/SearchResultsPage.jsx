
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import MovieGrid from '../components/movies/MovieGrid';
import SearchBar from '../components/search/SearchBar';
import { useMovieContext } from '../context/MovieContext';
import apiService from '../services/api';

const SearchResultsPage = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('query') || '';
  const { dispatch } = useMovieContext();
  
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!query.trim()) return;
      
      try {
        setLoading(true);
        const response = await apiService.searchMovies(query, page);
        
        dispatch({ type: 'SET_SEARCH_RESULTS', payload: response.results });
        setMovies(response.results);
        setTotalPages(Math.min(response.total_pages, 500)); // TMDb API has a limit of 500 pages

        // Save last search to localStorage
        localStorage.setItem('lastSearch', query);
      } catch (error) {
        console.error('Error searching movies:', error);
        dispatch({ type: 'SET_ERROR', payload: 'Failed to search movies. Please try again.' });
      } finally {
        setLoading(false);
      }
    };
    
    fetchSearchResults();
  }, [query, page, dispatch]);

  return (
    <Layout>
      {/* Search header */}
      <div className="bg-movie-primary text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Search Results</h1>
          <div className="max-w-2xl">
            <SearchBar defaultValue={query} />
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="container mx-auto px-4 py-8">
        <MovieGrid 
          movies={movies} 
          title={`Results for "${query}"`}
          loading={loading}
        />
        
        {/* Show message when no results */}
        {!loading && movies.length === 0 && (
          <div className="text-center py-16">
            <div className="w-16 h-16 mx-auto mb-4 text-muted-foreground/50">
              <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </div>
            <h2 className="text-xl font-semibold mb-2">No results found</h2>
            <p className="text-muted-foreground">Try different keywords or check your spelling</p>
          </div>
        )}

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

export default SearchResultsPage;
