import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (login(email, password)) {
      navigate('/'); // Redirect to home on successful login
    }
  };

  return (
    <div className="pt-24 min-h-screen flex justify-center items-center px-4 relative">
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm p-8 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-800">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-extrabold mb-2 bg-gradient-to-r from-primary to-red-600 bg-clip-text text-transparent">Sign In</h2>
          <p className="text-gray-600 dark:text-gray-400">Welcome back to StreamSavvy</p>
        </div>
        <div className="space-y-4">
          <input 
            type="email" 
            placeholder="Email (test@test.com)" 
            required 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 rounded-md border dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-primary"
          />
          <input 
            type="password" 
            placeholder="Password (123)" 
            required 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 rounded-md border dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-primary"
          />
          <button 
            type="submit" 
            className="w-full bg-primary text-white py-3 rounded-xl font-bold hover:bg-red-700 transition-all duration-200 hover:scale-105 shadow-lg"
          >
            Log In
          </button>
          <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-4">
            Demo: test@test.com / 123
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;