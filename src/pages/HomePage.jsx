
import React, { useState, useEffect } from 'react';
import Layout from '../components/layout/Layout';
import HeroSection from '../components/home/HeroSection';
import TrendingSection from '../components/home/TrendingSection';
import SearchBar from '../components/search/SearchBar';
import { useMovieContext } from '../context/MovieContext';
import apiService from '../services/api';

const HomePage = () => {
  const { trending, dispatch } = useMovieContext();
  const [featuredMovies, setFeaturedMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [popularTVShows, setPopularTVShows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        setLoading(true);
        
        // Get trending movies for hero section (with full details)
        const trendingResponse = await apiService.getTrendingMovies('day');
        const detailedMovies = await Promise.all(
          trendingResponse.results.slice(0, 5).map(movie => 
            apiService.getMovieDetails(movie.id)
          )
        );
        setFeaturedMovies(detailedMovies);
        
        // Get trending movies for the carousel
        dispatch({ 
          type: 'SET_TRENDING', 
          payload: trendingResponse.results 
        });
        
        // Get popular movies
        const popularMoviesResponse = await apiService.getPopularMovies();
        setPopularMovies(popularMoviesResponse.results);
        
        // Get popular TV shows
        const popularTVResponse = await apiService.getPopularTvShows();
        setPopularTVShows(popularTVResponse.results);
        
      } catch (error) {
        console.error('Error fetching home data:', error);
        dispatch({ type: 'SET_ERROR', payload: 'Failed to load content. Please try again.' });
      } finally {
        setLoading(false);
      }
    };
    
    fetchHomeData();
  }, [dispatch]);

  return (
    <Layout>
      {/* Hero section with carousel */}
      <HeroSection movies={featuredMovies} />

      {/* Search bar section */}
      <section className="py-12 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">
              Find Your Next Favorite
            </h2>
            <p className="text-muted-foreground">
              Search for movies, TV series, and more
            </p>
          </div>
          <div className="max-w-2xl mx-auto">
            <SearchBar className="shadow-lg" />
          </div>
        </div>
      </section>

      {/* Trending section */}
      <TrendingSection 
        title="Trending Movies" 
        movies={trending} 
        linkTo="/movies"
        mediaType="movie"
      />

      {/* Popular movies section */}
      <TrendingSection 
        title="Popular Movies" 
        movies={popularMovies} 
        linkTo="/movies/popular"
        mediaType="movie"
      />

      {/* Popular TV shows section */}
      <TrendingSection 
        title="Popular TV Series" 
        movies={popularTVShows} 
        linkTo="/tv"
        mediaType="tv"
      />
    </Layout>
  );
};

export default HomePage;
