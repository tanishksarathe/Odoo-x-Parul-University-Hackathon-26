import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100 shadow-sm">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        
        {/* Logo - Modern & Minimalist */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="bg-emerald-600 p-2 rounded-lg group-hover:rotate-12 transition-transform">
             {/* Simple Icon placeholder using a div */}
             <div className="w-5 h-5 border-2 border-white rounded-full border-t-transparent animate-spin-slow"></div>
          </div>
          <span className="text-2xl font-black text-slate-800 tracking-tight">
            Trave<span className="text-emerald-600">loop</span>
          </span>
        </Link>

        {/* Navigation - Better Spacing & Typography */}
        <nav className="hidden lg:flex items-center space-x-10 text-sm font-semibold text-slate-600">
          <Link to="/dashboard" className="hover:text-emerald-600 transition">Dashboard</Link>
          <Link to="/my-trips" className="hover:text-emerald-600 transition">My Trips</Link>
          <Link to="/create-trip" className="hover:text-emerald-600 transition">Plan Trip</Link>
        </nav>

        {/* User Actions - Premium Feel */}
        <div className="flex items-center gap-6">
          <button 
            onClick={() => navigate("/login")}
            className="text-sm font-bold text-slate-700 hover:text-emerald-600 transition"
          >
            Sign In
          </button>
          
          <button 
            onClick={() => navigate("/register")}
            className="bg-slate-900 hover:bg-slate-800 text-white px-6 py-2.5 rounded-xl text-sm font-bold shadow-lg shadow-slate-200 transition-all active:scale-95"
          >
            Get Started
          </button>
        </div>

      </div>
    </header>
  );
};

export default Header;