import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaPlay, FaInfoCircle, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const TrendingCarousel = ({ movies }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying || movies.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % movies.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying, movies.length]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000); // Resume auto-play after 10 seconds
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + movies.length) % movies.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % movies.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  if (movies.length === 0) return null;

  const currentMovie = movies[currentIndex];

  return (
    <div 
      className="relative h-[70vh] w-full rounded-2xl overflow-hidden mb-12 group shadow-[0_0_40px_rgba(0,0,0,0.5)] border border-white/10"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Background Images with Fade Transition */}
      {movies.map((movie, index) => (
        <div
          key={movie.id}
          className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? 'opacity-100 z-0' : 'opacity-0 z-[-1]'
          }`}
        >
          <img 
            src={movie.poster} 
            className={`w-full h-full object-cover ${
              index === currentIndex ? 'animate-ken-burns' : ''
            }`}
            alt={movie.title}
          />
        </div>
      ))}
      
      {/* Gradient Overlays for Readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-900/40 to-transparent z-10"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-gray-950/90 via-black/40 to-transparent z-10"></div>
      
      {/* Navigation Arrows */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 backdrop-blur-sm rounded-full p-3 transition-all opacity-0 group-hover:opacity-100"
        aria-label="Previous movie"
      >
        <FaChevronLeft className="text-white" size={20} />
      </button>
      
      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 backdrop-blur-sm rounded-full p-3 transition-all opacity-0 group-hover:opacity-100"
        aria-label="Next movie"
      >
        <FaChevronRight className="text-white" size={20} />
      </button>
      
      {/* Content */}
      <div className="absolute bottom-0 left-0 p-8 md:p-16 w-full md:w-2/3 lg:w-1/2 z-10">
        <div className="flex items-center gap-3 mb-4">
          <span className="px-3 py-1 bg-gradient-to-r from-primary to-orange-600 text-xs font-bold rounded shadow-lg shadow-red-900/50 text-white">
            #{currentIndex + 1} TRENDING
          </span>
          <span className="text-xs font-bold text-gray-300 border border-gray-600 px-2 py-0.5 rounded">
            ULTRA HD 4K
          </span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-black mb-4 leading-tight text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-400 drop-shadow-xl">
          {currentMovie.title}
        </h1>
        
        <div className="flex items-center gap-4 mb-4 text-gray-300 text-sm">
          <span className="font-semibold">{currentMovie.year}</span>
          <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
          <span>{currentMovie.genre}</span>
        </div>
        
        <p className="text-gray-200 text-lg mb-8 line-clamp-2 drop-shadow-md">
          {currentMovie.description}
        </p>
        
        <div className="flex gap-4">
          <Link 
            to={`/movie/${currentMovie.id}`}
            className="bg-white text-black px-8 py-3.5 rounded-full flex items-center gap-2 font-bold hover:bg-gray-200 hover:scale-105 transition-all shadow-[0_0_20px_rgba(255,255,255,0.3)]"
          >
            <FaPlay /> Play Now
          </Link>
          <Link 
            to={`/movie/${currentMovie.id}`}
            className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-3.5 rounded-full flex items-center gap-2 font-bold hover:bg-white/20 hover:scale-105 transition-all"
          >
            <FaInfoCircle /> More Info
          </Link>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {movies.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? 'w-8 bg-primary'
                : 'w-2 bg-white/50 hover:bg-white/70'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default TrendingCarousel;

