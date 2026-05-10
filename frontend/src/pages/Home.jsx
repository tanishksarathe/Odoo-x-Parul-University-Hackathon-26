import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Calendar, ArrowRight, MapPin } from 'lucide-react';
// AOS Import
import AOS from 'aos';
import 'aos/dist/aos.css';

const Home = () => {
  const navigate = useNavigate();

  // AOS Initialize karna
  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation ki speed (1 second)
      once: true,     // Kya animation sirf ek baar hona chahiye
      easing: 'ease-in-out',
    });
  }, []);

  const recentTrips = [
    { id: 1, name: "Goa Weekend", date: "12-15 June", stops: 2, image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=400" },
    { id: 2, name: "Manali Adventure", date: "20-25 July", stops: 4, image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=400" },
    { id: 3, name: "Leh Ladakh", date: "05-15 Aug", stops: 5, image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2d/51/22/a3/caption.jpg?w=600&h=400&s=1" }
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] pb-12 overflow-x-hidden">
      
      {/* 1. Hero Section - Fade Down Animation */}
      <section 
        className="bg-white border-b border-slate-100 py-16 mb-8"
        data-aos="fade-down"
      >
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div data-aos="fade-right" data-aos-delay="200">
              <h1 className="text-5xl font-black text-slate-800 leading-tight">
                Explore the World <br />
                With <span className="text-emerald-600">Traveloop</span>
              </h1>
              <p className="text-slate-500 mt-4 text-lg font-medium max-w-md">
                Plan, manage, and share your multi-city itineraries with ease.
              </p>
            </div>
            
            <div data-aos="zoom-in" data-aos-delay="400">
              <button 
                onClick={() => navigate('/create-trip')}
                className="group flex items-center gap-3 bg-emerald-600 hover:bg-emerald-700 text-white px-10 py-5 rounded-2xl font-bold shadow-2xl shadow-emerald-200 transition-all transform hover:-translate-y-1 active:scale-95"
              >
                <Plus size={24} />
                Start Planning
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-6">
        
        {/* 2. Recent Trips - Slide Up Animation */}
        <div className="mb-16">
          <div className="flex justify-between items-center mb-8" data-aos="fade-up">
            <h2 className="text-3xl font-bold text-slate-800">Your Recent Trips</h2>
            <button className="text-emerald-600 font-bold hover:underline">View All</button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentTrips.map((trip, index) => (
              <div 
                key={trip.id} 
                className="group bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500"
                data-aos="fade-up" 
                data-aos-delay={index * 150} // Har card thoda late aayega (Staggered effect)
              >
                <div className="relative h-56 overflow-hidden">
                  <img 
                    src={trip.image} 
                    alt={trip.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                  />
                  <div className="absolute top-5 left-5 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-black text-slate-800 shadow-sm">
                    {trip.stops} STOPS
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-slate-800 mb-3">{trip.name}</h3>
                  <div className="flex items-center gap-2 text-slate-500 font-semibold mb-6">
                    <Calendar size={16} className="text-emerald-500" />
                    {trip.date}
                  </div>
                  <button className="w-full flex items-center justify-center gap-2 py-4 bg-slate-900 text-white group-hover:bg-emerald-600 rounded-2xl font-bold transition-all transform active:scale-95">
                    Explore Details <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3. Budget Insight Feature - Flip Animation */}
        <div 
          className="bg-slate-900 rounded-[3rem] p-10 md:p-16 text-white relative overflow-hidden shadow-2xl"
          data-aos="flip-up"
        >
          <div className="absolute -top-10 -right-10 w-64 h-64 bg-emerald-500/20 rounded-full blur-[100px]"></div>
          <div className="relative z-10 grid md:grid-cols-2 items-center gap-10">
            <div>
              <h2 className="text-4xl font-black mb-6">Track Your Budget</h2>
              <p className="text-slate-400 mb-8 text-lg leading-relaxed">
                Stay within your limits with our automatic cost breakdowns for transport, stays, and activities.
              </p>
              <div className="flex gap-4">
                <div className="bg-white/10 p-4 rounded-2xl border border-white/5" data-aos="zoom-in" data-aos-delay="600">
                  <p className="text-emerald-400 font-bold text-2xl">Visual</p>
                  <p className="text-sm text-slate-300">Charts</p>
                </div>
                <div className="bg-white/10 p-4 rounded-2xl border border-white/5" data-aos="zoom-in" data-aos-delay="800">
                  <p className="text-emerald-400 font-bold text-2xl">Daily</p>
                  <p className="text-sm text-slate-300">Estimates</p>
                </div>
              </div>
            </div>
            <div className="hidden md:flex justify-center" data-aos="fade-left" data-aos-delay="500">
               {/* Decorative Abstract Shape */}
               <div className="w-64 h-64 border-8 border-emerald-500/30 rounded-full flex items-center justify-center animate-pulse">
                  <div className="w-40 h-40 bg-emerald-600 rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(16,185,129,0.4)]">
                    <MapPin size={60} />
                  </div>
               </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Home;