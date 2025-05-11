
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import { useMovieContext } from '../context/MovieContext';
import apiService from '../services/api';
import TrendingSection from '../components/home/TrendingSection';

const MovieDetailPage = () => {
  const { id } = useParams();
  const { favorites, dispatch } = useMovieContext();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [isTrailerOpen, setIsTrailerOpen] = useState(false);
  const [trailerKey, setTrailerKey] = useState('');
  
  // Find out if this movie is in favorites
  const isFavorite = favorites?.some(fav => fav.id === parseInt(id));

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setLoading(true);
        const movieData = await apiService.getMovieDetails(id);
        setMovie(movieData);
        
        // Set trailer if available
        const trailer = movieData.videos?.results?.find(
          video => video.type === 'Trailer' && video.site === 'YouTube'
        );
        if (trailer) {
          setTrailerKey(trailer.key);
        }
        
        // Set current movie in context
        dispatch({ type: 'SET_CURRENT_MOVIE', payload: movieData });
        
        // Scroll to top when movie changes
        window.scrollTo(0, 0);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchMovieDetails();
  }, [id, dispatch]);

  // Toggle favorite status
  const handleToggleFavorite = () => {
    dispatch({ 
      type: 'TOGGLE_FAVORITE', 
      payload: { 
        ...movie,
        media_type: 'movie'
      } 
    });
  };
  
  if (loading || !movie) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 animate-pulse">
          <div className="h-[30vh] bg-muted rounded-lg mb-8"></div>
          <div className="h-8 bg-muted rounded-lg w-1/3 mb-4"></div>
          <div className="h-4 bg-muted rounded-lg w-1/4 mb-8"></div>
          <div className="h-4 bg-muted rounded-lg mb-2"></div>
          <div className="h-4 bg-muted rounded-lg mb-2"></div>
          <div className="h-4 bg-muted rounded-lg w-3/4 mb-2"></div>
        </div>
      </Layout>
    );
  }

  // Calculate runtime in hours and minutes
  const hours = Math.floor(movie.runtime / 60);
  const minutes = movie.runtime % 60;
  
  // Format budget and revenue
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(value);
  };

  return (
    <Layout>
      {/* Backdrop */}
      <div 
        className="w-full h-[40vh] md:h-[60vh] bg-cover bg-center relative"
        style={{
          backgroundImage: `url(${apiService.getImageUrl(movie.backdrop_path, 'original')})`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent"></div>
      </div>
      
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-8 -mt-32 md:-mt-48 relative z-10">
          {/* Poster */}
          <div className="flex-shrink-0 w-full max-w-[300px] mx-auto md:mx-0">
            <div className="rounded-lg overflow-hidden shadow-xl">
              <img 
                src={apiService.getImageUrl(movie.poster_path, 'w500')} 
                alt={movie.title}
                className="w-full h-auto"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://via.placeholder.com/300x450?text=No+Image';
                }}
              />
            </div>
          </div>
          
          {/* Details */}
          <div className="flex-grow">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              {movie.title}
              {movie.release_date && (
                <span className="text-muted-foreground font-normal">
                  {' '}({new Date(movie.release_date).getFullYear()})
                </span>
              )}
            </h1>
            
            {/* Facts row */}
            <div className="flex flex-wrap gap-3 mb-6 text-sm">
              {movie.release_date && (
                <span>{new Date(movie.release_date).toLocaleDateString()}</span>
              )}
              
              {movie.runtime > 0 && (
                <span>• {hours > 0 ? `${hours}h ` : ''}{minutes > 0 ? `${minutes}m` : ''}</span>
              )}
              
              {movie.genres?.map((genre) => (
                <Link 
                  key={genre.id} 
                  to={`/movies/genre/${genre.id}`}
                  className="px-2 py-0.5 bg-muted rounded-full text-xs hover:bg-muted/80 transition-colors"
                >
                  {genre.name}
                </Link>
              ))}
            </div>
            
            {/* Rating and actions */}
            <div className="flex items-center gap-4 mb-8">
              <div className="flex items-center">
                <div className="w-16 h-16 rounded-full bg-movie-primary flex items-center justify-center mr-3">
                  <div className="text-white text-xl font-bold">
                    {movie.vote_average ? (movie.vote_average * 10).toFixed(0) : 'NR'}
                    <span className="text-xs">%</span>
                  </div>
                </div>
                <div className="text-sm">
                  User<br />Score
                </div>
              </div>
              
              {/* Action buttons */}
              <div className="flex gap-2">
                <button
                  className="p-2 rounded-full bg-muted hover:bg-muted/80 transition-colors"
                  onClick={handleToggleFavorite}
                  title={isFavorite ? "Remove from favorites" : "Add to favorites"}
                >
                  <svg
                    className={`w-6 h-6 ${isFavorite ? 'text-red-500' : ''}`}
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
                
                {trailerKey && (
                  <button
                    className="px-4 py-2 bg-movie-secondary text-white rounded-full flex items-center hover:bg-movie-secondary/90 transition-colors"
                    onClick={() => setIsTrailerOpen(true)}
                  >
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                    Play Trailer
                  </button>
                )}
              </div>
            </div>
            
            {/* Tagline */}
            {movie.tagline && (
              <div className="text-lg italic text-muted-foreground mb-4">
                {movie.tagline}
              </div>
            )}
            
            {/* Overview */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-2">Overview</h3>
              <p className="text-muted-foreground">{movie.overview || 'No overview available.'}</p>
            </div>
            
            {/* Credits */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
              {movie.credits?.crew?.filter(person => 
                ['Director', 'Producer', 'Screenplay', 'Writer'].includes(person.job)
              ).slice(0, 6).map((person, index) => (
                <div key={`${person.id}-${index}`}>
                  <h4 className="font-semibold">{person.name}</h4>
                  <p className="text-sm text-muted-foreground">{person.job}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Tabs navigation */}
        <div className="border-b border-border mt-12 mb-6">
          <div className="flex space-x-6 overflow-x-auto scrollbar-none">
            <button
              className={`py-3 border-b-2 transition-colors ${
                activeTab === 'overview' 
                  ? 'border-movie-secondary text-foreground font-semibold' 
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
              onClick={() => setActiveTab('overview')}
            >
              Overview
            </button>
            <button
              className={`py-3 border-b-2 transition-colors ${
                activeTab === 'cast' 
                  ? 'border-movie-secondary text-foreground font-semibold' 
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
              onClick={() => setActiveTab('cast')}
            >
              Cast
            </button>
            <button
              className={`py-3 border-b-2 transition-colors ${
                activeTab === 'details' 
                  ? 'border-movie-secondary text-foreground font-semibold' 
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
              onClick={() => setActiveTab('details')}
            >
              Details
            </button>
          </div>
        </div>
        
        {/* Tab content */}
        <div className="mb-12">
          {activeTab === 'overview' && (
            <div>
              <p className="text-lg text-muted-foreground mb-6">
                {movie.overview || 'No overview available.'}
              </p>
              
              {/* Key Facts */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div>
                  <h4 className="font-semibold">Status</h4>
                  <p className="text-muted-foreground">{movie.status || 'Unknown'}</p>
                </div>
                <div>
                  <h4 className="font-semibold">Original Language</h4>
                  <p className="text-muted-foreground">
                    {movie.spoken_languages?.find(lang => lang.iso_639_1 === movie.original_language)?.name || movie.original_language || 'Unknown'}
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold">Budget</h4>
                  <p className="text-muted-foreground">
                    {movie.budget ? formatCurrency(movie.budget) : 'Not available'}
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold">Revenue</h4>
                  <p className="text-muted-foreground">
                    {movie.revenue ? formatCurrency(movie.revenue) : 'Not available'}
                  </p>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'cast' && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {movie.credits?.cast?.slice(0, 10).map((actor) => (
                <div key={actor.id} className="text-center">
                  <div className="aspect-[2/3] rounded-lg overflow-hidden bg-muted mb-2">
                    <img 
                      src={apiService.getImageUrl(actor.profile_path)}
                      alt={actor.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://via.placeholder.com/300x450?text=No+Image';
                      }}
                    />
                  </div>
                  <h4 className="font-semibold text-sm">{actor.name}</h4>
                  <p className="text-xs text-muted-foreground">{actor.character}</p>
                </div>
              ))}
              
              {(!movie.credits?.cast || movie.credits.cast.length === 0) && (
                <div className="col-span-full text-center py-12 text-muted-foreground">
                  No cast information available.
                </div>
              )}
            </div>
          )}
          
          {activeTab === 'details' && (
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-semibold mb-2">Details</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h5 className="font-medium">Original Title</h5>
                    <p className="text-muted-foreground">{movie.original_title || movie.title}</p>
                  </div>
                  <div>
                    <h5 className="font-medium">Release Date</h5>
                    <p className="text-muted-foreground">
                      {movie.release_date ? new Date(movie.release_date).toLocaleDateString() : 'Unknown'}
                    </p>
                  </div>
                  <div>
                    <h5 className="font-medium">Runtime</h5>
                    <p className="text-muted-foreground">
                      {movie.runtime ? `${hours > 0 ? `${hours}h ` : ''}${minutes > 0 ? `${minutes}m` : ''}` : 'Unknown'}
                    </p>
                  </div>
                  <div>
                    <h5 className="font-medium">Budget</h5>
                    <p className="text-muted-foreground">
                      {movie.budget ? formatCurrency(movie.budget) : 'Unknown'}
                    </p>
                  </div>
                  <div>
                    <h5 className="font-medium">Revenue</h5>
                    <p className="text-muted-foreground">
                      {movie.revenue ? formatCurrency(movie.revenue) : 'Unknown'}
                    </p>
                  </div>
                  <div>
                    <h5 className="font-medium">Popularity</h5>
                    <p className="text-muted-foreground">{movie.popularity?.toFixed(2) || 'Unknown'}</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold mb-2">Production Companies</h4>
                <div className="flex flex-wrap gap-4">
                  {movie.production_companies?.map(company => (
                    <div key={company.id} className="flex items-center bg-card p-3 rounded-lg">
                      {company.logo_path ? (
                        <img 
                          src={apiService.getImageUrl(company.logo_path, 'w92')} 
                          alt={company.name}
                          className="h-8 mr-2"
                        />
                      ) : (
                        <div className="w-8 h-8 bg-muted rounded-full mr-2 flex items-center justify-center">
                          <span className="text-xs font-semibold">{company.name.charAt(0)}</span>
                        </div>
                      )}
                      <span>{company.name}</span>
                    </div>
                  ))}
                  
                  {(!movie.production_companies || movie.production_companies.length === 0) && (
                    <div className="text-muted-foreground">No production company information available.</div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Similar Movies */}
        {movie.similar?.results?.length > 0 && (
          <div className="mb-12">
            <TrendingSection 
              title="Similar Movies" 
              movies={movie.similar.results} 
              linkTo="/movies" 
              mediaType="movie"
            />
          </div>
        )}
      </div>
      
      {/* Trailer Modal */}
      {isTrailerOpen && trailerKey && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="relative w-full max-w-4xl">
            <button
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
              onClick={() => setIsTrailerOpen(false)}
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
            <div className="relative pt-[56.25%]">
              <iframe
                className="absolute inset-0 w-full h-full"
                src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1`}
                title={`${movie.title} Trailer`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default MovieDetailPage;
