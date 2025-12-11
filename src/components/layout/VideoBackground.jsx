import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from '../../context/ThemeContext';

const VideoBackground = () => {
  const { theme } = useTheme();
  const [videoIndex, setVideoIndex] = useState(0);
  const videoRef = useRef(null);
  
  // Array of video backgrounds - using free stock video URLs from Pexels
  // These are cinematic, abstract videos perfect for a streaming platform
  const videoSources = [
    'https://videos.pexels.com/video-files/3045163/3045163-hd_1920_1080_30fps.mp4', // Abstract cinematic
    'https://videos.pexels.com/video-files/3044454/3044454-hd_1920_1080_30fps.mp4', // Dark cinematic
    'https://videos.pexels.com/video-files/2491284/2491284-hd_1920_1080_25fps.mp4', // Cinematic atmosphere
    'https://videos.pexels.com/video-files/3045163/3045163-hd_1920_1080_30fps.mp4'  // Fallback
  ];

  // Fallback animated gradient backgrounds if videos don't load
  const gradientBackgrounds = [
    'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
    'linear-gradient(135deg, #2d1b69 0%, #11998e 50%, #38ef7d 100%)',
    'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
    'linear-gradient(135deg, #f093fb 0%, #f5576c 50%, #4facfe 100%)'
  ];

  const [videoError, setVideoError] = useState(false);
  const [currentVideo, setCurrentVideo] = useState(videoSources[0]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Rotate videos every 45 seconds for variety
    const interval = setInterval(() => {
      const nextIndex = (videoIndex + 1) % videoSources.length;
      setVideoIndex(nextIndex);
      setCurrentVideo(videoSources[nextIndex]);
      setVideoError(false);
      setIsLoading(true);
    }, 45000);

    return () => clearInterval(interval);
  }, [videoIndex, videoSources]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
    }
  }, [currentVideo]);

  const handleVideoError = () => {
    setVideoError(true);
    setIsLoading(false);
  };

  const handleVideoLoaded = () => {
    setIsLoading(false);
  };

  return (
    <div className="fixed inset-0 w-full h-full z-0 overflow-hidden">
      {/* Animated Gradient Background (Fallback) */}
      <div className="absolute inset-0 w-full h-full animate-gradient-xy"></div>
      
      {/* Loading state */}
      {isLoading && !videoError && (
        <div 
          className="absolute inset-0 w-full h-full animate-gradient-xy"
        />
      )}
      
      {!videoError ? (
        <video
          ref={videoRef}
          key={currentVideo}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000"
          onError={handleVideoError}
          onLoadedData={handleVideoLoaded}
          style={{
            opacity: isLoading ? 0 : 0.6,
            filter: 'brightness(0.3) contrast(1.2) saturate(1.1)'
          }}
        >
          <source src={currentVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : (
        <div 
          className="absolute inset-0 w-full h-full animate-gradient-xy"
        />
      )}
      
      {/* Primary overlay for better content readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-900/40 to-transparent"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-gray-950/90 via-black/40 to-transparent"></div>
      
      {/* Animated gradient overlay for extra cinematic depth */}
      <div 
        className="absolute inset-0 opacity-30 transition-opacity duration-500"
        style={{
          background: 'radial-gradient(circle at 20% 50%, rgba(220, 38, 38, 0.3) 0%, transparent 60%), radial-gradient(circle at 80% 80%, rgba(147, 51, 234, 0.2) 0%, transparent 60%), radial-gradient(circle at 50% 20%, rgba(75, 0, 130, 0.2) 0%, transparent 60%)',
          animation: 'float 25s ease-in-out infinite'
        }}
      />
      
      {/* Subtle vignette effect */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/40 pointer-events-none" />
    </div>
  );
};

export default VideoBackground;

