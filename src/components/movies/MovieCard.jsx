import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaPlay, FaInfoCircle, FaFilm } from 'react-icons/fa';
import { usePlayer } from '../../context/PlayerContext';

const MovieCard = ({ movie }) => {
  const { setCurrentVideo } = usePlayer();
  const [imageError, setImageError] = useState(false);
  
  const fallbackImage = `https://via.placeholder.com/500x750/1a1a1a/E50914?text=${encodeURIComponent(movie.title)}`;

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div className="group relative aspect-[2/3] bg-gray-800 rounded-xl overflow-hidden cursor-pointer transition-all duration-500 hover:scale-105 hover:z-20 hover:shadow-[0_0_25px_rgba(220,38,38,0.4)] border border-transparent hover:border-primary/30">
      {!imageError ? (
        <img 
          src={movie.poster} 
          alt={movie.title} 
          className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition duration-500" 
          onError={handleImageError}
          loading="lazy"
        />
      ) : (
        <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex flex-col items-center justify-center">
          <FaFilm className="text-6xl text-gray-600 mb-4" />
          <p className="text-gray-400 text-sm text-center px-4">{movie.title}</p>
        </div>
      )}
      
      {/* Hover Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
        {/* Play Icon that pops up */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform scale-0 group-hover:scale-100 transition-transform duration-300 delay-100 bg-primary rounded-full p-3 shadow-lg shadow-red-900/50">
          <FaPlay fill="white" size={24} className="text-white ml-1" />
        </div>
        
        <h4 className="font-bold text-white mb-1 leading-tight text-lg translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
          {movie.title}
        </h4>
        
        <div className="flex justify-between items-center text-xs text-gray-300 translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
          <span className="flex items-center gap-1">
            <FaPlay size={10} fill="currentColor" /> {movie.year}
          </span>
          <span className="text-green-400 font-bold">{movie.genre}</span>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;