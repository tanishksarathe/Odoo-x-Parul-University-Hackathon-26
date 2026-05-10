import React, { useState } from 'react';
import api from "../config/API";
import toast from 'react-hot-toast';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post('/user/register', formData);
      toast.success("Account created successfully! Welcome to Traveloop.");
      navigate('/login');
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Register failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[90vh] flex items-center justify-center bg-[#f8fafc] px-4">
      {/* Background decoration elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-emerald-100 rounded-full blur-3xl opacity-50"></div>
      <div className="absolute bottom-10 right-10 w-40 h-40 bg-blue-100 rounded-full blur-3xl opacity-50"></div>

      <div className="relative z-10 p-8 bg-white/80 backdrop-blur-xl shadow-2xl shadow-emerald-100/50 rounded-3xl border border-white w-full max-w-md">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-black text-slate-800">Join <span className="text-emerald-600">Traveloop</span></h2>
          <p className="text-slate-500 mt-2 font-medium">Start planning your dream trip today</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1">
            <label className="block text-sm font-bold text-slate-700 ml-1">Full Name</label>
            <input 
              type="text" 
              name="name" 
              placeholder="John Doe"
              onChange={handleChange} 
              required
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-bold text-slate-700 ml-1">Email Address</label>
            <input 
              type="email" 
              name="email" 
              placeholder="name@example.com"
              onChange={handleChange} 
              required
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-bold text-slate-700 ml-1">Password</label>
            <input 
              type="password" 
              name="password" 
              placeholder="••••••••"
              onChange={handleChange} 
              required
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-slate-900 hover:bg-emerald-600 text-white py-3.5 rounded-xl font-bold shadow-lg shadow-slate-200 transition-all transform active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed mt-2"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-slate-100 text-center">
          <p className="text-sm text-slate-600 font-medium">
            Already have an account?{' '}
            <Link to="/login" className="text-emerald-600 hover:underline font-bold">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;