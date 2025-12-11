import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Contexts
import { ThemeProvider } from './context/ThemeContext';
import { PlayerProvider } from './context/PlayerContext';
import { AuthProvider } from './context/AuthContext';

// Components
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import MiniPlayer from './components/player/MiniPlayer';
import VideoBackground from './components/layout/VideoBackground';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Pages
import Home from './pages/Home';
import Browse from './pages/Browse';
import MovieDetails from './pages/MovieDetails';
import AddEditMovie from './pages/AddEditMovie';
import Login from './pages/Login';
import MyList from './pages/MyList'; // <--- IMPORT MYLIST

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <PlayerProvider>
          <BrowserRouter>
            <div className="min-h-screen font-sans text-gray-900 dark:text-white transition-colors duration-300 relative">
              {/* Video Background */}
              <VideoBackground />
              
              {/* Animated Background Particles (on top of video) */}
              <div className="fixed inset-0 overflow-hidden pointer-events-none z-[1]">
                {[...Array(15)].map((_, i) => (
                  <div
                    key={i}
                    className="particle"
                    style={{
                      left: `${Math.random() * 100}%`,
                      width: `${Math.random() * 3 + 1}px`,
                      height: `${Math.random() * 3 + 1}px`,
                      background: `rgba(${Math.random() > 0.5 ? '229, 9, 20' : '255, 255, 255'}, ${0.2 + Math.random() * 0.2})`,
                      animationDelay: `${Math.random() * 15}s`,
                      animationDuration: `${15 + Math.random() * 10}s`
                    }}
                  />
                ))}
              </div>
              
              <div className="relative z-10">
                <Navbar />
              
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/browse" element={<Browse />} />
                <Route path="/movie/:id" element={<MovieDetails />} />
                <Route path="/add" element={<AddEditMovie />} />
                <Route path="/edit-movie/:id" element={<AddEditMovie />} />
                <Route path="/login" element={<Login />} />
                
                {/* MYLIST ROUTE UPDATED */}
                <Route path="/mylist" element={<MyList />} /> 
              </Routes>

                <MiniPlayer />
                <Footer />
              </div>
              <ToastContainer 
                position="bottom-right" 
                theme="dark" 
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
              />
            </div>
          </BrowserRouter>
        </PlayerProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;