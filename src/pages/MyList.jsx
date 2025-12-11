import React, { useEffect, useState } from 'react';
import { getFavorites, getMovieById } from '../services/movieService';
import MovieCard from '../components/movies/MovieCard';
import { toast } from 'react-toastify';
import { FaHeart } from 'react-icons/fa';

const MyList = () => {
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = async () => {
    try {
      // 1. Get the list of favorite entries
      const favRes = await getFavorites();
      const favoriteEntries = favRes.data;

      if (favoriteEntries.length > 0) {
        // 2. Fetch the full movie data for each favorite entry
        // We use Promise.all to fetch them all in parallel
        const moviePromises = favoriteEntries.map(entry => getMovieById(entry.movieId));
        const movieResults = await Promise.all(moviePromises);
        
        // 3. Extract the movie data
        const movies = movieResults.map(res => res.data);
        setFavoriteMovies(movies);
      } else {
        setFavoriteMovies([]);
      }
      
    } catch (error) {
      console.error(error);
      toast.error("Could not load My List.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="pt-32 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
          <p className="text-xl dark:text-white">Loading My List...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-16 min-h-screen relative">
      <div className="container mx-auto px-4 md:px-8">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-1 h-10 bg-gradient-to-b from-primary to-red-600 rounded"></div>
            <h2 className="text-4xl md:text-5xl font-extrabold dark:text-white flex items-center gap-3">
              <FaHeart className="text-red-500 animate-pulse"/> My Favorites
            </h2>
          </div>
          <p className="text-gray-600 dark:text-gray-400 ml-4">
            {favoriteMovies.length} {favoriteMovies.length === 1 ? 'movie' : 'movies'} in your list
          </p>
        </div>

        {favoriteMovies.length === 0 ? (
          <div className="text-center py-20">
            <div className="inline-block p-6 bg-gray-100 dark:bg-gray-800 rounded-full mb-4">
              <FaHeart className="text-4xl text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold dark:text-white mb-2">Your list is empty</h3>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
              Start building your collection by adding movies you love!
            </p>
            <a 
              href="/browse" 
              className="inline-block bg-primary text-white px-8 py-3 rounded-lg font-bold hover:bg-red-700 transition-all duration-200 hover:scale-105"
            >
              Browse Movies
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
            {favoriteMovies.map(movie => <MovieCard key={movie.id} movie={movie} />)}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyList;