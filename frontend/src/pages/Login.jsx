import React, { useState } from 'react';
import api from "../config/API";
import toast from 'react-hot-toast';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
    const { setUser, setIsLogin, setRole } = useAuth();

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
<<<<<<< HEAD
      const res = await api.post('/api/auth/login', formData);
      
      // Token save karna zaroori hai authentication ke liye
      localStorage.setItem('token', res.data.token);
      
=======
      const res = await api.post('/user/login', formData); 
>>>>>>> 36245c2e778116f78dbad91de05437fde7745110
      toast.success("Welcome back! Logging you in...");
      setUser(res.data.data);
      setIsLogin(true);
      sessionStorage.setItem("Traveloop", JSON.stringify(res.data.data));
      navigate('/'); // Login ke baad home ya dashboard par bhejein
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[90vh] flex items-center justify-center bg-[#f8fafc] px-4">
      {/* Visual background elements for premium feel */}
      <div className="absolute top-40 right-20 w-48 h-48 bg-emerald-50 rounded-full blur-3xl opacity-60"></div>
      
      <div className="relative z-10 p-10 bg-white shadow-2xl shadow-slate-200/60 rounded-[2.5rem] border border-slate-50 w-full max-w-md">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-50 rounded-2xl mb-4">
             <div className="w-8 h-8 border-4 border-emerald-600 rounded-full border-t-transparent"></div>
          </div>
          <h2 className="text-3xl font-black text-slate-800 tracking-tight">Welcome Back</h2>
          <p className="text-slate-500 mt-2 font-medium">Ready for your next adventure?</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-1.5">
            <label className="block text-sm font-bold text-slate-700 ml-1">Email Address</label>
            <input 
              type="email" 
              name="email" 
              placeholder="name@example.com"
              onChange={handleChange} 
              required
              className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all font-medium"
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between items-center ml-1">
              <label className="block text-sm font-bold text-slate-700">Password</label>
              <Link to="/forgot-password" variant="caption" className="text-xs font-bold text-emerald-600 hover:text-emerald-700">
                Forgot?
              </Link>
            </div>
            <input 
              type="password" 
              name="password" 
              placeholder="••••••••"
              onChange={handleChange} 
              required
              className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all font-medium"
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-slate-900 hover:bg-emerald-600 text-white py-4 rounded-2xl font-bold shadow-xl shadow-emerald-100 transition-all transform active:scale-[0.98] disabled:opacity-70 mt-4"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div className="mt-10 pt-8 border-t border-slate-50 text-center">
          <p className="text-sm text-slate-500 font-medium">
            Don't have an account?{' '}
            <Link to="/register" className="text-emerald-600 hover:text-emerald-700 font-bold">
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;