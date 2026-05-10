import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Path apne hisaab se check karein
import { LogOut, User, PlaneTakeoff, ChevronDown } from 'lucide-react';

const Header = () => {
  const navigate = useNavigate();
  const { isLogin, logout, user } = useAuth();

  const handleLogout = () => {
    logout(); // Context wala logout call karein
    navigate('/login');
  };

  return (
    <header 
      className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-100 shadow-sm"
      data-aos="fade-down"
    >
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="bg-emerald-600 p-2 rounded-xl group-hover:rotate-12 transition-all duration-300 shadow-lg shadow-emerald-200">
             <PlaneTakeoff size={22} className="text-white" />
          </div>
          <span className="text-2xl font-black text-slate-800 tracking-tight">
            Trave<span className="text-emerald-600">loop</span>
          </span>
        </Link>

        {/* Navigation - Only for Logged In Users */}
        <nav className="hidden lg:flex items-center space-x-10 text-sm font-bold text-slate-600">
          <Link to="/dashboard" className="hover:text-emerald-600 transition-colors">Dashboard</Link>
          <Link to="/my-trips" className="hover:text-emerald-600 transition-colors">My Trips</Link>
          <Link to="/create-trip" className="hover:text-emerald-600 transition-colors">Plan Trip</Link>
        </nav>

        {/* Dynamic User Actions */}
        <div className="flex items-center gap-4">
          {!isLogin ? (
            <>
              <button 
                onClick={() => navigate("/login")}
                className="text-sm font-bold text-slate-700 hover:text-emerald-600 transition px-2"
              >
                Sign In
              </button>
              <button 
                onClick={() => navigate("/register")}
                className="bg-slate-900 hover:bg-slate-800 text-white px-6 py-3 rounded-2xl text-sm font-bold shadow-xl shadow-slate-200 transition-all active:scale-95"
              >
                Get Started
              </button>
            </>
          ) : (
            <div className="flex items-center gap-3">
              {/* Profile Dropdown Lookalike */}
              <div className="flex items-center gap-3 pl-4 pr-2 py-1.5 bg-slate-50 rounded-2xl border border-slate-100 hover:border-emerald-200 transition-colors cursor-pointer group">
                <div className="flex flex-col items-end hidden sm:block">
                  <span className="text-xs font-black text-slate-800 leading-none">
                    {user?.name || "Traveler"}
                  </span>
                  <span className="text-[10px] text-emerald-600 font-bold uppercase tracking-wider">
                    {user?.role || "Explorer"}
                  </span>
                </div>
                <div className="w-9 h-9 bg-emerald-600 rounded-xl flex items-center justify-center shadow-md shadow-emerald-100">
                  <User size={18} className="text-white" />
                </div>
                <ChevronDown size={14} className="text-slate-400 group-hover:text-emerald-600 transition-colors" />
              </div>

              {/* Logout Button */}
              <button 
                onClick={handleLogout}
                className="p-3 bg-red-50 text-red-500 hover:bg-red-500 hover:text-white rounded-xl transition-all duration-300 active:scale-90 shadow-sm"
                title="Logout"
              >
                <LogOut size={20} />
              </button>
            </div>
          )}
        </div>

      </div>
    </header>
  );
};

export default Header;