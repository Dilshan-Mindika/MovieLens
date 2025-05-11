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

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
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

## Project Structure

```
src/
├── components/     # Reusable UI components
├── context/       # React context providers
├── hooks/         # Custom React hooks
├── pages/         # Page components
├── services/      # API services
└── lib/           # Utility functions
```

## API Integration

The application uses the TMDb API for all movie and TV show data. The main API endpoints used include:

- `/movie/popular` - Get popular movies
- `/movie/{id}` - Get detailed movie information
- `/search/movie` - Search for movies
- `/tv/popular` - Get popular TV shows
- `/trending/movie/day` - Get trending movies

API calls are centralized in the `services/api.js` file.

## Technologies Used

- React
- Vite
- Tailwind CSS
- shadcn/ui
- Axios
- React Router
- React Query
