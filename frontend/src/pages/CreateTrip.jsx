import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../config/API";
import toast from "react-hot-toast";
import {
  Plane,
  Calendar,
  FileText,
  Camera,
  ArrowRight,
  X,
  Wallet,
  TrendingUp,
  MapPin,
  Package,
  Activity,
  CheckCircle,
} from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";

const CreateTrip = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    title: "",
    start_date: "",
    end_date: "",
    budget: "",
    description: "",
    coverPhoto: null,
  });

  const [loading, setLoading] = useState(false);
  const [isSaved, setIsSaved] = useState(false); // Success state handle karne ke liye
  const [preview, setPreview] = useState(null);
  const [createdTripId, setCreatedTripId] = useState(null);

  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, coverPhoto: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = new FormData();
      data.append("title", formData.title);
      data.append("start_date", formData.start_date);
      data.append("end_date", formData.end_date);
      data.append("budget", formData.budget);
      data.append("description", formData.description);
      if (formData.coverPhoto) data.append("coverPhoto", formData.coverPhoto);

      const res = await api.post("/api/trips/create", data);

      setCreatedTripId(res.data.tripId);
      toast.success("Trip details saved successfully!");
      setIsSaved(true); // Form hide karke summary dikhayenge
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to create trip");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {!isSaved ? (
          /* --- STAGE 1: CREATE TRIP FORM --- */
          <div data-aos="fade-up">
            <div className="mb-10 text-center">
              <h1 className="text-4xl font-black text-slate-800">
                Start a New <span className="text-emerald-600">Adventure</span>
              </h1>
              <p className="text-slate-500 mt-2 font-medium">
                Fill in the details to begin your journey.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-white space-y-6">
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-bold text-slate-700 ml-1">
                    <Plane size={16} className="text-emerald-600" /> Trip Name
                  </label>
                  <input
                    type="text"
                    name="title"
                    placeholder="Summer Vacation"
                    className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all"
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-bold text-slate-700 ml-1">
                      <Calendar size={16} className="text-emerald-600" /> Start
                      Date
                    </label>
                    <input
                      type="date"
                      name="start_date"
                      className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none"
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-bold text-slate-700 ml-1">
                      <Calendar size={16} className="text-emerald-600" /> End
                      Date
                    </label>
                    <input
                      type="date"
                      name="end_date"
                      className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none"
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-bold text-slate-700 ml-1">
                    <FileText size={16} className="text-emerald-600" />{" "}
                    Description
                  </label>
                  <textarea
                    name="description"
                    rows="4"
                    placeholder="What's the vibe of this trip?"
                    className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all font-medium resize-none"
                    onChange={handleChange}
                  ></textarea>
                </div>

                {/* Card 2: Photo Upload */}
                <div className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-white">
                  <label className="flex items-center gap-2 text-sm font-bold text-slate-700 ml-1 mb-4">
                    <Camera size={16} className="text-emerald-600" /> Cover
                    Photo (Optional)
                  </label>

                  {!preview ? (
                    <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-slate-200 rounded-[2rem] cursor-pointer hover:bg-slate-50 transition-colors">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Camera className="w-10 h-10 text-slate-300 mb-3" />
                        <p className="text-sm text-slate-500 font-medium">
                          Click to upload a cover photo
                        </p>
                      </div>
                      <input
                        type="file"
                        className="hidden"
                        onChange={handleFileChange}
                        accept="image/*"
                      />
                    </label>
                  ) : (
                    <div className="relative h-64 rounded-[2rem] overflow-hidden group">
                      <img
                        src={preview}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setPreview(null);
                          setFormData({ ...formData, coverPhoto: null });
                        }}
                        className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-md rounded-full text-red-500 shadow-lg"
                      >
                        <X size={20} />
                      </button>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-bold text-slate-700 ml-1">
                      <Wallet size={16} className="text-emerald-600" /> Budget
                      ($)
                    </label>
                    <input
                      type="number"
                      name="budget"
                      placeholder="0.00"
                      className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none"
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-bold text-slate-700 ml-1">
                      <TrendingUp size={16} className="text-emerald-600" />{" "}
                      Category
                    </label>
                    <select
                      name="category"
                      className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none appearance-none"
                      onChange={handleChange}
                    >
                      <option value="budget">Economy</option>
                      <option value="standard">Standard</option>
                      <option value="luxury">Luxury</option>
                    </select>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-slate-900 hover:bg-emerald-600 text-white py-5 rounded-2xl font-bold shadow-xl transition-all transform active:scale-95"
              >
                {loading ? "Saving..." : "Create Trip & Continue"}
              </button>
            </form>
          </div>
        ) : (
          /* --- STAGE 2: TRIP DASHBOARD (AFTER SAVE) --- */
          <div className="space-y-8" data-aos="zoom-in">
            {/* Summary Block */}
            <div className="bg-emerald-600 p-10 rounded-[3rem] text-white shadow-2xl relative overflow-hidden">
              <div className="relative z-10">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-4xl font-black">{formData.title}</h2>
                  <CheckCircle size={32} className="text-emerald-200" />
                </div>
                <div className="flex flex-wrap gap-8">
                  <div className="flex items-center gap-3">
                    <Calendar className="opacity-70" />
                    <p className="font-bold">
                      {formData.start_date} to {formData.end_date}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Wallet className="opacity-70" />
                    <p className="font-bold">${formData.budget}</p>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
            </div>

            {/* Next Step Options */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Add Stops */}
              <div
                onClick={() => navigate(`/itinerary/${createdTripId}`)}
                className="group bg-white p-8 rounded-[2.5rem] shadow-lg border border-transparent hover:border-emerald-500 transition-all cursor-pointer"
              >
                <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-emerald-600 group-hover:text-white transition-all">
                  <MapPin size={28} />
                </div>
                <h3 className="text-xl font-bold text-slate-800">Add Stops</h3>
                <p className="text-sm text-slate-500 mt-2">
                  Plan your route and add destinations.
                </p>
              </div>

              {/* Packaging List */}
              <div className="group bg-white p-8 rounded-[2.5rem] shadow-lg border border-transparent hover:border-blue-500 transition-all cursor-pointer">
                <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-all">
                  <Package size={28} />
                </div>
                <h3 className="text-xl font-bold text-slate-800">
                  Packing List
                </h3>
                <p className="text-sm text-slate-500 mt-2">
                  Manage your essentials for the trip.
                </p>
              </div>

              {/* Activities */}
              <div className="group bg-white p-8 rounded-[2.5rem] shadow-lg border border-transparent hover:border-purple-500 transition-all cursor-pointer">
                <div className="w-14 h-14 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-purple-600 group-hover:text-white transition-all">
                  <Activity size={28} />
                </div>
                <h3 className="text-xl font-bold text-slate-800">Activities</h3>
                <p className="text-sm text-slate-500 mt-2">
                  Book and plan fun things to do.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateTrip;
