# Movie Lens - Movie Discovery Platform

Movie Lens is a modern web application built with React that helps users discover, search, and track their favorite movies and TV shows. The application uses The Movie Database (TMDb) API to provide up-to-date information about movies and TV series.

## Features

- **Movie Discovery**: Browse popular, trending, and top-rated movies
- **TV Shows**: Explore popular TV series and shows
- **Search Functionality**: Search for movies and TV shows by title
- **Detailed Information**: View comprehensive details about movies and TV shows including:
  - Cast and crew information
  - Ratings and reviews
  - Release dates
  - Trailers and videos
  - Similar recommendations
- **Favorites System**: Save and manage your favorite movies and TV shows
- **Responsive Design**: Fully responsive interface that works on desktop and mobile devices
- **Dark Mode**: Toggle between light and dark themes
- **User Authentication**: Basic login functionality to manage user-specific data (like favorites).

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Dilshan-Mindika/MovieLens
cd MovieLens
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory and add your TMDb API key:
```env
VITE_TMDB_API_KEY=your_api_key_here
```

4. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:8080`

Other useful scripts:
- `npm run build`: Builds the application for production.
- `npm run lint`: Lints the codebase using ESLint.
- `npm run preview`: Serves the production build locally for preview.

## Project Structure

```
src/
├── App.jsx          # Main application component and router setup
├── main.jsx         # Entry point of the application
├── components/      # UI components
│   ├── auth/        # Authentication related components (e.g., Login)
│   ├── home/        # Components specific to the home page (e.g., HeroSection)
│   ├── layout/      # Layout components (e.g., Header, Footer)
│   ├── movies/      # Movie related components (e.g., MovieCard, MovieGrid)
│   ├── search/      # Search related components (e.g., SearchBar)
│   └── ui/          # General reusable UI elements (e.g., from shadcn/ui)
├── context/         # React context providers (e.g., MovieContext)
├── hooks/           # Custom React hooks (e.g., useMobile, useToast)
├── lib/             # Utility functions (e.g., utils.js)
├── pages/           # Page components for different routes
├── services/        # API service integrations (e.g., api.js for TMDb)
└── index.css        # Global styles
```

## API Integration

The application uses the TMDb API for all movie and TV show data. API calls are centralized in the `src/services/api.js` file. Key API functionalities include:

- Image fetching: Constructing image URLs for posters and backdrops.
- Movie search: `/search/movie`
- Trending movies: `/trending/movie/{timeWindow}`
- Movie details: `/movie/{movieId}` (with appended videos, credits, similar movies)
- Popular movies: `/movie/popular`
- Movie genres list: `/genre/movie/list`
- Discover movies by genre: `/discover/movie`
- Popular TV shows: `/tv/popular`
- TV show details: `/tv/{tvId}` (with appended videos, credits, similar shows)
- Trending TV shows: `/trending/tv/{timeWindow}`

## Technologies Used

- **React**: A JavaScript library for building user interfaces.
- **Vite**: A fast build tool and development server.
- **Tailwind CSS**: A utility-first CSS framework.
- **shadcn/ui**: Beautifully designed components built with Radix UI and Tailwind CSS.
- **Axios**: A promise-based HTTP client for making API requests.
- **React Router**: For declarative routing in the application.
- **React Query (TanStack Query)**: For server state management, caching, and data synchronization.
- **Lucide React**: A library of simply beautiful open-source icons.
```
