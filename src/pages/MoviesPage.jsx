
import React, { useState, useEffect } from 'react';
import Layout from '../components/layout/Layout';
import MovieGrid from '../components/movies/MovieGrid';
import SearchBar from '../components/search/SearchBar';
import { useMovieContext } from '../context/MovieContext';
import apiService from '../services/api';

const MoviesPage = () => {
  const { dispatch } = useMovieContext();
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [sortBy, setSortBy] = useState('popularity.desc');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [yearFilter, setYearFilter] = useState('');
  
  // Get current year
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 50 }, (_, i) => currentYear - i);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const genresData = await apiService.getGenres();
        setGenres(genresData);
      } catch (error) {
        console.error('Error fetching genres:', error);
      }
    };

    fetchGenres();
  }, []);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        
        // Build API parameters
        const params = {
          page,
          sort_by: sortBy
        };
        
        // Add year filter if selected
        if (yearFilter) {
          params.primary_release_year = yearFilter;
        }
        
        // Fetch movies by genre or popular
        let response;
        if (selectedGenre) {
          response = await apiService.getMoviesByGenre(selectedGenre, page);
        } else {
          response = await apiService.getPopularMovies(page);
        }
        
        setMovies(response.results);
        setTotalPages(Math.min(response.total_pages, 500)); // TMDb API has a limit of 500 pages
      } catch (error) {
        console.error('Error fetching movies:', error);
        dispatch({ type: 'SET_ERROR', payload: 'Failed to load movies. Please try again.' });
      } finally {
        setLoading(false);
      }
    };
    
    fetchMovies();
  }, [selectedGenre, sortBy, page, yearFilter, dispatch]);

  // Handle genre selection
  const handleGenreChange = (genreId) => {
    setSelectedGenre(genreId === selectedGenre ? null : genreId);
    setPage(1); // Reset to first page when changing filters
  };

  // Handle sort change
  const handleSortChange = (e) => {
    setSortBy(e.target.value);
    setPage(1);
  };

  // Handle year filter change
  const handleYearChange = (e) => {
    setYearFilter(e.target.value);
    setPage(1);
  };

  return (
    <Layout>
      {/* Page header */}
      <div className="bg-movie-primary text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Movies</h1>
          <p className="text-white/80 max-w-2xl mb-8">
            Explore our vast collection of movies. Use filters to find exactly what you're looking for or discover new favorites.
          </p>
          <div className="max-w-2xl">
            <SearchBar />
          </div>
        </div>
      </div>

      {/* Filter bar */}
      <div className="sticky top-16 md:top-20 z-30 bg-background/95 backdrop-blur-sm border-b border-border shadow-sm">
        <div className="container mx-auto px-4 py-3">
          <div className="flex flex-wrap items-center gap-3">
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
                <option value="release_date.desc">Release Date (Newest)</option>
                <option value="release_date.asc">Release Date (Oldest)</option>
              </select>
            </div>

            {/* Year filter */}
            <div className="flex items-center">
              <label htmlFor="year" className="mr-2 text-sm font-medium hidden sm:inline">Year:</label>
              <select
                id="year"
                value={yearFilter}
                onChange={handleYearChange}
                className="bg-muted px-3 py-1.5 rounded-lg text-sm border border-border focus:outline-none focus:border-movie-secondary"
              >
                <option value="">All Years</option>
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
            
            {/* Reset filters */}
            {(selectedGenre || yearFilter) && (
              <button
                onClick={() => {
                  setSelectedGenre(null);
                  setYearFilter('');
                  setPage(1);
                }}
                className="px-3 py-1.5 text-sm bg-muted border border-border rounded-lg hover:bg-muted/80 transition-colors"
              >
                Clear Filters
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Genre sidebar */}
          <div className="w-full md:w-64 flex-shrink-0">
            <div className="sticky top-32 overflow-y-auto max-h-[calc(100vh-8rem)]">
              <h2 className="text-lg font-semibold mb-3">Genres</h2>
              <div className="flex flex-wrap md:flex-col gap-2">
                {genres.map((genre) => (
                  <button
                    key={genre.id}
                    onClick={() => handleGenreChange(genre.id)}
                    className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
                      selectedGenre === genre.id 
                        ? 'bg-movie-secondary text-white'
                        : 'bg-muted hover:bg-muted/80'
                    }`}
                  >
                    {genre.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main content */}
          <div className="flex-grow">
            <MovieGrid 
              movies={movies} 
              title={
                selectedGenre 
                  ? genres.find(g => g.id === selectedGenre)?.name + " Movies"
                  : "All Movies"
              }
              loading={loading}
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
        </div>
      </div>
    </Layout>
  );
};

export default MoviesPage;
