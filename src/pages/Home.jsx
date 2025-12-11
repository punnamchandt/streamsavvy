import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getMovies } from '../services/movieService';
import MovieCard from '../components/movies/MovieCard';
import TrendingCarousel from '../components/movies/TrendingCarousel';
import MovieSection from '../components/movies/MovieSection';
import { FaChevronRight } from 'react-icons/fa';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [trending, setTrending] = useState([]);
  const [popular, setPopular] = useState([]);
  const [newReleases, setNewReleases] = useState([]);
  const [featured, setFeatured] = useState(null);

  useEffect(() => {
    getMovies().then(res => {
      const allMovies = res.data;
      setMovies(allMovies);
      
      // Featured movie (first one)
      if (allMovies.length > 0) {
        setFeatured(allMovies[0]);
      }
      
      // Trending: First 6 movies
      setTrending(allMovies.slice(0, 6));
      
      // Popular: Mix of different genres
      const popularMovies = allMovies.filter(m => 
        ['Action', 'Sci-Fi', 'Thriller'].includes(m.genre)
      ).slice(0, 6);
      setPopular(popularMovies.length > 0 ? popularMovies : allMovies.slice(0, 6));
      
      // New Releases: Recent years
      const recent = allMovies
        .filter(m => m.year >= 2010)
        .sort((a, b) => b.year - a.year)
        .slice(0, 6);
      setNewReleases(recent.length > 0 ? recent : allMovies.slice(0, 6));
    }).catch(err => console.error("Error fetching movies:", err));
  }, []);


  return (
    <div className="pb-16">
      {/* Trending Movies Carousel Hero Banner */}
      {trending.length > 0 && (
        <TrendingCarousel movies={trending} />
      )}

      {/* Content Sections */}
      <div className="mt-12">
        {/* Trending Movies Horizontal Scroll */}
        <MovieSection 
          title="Trending Now" 
          movies={trending} 
          viewAllLink="/browse"
        />
        
        <MovieSection 
          title="Popular Movies" 
          movies={popular} 
          viewAllLink="/browse"
        />
        
        <MovieSection 
          title="New Releases" 
          movies={newReleases} 
          viewAllLink="/browse"
        />
      </div>
    </div>
  );
};

export default Home;
