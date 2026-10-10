
import React, { Component, useMemo } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { ThemeProvider } from './context/ThemeContext';
import { PlayerProvider } from './context/PlayerContext';
import { AuthProvider } from './context/AuthContext';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import MiniPlayer from './components/player/MiniPlayer';
import VideoBackground from './components/layout/VideoBackground';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Home from './pages/Home';
import Browse from './pages/Browse';
import MovieDetails from './pages/MovieDetails';
import AddEditMovie from './pages/AddEditMovie';
import Login from './pages/Login';
import MyList from './pages/MyList';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      errorMessage: ''
    };
  }

  static getDerivedStateFromError(error) {
    return {
      hasError: true,
      errorMessage: error.message
    };
  }

  componentDidCatch(error, errorInfo) {
    console.error('PR Agent - Runtime Bug Detected:', {
      message: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
      timestamp: new Date().toISOString()
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gray-950 text-white flex flex-col items-center justify-center p-6">
          <h1 className="text-3xl font-bold text-red-500 mb-4">
            Runtime Error Detected
          </h1>
          <p className="text-gray-300 mb-4">
            A component failed to render.
          </p>
          <pre className="max-w-full overflow-auto whitespace-pre-wrap rounded bg-gray-900 p-4 text-sm text-red-300">
            {this.state.errorMessage}
          </pre>
          <button
            onClick={() => window.location.reload()}
            className="mt-6 rounded bg-red-600 px-5 py-2 hover:bg-red-700"
          >
            Reload Application
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-6">
      <h1 className="text-3xl font-bold mb-3">
        404 - Page Not Found
      </h1>
      <p className="mb-5">
        The requested page does not exist.
      </p>
      <a
        href="/"
        className="rounded bg-red-600 px-5 py-2 text-white hover:bg-red-700"
      >
        Return Home
      </a>
    </div>
  );
}

function AppContent() {
  const particles = useMemo(
    () =>
      Array.from({ length: 15 }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        size: `${Math.random() * 3 + 1}px`,
        background: `rgba(${
          Math.random() > 0.5
            ? '229, 9, 20'
            : '255, 255, 255'
        }, ${0.2 + Math.random() * 0.2})`,
        animationDelay: `${Math.random() * 15}s`,
        animationDuration: `${15 + Math.random() * 10}s`
      })),
    []
  );

  return (
    <BrowserRouter>
      <div className="min-h-screen font-sans text-gray-900 dark:text-white transition-colors duration-300 relative">
        <VideoBackground />

        <div
          aria-hidden="true"
          className="fixed inset-0 overflow-hidden pointer-events-none z-[1]"
        >
          {particles.map((particle) => (
            <div
              key={particle.id}
              className="particle"
              style={{
                left: particle.left,
                width: particle.size,
                height: particle.size,
                background: particle.background,
                animationDelay: particle.animationDelay,
                animationDuration: particle.animationDuration
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
            <Route path="/mylist" element={<MyList />} />
            <Route path="*" element={<NotFound />} />
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
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <AuthProvider>
          <PlayerProvider>
            <AppContent />
          </PlayerProvider>
        </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
