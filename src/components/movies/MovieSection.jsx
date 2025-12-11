import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa';
import MovieCard from './MovieCard';

const MovieSection = ({ title, movies, viewAllLink }) => {
  const scrollContainerRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const checkScrollPosition = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      checkScrollPosition();
      container.addEventListener('scroll', checkScrollPosition);
      window.addEventListener('resize', checkScrollPosition);
      
      return () => {
        container.removeEventListener('scroll', checkScrollPosition);
        window.removeEventListener('resize', checkScrollPosition);
      };
    }
  }, [movies]);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300;
      const currentScroll = scrollContainerRef.current.scrollLeft;
      const newScroll = direction === 'left' 
        ? currentScroll - scrollAmount 
        : currentScroll + scrollAmount;
      
      scrollContainerRef.current.scrollTo({
        left: newScroll,
        behavior: 'smooth'
      });
    }
  };

  if (movies.length === 0) return null;

  return (
    <div className="mb-12 relative group">
      <div className="flex items-center justify-between mb-4 px-8">
        <h3 className="text-2xl font-bold text-white flex items-center gap-3 group cursor-pointer">
          <div className="w-1 h-6 bg-primary rounded-full"></div>
          {title}
          {viewAllLink && (
            <Link to={viewAllLink}>
              <FaChevronRight className="text-gray-500 group-hover:text-white group-hover:translate-x-1 transition-all" size={20} />
            </Link>
          )}
        </h3>
      </div>
      
      {/* Left Arrow Button */}
      {showLeftArrow && (
        <button
          onClick={() => scroll('left')}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-30 bg-black/70 hover:bg-black/90 backdrop-blur-md rounded-full p-3 transition-all opacity-0 group-hover:opacity-100 shadow-lg border border-white/10"
          aria-label="Scroll left"
        >
          <FaChevronLeft className="text-white" size={18} />
        </button>
      )}
      
      {/* Right Arrow Button */}
      {showRightArrow && (
        <button
          onClick={() => scroll('right')}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-30 bg-black/70 hover:bg-black/90 backdrop-blur-md rounded-full p-3 transition-all opacity-0 group-hover:opacity-100 shadow-lg border border-white/10"
          aria-label="Scroll right"
        >
          <FaChevronRight className="text-white" size={18} />
        </button>
      )}
      
      <div 
        ref={scrollContainerRef}
        className="flex gap-4 overflow-x-auto pb-6 scrollbar-hide snap-x -mx-6 px-6 scroll-smooth"
        onScroll={checkScrollPosition}
      >
        {movies.map((movie, index) => (
          <div 
            key={movie.id} 
            className="min-w-[200px] md:min-w-[260px] snap-start"
          >
            <MovieCard movie={movie} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieSection;

