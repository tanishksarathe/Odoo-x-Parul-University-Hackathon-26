import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Plus, Calendar, ArrowRight, MapPin, 
  TrendingUp, Wallet, ShieldCheck, Globe 
} from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <div className="min-h-screen bg-[#f8fafc] pb-20 overflow-x-hidden">
      
      {/* 1. Hero Section */}
      <section className="relative bg-white pt-20 pb-32 overflow-hidden">
        <div className="container mx-auto px-6 flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 text-center lg:text-left" data-aos="fade-right">
            <span className="inline-block px-4 py-2 bg-emerald-50 text-emerald-700 rounded-full text-sm font-bold mb-6">
              ✨ Smart Travel Planning
            </span>
            <h1 className="text-6xl font-black text-slate-900 leading-tight">
              Plan Your Next <br />
              <span className="text-emerald-600">Masterpiece</span> Trip
            </h1>
            <p className="text-slate-500 mt-6 text-xl max-w-lg mx-auto lg:mx-0">
              Traveloop helps you organize multi-city itineraries, manage budgets, and explore hidden gems.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
              <button 
                onClick={() => navigate('/create-trip')}
                className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-bold hover:bg-emerald-600 transition-all transform hover:-translate-y-1 shadow-xl"
              >
                Start Planning Free
              </button>
              <button className="flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-bold text-slate-700 hover:bg-slate-50 transition-all">
                See How it Works <ArrowRight size={18} />
              </button>
            </div>
          </div>
          
          {/* Animated Stats Card */}
          <div className="flex-1 relative" data-aos="zoom-in" data-aos-delay="300">
            <div className="relative z-10 bg-white p-8 rounded-[3rem] shadow-2xl border border-slate-100">
              <div className="flex items-center gap-4 mb-8">
                <div className="bg-emerald-500 p-3 rounded-2xl text-white shadow-lg shadow-emerald-200">
                  <TrendingUp size={24} />
                </div>
                <div>
                  <p className="text-sm text-slate-400 font-bold uppercase tracking-wider">Estimated Budget</p>
                  <p className="text-2xl font-black text-slate-800">$2,450.00</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 w-3/4 rounded-full"></div>
                </div>
                <div className="flex justify-between text-sm font-bold text-slate-500">
                  <span>Flights: 40%</span>
                  <span>Stay: 35%</span>
                </div>
              </div>
            </div>
            {/* Background blob */}
            <div className="absolute -top-10 -right-10 w-72 h-72 bg-emerald-400/20 rounded-full blur-[80px]"></div>
          </div>
        </div>
      </section>

      {/* 2. Quick Features Section (New) */}
      <section className="container mx-auto px-6 -mt-16 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: <Wallet className="text-emerald-500" />, title: "Budget Tracker", desc: "Never overspend with real-time cost analysis." },
            { icon: <Globe className="text-blue-500" />, title: "Multi-City Support", desc: "Seamlessly link multiple destinations in one plan." },
            { icon: <ShieldCheck className="text-purple-500" />, title: "Smart Checklist", desc: "Automated packing lists based on your destination." }
          ].map((item, i) => (
            <div key={i} data-aos="fade-up" data-aos-delay={i * 200} className="bg-white p-8 rounded-[2rem] shadow-lg border border-slate-50 flex items-start gap-5 hover:scale-105 transition-transform">
              <div className="bg-slate-50 p-4 rounded-2xl">{item.icon}</div>
              <div>
                <h3 className="font-bold text-slate-800 mb-1">{item.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Travel Destinations (Grid) */}
      <section className="container mx-auto px-6 mt-24">
        <div className="flex justify-between items-end mb-12" data-aos="fade-up">
          <div>
            <h2 className="text-4xl font-black text-slate-800">Popular Destinations</h2>
            <p className="text-slate-500 mt-2 font-medium">Top picks from the Traveloop community</p>
          </div>
          <button className="hidden sm:block px-6 py-3 border-2 border-slate-200 rounded-xl font-bold text-slate-600 hover:bg-slate-50 transition-all">
            Explore All
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { city: 'Bali', country: 'Indonesia', img: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4' },
            { city: 'Paris', country: 'France', img: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34' },
            { city: 'Tokyo', country: 'Japan', img: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e' },
            { city: 'Rome', country: 'Italy', img: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5' }
          ].map((dest, i) => (
            <div key={i} data-aos="zoom-in" data-aos-delay={i * 100} className="group relative h-80 rounded-[2.5rem] overflow-hidden cursor-pointer shadow-lg shadow-slate-200">
              <img src={dest.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={dest.city} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
              <div className="absolute bottom-6 left-6 text-white">
                <h4 className="text-xl font-bold">{dest.city}</h4>
                <p className="text-sm opacity-80">{dest.country}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Newsletter / CTA (New) */}
      <section className="container mx-auto px-6 mt-24" data-aos="fade-up">
        <div className="bg-emerald-600 rounded-[3.5rem] p-12 md:p-20 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">Ready for your next journey?</h2>
            <p className="text-emerald-50 text-lg mb-10 opacity-90 font-medium">Join 50,000+ travelers planning their dream trips today.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="px-6 py-4 rounded-2xl bg-white/20 border border-white/30 text-white placeholder:text-emerald-100 focus:outline-none focus:bg-white focus:text-slate-900 transition-all sm:w-80"
              />
              <button className="bg-white text-emerald-600 px-8 py-4 rounded-2xl font-black hover:bg-slate-900 hover:text-white transition-all shadow-xl">
                Get Updates
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;