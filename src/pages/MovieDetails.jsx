import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getMovieById, deleteMovie, getFavorites, addFavorite, removeFavorite } from '../services/movieService';
import { toast } from 'react-toastify';
import { FaPlay, FaHeart, FaTrash, FaEdit, FaFilm } from 'react-icons/fa';
import { usePlayer } from '../context/PlayerContext';

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { setCurrentVideo } = usePlayer();
  
  const [movie, setMovie] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    // 1. Fetch Movie Details
    getMovieById(id)
      .then(res => setMovie(res.data))
      .catch(() => navigate('/404'));
    
    // 2. Check if already in Favorites
    checkFavoriteStatus();
  }, [id, navigate]);

  const checkFavoriteStatus = async () => {
    try {
      const res = await getFavorites();
      // Check if this movie ID exists in the favorites list
      const favoriteItem = res.data.find(fav => fav.movieId === parseInt(id) || fav.movieId === id);
      setIsFavorite(!!favoriteItem);
    } catch (error) {
      console.error("Error checking favorites", error);
    }
  };

  const handleToggleFavorite = async () => {
    try {
      if (isFavorite) {
        // Remove from favorites
        const favoritesRes = await getFavorites();
        const favItem = favoritesRes.data.find(fav => fav.movieId === parseInt(id) || fav.movieId === id);
        if (favItem) {
          await removeFavorite(favItem.id);
          toast.info(`${movie.title} removed from My List.`);
        }
      } else {
        // Add to favorites (Mocking userId: 1)
        await addFavorite({ movieId: movie.id, userId: 1 });
        toast.success(`${movie.title} added to My List!`);
      }
      setIsFavorite(!isFavorite); // Toggle state UI
    } catch (error) {
      toast.error("Could not update My List.");
    }
  };

  const handleDelete = async () => {
    if (window.confirm(`Are you sure you want to delete ${movie.title}?`)) {
      await deleteMovie(id);
      toast.info(`${movie.title} deleted successfully.`);
      navigate('/browse');
    }
  };

  if (!movie) {
    return (
      <div className="pt-32 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
          <p className="text-xl dark:text-white">Loading movie details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-dark dark:to-black">
      {/* Hero Section with Backdrop */}
      <div 
        className="relative h-[60vh] w-full bg-cover bg-center"
        style={{ 
          backgroundImage: !imageError 
            ? `linear-gradient(to bottom, rgba(0,0,0,0.7), rgba(0,0,0,0.9)), url(${movie.poster})`
            : 'linear-gradient(to bottom, rgba(20,20,20,0.95), rgba(0,0,0,0.98))',
          backgroundPosition: 'center',
          backgroundSize: 'cover'
        }}
      >
        {imageError && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <FaFilm className="text-6xl text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400 text-xl">{movie.title}</p>
            </div>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 -mt-32 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Poster */}
          <div className="lg:col-span-4">
            <div className="relative group">
              {!imageError ? (
                <img 
                  src={movie.poster} 
                  alt={movie.title} 
                  className="w-full rounded-2xl shadow-2xl transform group-hover:scale-105 transition-transform duration-300" 
                  onError={() => setImageError(true)}
                />
              ) : (
                <div className="w-full aspect-[2/3] bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-2xl flex flex-col items-center justify-center">
                  <FaFilm className="text-8xl text-gray-600 mb-4" />
                  <p className="text-gray-400 text-lg text-center px-4">{movie.title}</p>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
          </div>
          
          {/* Details */}
          <div className="lg:col-span-8 dark:text-gray-200">
            <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-2xl">
              <div className="mb-4">
                <span className="inline-block bg-primary/20 text-primary px-4 py-1 rounded-full text-sm font-semibold mb-3">
                  {movie.genre}
                </span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-extrabold mb-4 bg-gradient-to-r from-primary to-red-600 bg-clip-text text-transparent">
                {movie.title}
              </h1>
              
              <div className="flex items-center gap-4 mb-6 text-gray-600 dark:text-gray-400">
                <span className="font-semibold text-lg">{movie.year}</span>
                <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
                <span className="text-lg">{movie.genre}</span>
              </div>
              
              <p className="text-lg md:text-xl mb-8 leading-relaxed text-gray-700 dark:text-gray-300">
                {movie.description}
              </p>
              
              {/* User Actions */}
              <div className="flex flex-wrap gap-4 mb-8">
                <button 
                  onClick={() => setCurrentVideo(movie)}
                  className="flex items-center gap-3 bg-primary text-white px-8 py-4 rounded-xl font-bold hover:bg-red-700 transition-all duration-200 hover:scale-105 shadow-lg text-lg"
                >
                  <FaPlay /> Watch Now
                </button>
                
                <button 
                  onClick={handleToggleFavorite}
                  className={`flex items-center gap-3 px-8 py-4 rounded-xl font-bold transition-all duration-200 hover:scale-105 shadow-lg text-lg ${
                    isFavorite 
                      ? 'bg-green-600 hover:bg-green-700 text-white' 
                      : 'bg-gray-700 hover:bg-gray-600 text-white dark:bg-gray-800 dark:hover:bg-gray-700'
                  }`}
                >
                  <FaHeart className={isFavorite ? 'text-red-300' : ''} /> 
                  {isFavorite ? 'In My List' : 'Add to My List'}
                </button>
              </div>

              {/* Admin Actions */}
              <div className="flex gap-4 border-t border-gray-200 dark:border-gray-700 pt-6 mt-6">
                <button 
                  onClick={() => navigate(`/edit-movie/${movie.id}`)}
                  className="flex items-center gap-2 text-blue-500 hover:text-blue-400 font-medium transition-colors hover:underline"
                >
                  <FaEdit /> Edit Movie
                </button>
                <button 
                  onClick={handleDelete}
                  className="flex items-center gap-2 text-red-500 hover:text-red-400 font-medium transition-colors hover:underline"
                >
                  <FaTrash /> Delete Movie
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;