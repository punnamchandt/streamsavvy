import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSearch, FaSun, FaMoon, FaBars, FaTimes } from 'react-icons/fa'; // Added hamburger icons
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext'; // <--- NEW IMPORT

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth(); // <--- USE AUTH HOOK
  const [term, setTerm] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Mobile state
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if(term.trim()) navigate(`/browse?q=${term}`);
  };

  return (
    <nav className="fixed w-full z-50 glass-nav px-6 py-4 shadow-lg flex justify-between items-center transition-all duration-300">
      <div className="flex items-center gap-8">
        <Link to="/" className="text-3xl font-extrabold gradient-text tracking-tighter cursor-pointer hover:scale-105 transition-transform">
          STREAM<span className="text-white">SAVVY</span>
        </Link>
      
        {/* Desktop Links */}
        <div className="hidden md:flex gap-6 text-sm font-medium">
          <Link 
            to="/" 
            className="text-gray-400 hover:text-white transition-all pb-1 border-b-2 border-transparent hover:border-primary"
          >
            Home
          </Link>
          <Link 
            to="/browse" 
            className="text-gray-400 hover:text-white transition-all pb-1 border-b-2 border-transparent hover:border-primary"
          >
            Browse
          </Link>
          <Link 
            to="/mylist" 
            className="text-gray-400 hover:text-white transition-all pb-1 border-b-2 border-transparent hover:border-primary"
          >
            My List
          </Link>
          {user && (
            <Link 
              to="/add" 
              className="text-gray-400 hover:text-white transition-all pb-1 border-b-2 border-transparent hover:border-primary"
            >
              Add Movie
            </Link>
          )}
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* Search Bar */}
        <form onSubmit={handleSearch} className="hidden md:block relative group">
          <FaSearch className="absolute left-2 top-2 h-4 w-4 text-gray-400 group-focus-within:text-primary transition-colors"/>
          <input 
            className="bg-black/30 border border-gray-700/50 rounded-full py-1.5 pl-8 pr-4 text-sm focus:outline-none focus:border-primary focus:bg-black/60 focus:ring-1 focus:ring-primary transition-all w-64 backdrop-blur-sm text-white placeholder-gray-400" 
            placeholder="Search..." 
            value={term}
            onChange={(e)=>setTerm(e.target.value)}
          />
        </form>
        
        {/* Theme Toggle */}
        <button 
          onClick={toggleTheme} 
          className="text-xl dark:text-yellow-400 text-gray-600 hover:scale-110 transition-transform duration-200 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? <FaSun/> : <FaMoon/>}
        </button>

        {/* Auth Button */}
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <>
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center font-bold text-xs shadow-lg shadow-purple-900/50 text-white">
                {user.name?.[0] || 'U'}
              </div>
              <button 
                onClick={logout} 
                className="text-xs text-gray-300 hover:text-white hover:underline decoration-primary decoration-2 underline-offset-4 transition-all"
              >
                Sign Out
              </button>
            </>
          ) : (
            <Link 
              to="/login" 
              className="bg-gradient-to-r from-primary to-purple-600 hover:from-red-500 hover:to-purple-500 text-white px-5 py-1.5 rounded-full text-sm font-bold shadow-lg shadow-purple-900/40 hover:shadow-purple-700/60 hover:scale-105 transition-all"
            >
              Sign In
            </Link>
          )}
        </div>
        
        {/* Mobile Toggle */}
        <button className="md:hidden text-2xl dark:text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>
      
      {/* Mobile Menu (Overlay) */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white dark:bg-gray-900 shadow-lg p-4 flex flex-col space-y-3">
           <Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link>
           <Link to="/browse" onClick={() => setIsMenuOpen(false)}>Browse</Link>
           <Link to="/mylist" onClick={() => setIsMenuOpen(false)}>My List</Link>
           {user && <Link to="/add" onClick={() => setIsMenuOpen(false)}>Add Movie</Link>}
           <div className="pt-2 border-t border-gray-700">
             {user ? <button onClick={logout} className="w-full text-left">Logout</button> : <Link to="/login">Sign In</Link>}
           </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;