import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createMovie, getMovieById, updateMovie } from '../services/movieService';
import { toast } from 'react-toastify';

const AddEditMovie = () => {
  const { id } = useParams(); // Check if we are editing
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ 
    title: '', genre: '', year: '', poster: '', description: '', isFavorite: false 
  });

  // Effect to load data if editing
  useEffect(() => {
    if (id) {
      setLoading(true);
      getMovieById(id).then(res => {
        setForm(res.data);
        setLoading(false);
      }).catch(() => {
        toast.error("Movie not found.");
        navigate('/browse');
      });
    }
  }, [id, navigate]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        // UPDATE logic
        await updateMovie(id, form);
        toast.success(`'${form.title}' Updated!`);
      } else {
        // CREATE logic
        await createMovie({ ...form, id: Date.now() }); // Use Date.now() for unique ID for JSON-Server
        toast.success(`'${form.title}' Added!`);
      }
      navigate('/browse');
    } catch (error) {
      toast.error('Operation Failed. Check JSON-Server status.');
    }
  };
  
  if (id && loading) return <div className="pt-24 text-center dark:text-white">Loading Movie Data...</div>;

  return (
    <div className="pt-24 min-h-screen relative pb-16">
      <div className="container mx-auto px-4 flex justify-center">
        <div className="w-full max-w-2xl bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm p-8 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-800">
          <div className="mb-6">
            <h2 className="text-4xl font-extrabold mb-2 bg-gradient-to-r from-primary to-red-600 bg-clip-text text-transparent">
              {id ? 'Edit Movie' : 'Add New Movie'}
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              {id ? 'Update movie information' : 'Fill in the details to add a new movie'}
            </p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input name="title" value={form.title} onChange={handleChange} placeholder="Title" required className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-primary focus:outline-none"/>
            <input name="genre" value={form.genre} onChange={handleChange} placeholder="Genre" required className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-primary focus:outline-none"/>
            <input name="year" type="number" value={form.year} onChange={handleChange} placeholder="Year" required className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-primary focus:outline-none"/>
            <input name="poster" value={form.poster} onChange={handleChange} placeholder="Poster URL" required className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-primary focus:outline-none"/>
            <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" rows="4" className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-primary focus:outline-none"></textarea>
            
            <button type="submit" className="w-full bg-primary text-white py-4 rounded-xl hover:bg-red-700 font-bold transition-all duration-200 hover:scale-105 shadow-lg text-lg">
              {id ? 'Update Movie' : 'Create Movie'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddEditMovie;