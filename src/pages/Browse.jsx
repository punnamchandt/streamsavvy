import React, { useEffect, useState } from 'react';
import { getMovies } from '../services/movieService';
import MovieCard from '../components/movies/MovieCard';
import { useSearchParams } from 'react-router-dom';
import useDebounce from '../hooks/useDebounce';
import { FaSearch, FaFilm } from 'react-icons/fa';

const Browse = () => {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const debouncedSearchTerm = useDebounce(query, 300);

  useEffect(() => {
    getMovies().then(res => {
      setMovies(res.data);
      setLoading(false);
    }).catch(err => console.error("Error fetching movies:", err));
  }, []);

  useEffect(() => {
    let filtered = movies;

    if (debouncedSearchTerm) {
      filtered = movies.filter(m => 
        m.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
        m.genre.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
      );
    }
    setFilteredMovies(filtered);
  }, [debouncedSearchTerm, movies]);

  if (loading) {
    return (
      <div className="pt-32 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
          <p className="text-xl dark:text-white">Loading Entertainment Library...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-16 min-h-screen relative">
      <div className="container mx-auto px-4 md:px-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-1 h-10 bg-gradient-to-b from-primary to-red-600 rounded"></div>
            <h2 className="text-4xl md:text-5xl font-extrabold dark:text-white">
              {query ? (
                <>
                  <FaSearch className="inline-block mr-3 text-primary" />
                  Search Results
                </>
              ) : (
                <>
                  <FaFilm className="inline-block mr-3 text-primary" />
                  Complete Library
                </>
              )}
            </h2>
          </div>
          {query && (
            <p className="text-lg text-gray-600 dark:text-gray-400 ml-4">
              Found <span className="font-bold text-primary">{filteredMovies.length}</span> {filteredMovies.length === 1 ? 'result' : 'results'} for "<span className="font-semibold">{query}</span>"
            </p>
          )}
        </div>

        {/* Movie Grid */}
        {filteredMovies.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6 relative">
            <div className="absolute inset-0 bg-black/10 backdrop-blur-[1px] -z-10 rounded-2xl"></div>
            {filteredMovies.map(movie => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="inline-block p-6 bg-gray-100 dark:bg-gray-800 rounded-full mb-4">
              <FaSearch className="text-4xl text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold dark:text-white mb-2">No titles found</h3>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              {query ? `No movies match "${query}". Try a different search term.` : 'No movies available at the moment.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Browse;