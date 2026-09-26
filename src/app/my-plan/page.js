'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useWorkout } from '../context/WorkoutContext';

export default function MyPlanPage() {
  const { plan, saved, removeFromPlan, removeFromSaved } = useWorkout();
  
  const [activeTab, setActiveTab] = useState('plan'); 
  const [isLoading, setIsLoading] = useState(true);
  const [sortBy, setSortBy] = useState('duration');


  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  const currentList = activeTab === 'plan' ? plan : saved;

  
  const totalExercises = plan.length;
  const totalMinutes = plan.reduce((sum, item) => sum + (Number(item.duration) || 0), 0);
  const totalCalories = plan.reduce((sum, item) => sum + (Number(item.caloriesBurned) || 0), 0);


  const sortedList = [...currentList].sort((a, b) => {
    if (sortBy === 'duration') return (b.duration || 0) - (a.duration || 0);
    if (sortBy === 'calories') return (b.caloriesBurned || 0) - (a.caloriesBurned || 0);
    if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
    return 0;
  });

  return (
    <main className="w-full max-w-[1200px] mx-auto px-6 md:px-12 py-8 text-white">
      {/* Title & Subtitle */}
      <h1 className="text-3xl font-black uppercase tracking-tight mb-1">MY PLAN</h1>
      <p className="text-gray-400 text-xs mb-8">
        Cap of five lifts for today. Finish them, then load more.
      </p>

      {/* Metrics Summary Row */}
      <div className="bg-[#12131a] rounded-2xl p-6 border border-gray-800/80 mb-8 grid grid-cols-3 gap-4 text-center md:text-left">
        <div>
          <span className="text-gray-400 text-xs font-semibold block mb-1">Exercises</span>
          <span className="text-[#a3e635] text-3xl md:text-4xl font-black">{totalExercises}</span>
        </div>
        <div className="border-l border-gray-800/80 pl-6">
          <span className="text-gray-400 text-xs font-semibold block mb-1">Minutes</span>
          <span className="text-white text-3xl md:text-4xl font-black">{totalMinutes}</span>
        </div>
        <div className="border-l border-gray-800/80 pl-6">
          <span className="text-gray-400 text-xs font-semibold block mb-1">Calories</span>
          <span className="text-white text-3xl md:text-4xl font-black">{totalCalories}</span>
        </div>
      </div>

      {/* Navigation Tabs & Sort */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="bg-[#12131a] p-1 rounded-xl border border-gray-800 flex items-center gap-1">
          <button
            onClick={() => setActiveTab('plan')}
            className={`px-5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'plan'
                ? 'bg-gray-800 text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Todays Plan
          </button>
          <button
            onClick={() => setActiveTab('saved')}
            className={`px-5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'saved'
                ? 'bg-gray-800 text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Saved
          </button>
        </div>

        <div className="flex items-center gap-2 text-xs text-gray-400">
          <span>Sort By</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-[#12131a] border border-gray-800 text-white font-bold rounded-xl px-3 py-2 outline-none cursor-pointer"
          >
            <option value="duration">Duration</option>
            <option value="calories">Calories</option>
            <option value="rating">Rating</option>
          </select>
        </div>
      </div>

      {/* Content Rendering: Loading / Empty / Cards List */}
      {isLoading ? (
        <div className="py-20 text-center text-gray-400 font-bold text-sm animate-pulse">
          Loading workouts…
        </div>
      ) : sortedList.length === 0 ? (
        <div className="border border-dashed border-gray-800/80 rounded-3xl p-16 text-center bg-[#12131a]/40">
          <h3 className="text-xl font-black uppercase mb-2">NOTHING HERE YET</h3>
          <p className="text-gray-400 text-xs mb-6">
            Browse the library and add a lift to get today moving.
          </p>
          <Link
            href="/"
            className="bg-[#a3e635] hover:bg-[#8fd622] text-black font-extrabold px-6 py-3 rounded-xl text-xs uppercase tracking-wider inline-block transition-all shadow-lg shadow-[#a3e635]/10"
          >
            Go to workouts
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {sortedList.map((item) => (
            <div
              key={item.id}
              className="bg-[#12131a] border border-gray-800/80 rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-4 transition-all hover:border-gray-700"
            >
              <div className="flex items-center gap-4 w-full md:w-auto">
                <img
                  src={item.image || 'https://via.placeholder.com/150'}
                  alt={item.name}
                  className="w-20 h-20 rounded-xl object-cover bg-gray-900 border border-gray-800"
                />
                <div>
                  <h4 className="text-white font-black text-base uppercase tracking-wide mb-1">
                    {item.name}
                  </h4>
                  <p className="text-gray-400 text-xs mb-2">{item.equipment}</p>
                  <div className="flex items-center gap-3 text-xs text-gray-400">
                    <span>⏱ {item.duration} min</span>
                    <span>🔥 {item.caloriesBurned} kcal</span>
                    <span className="text-yellow-400">⭐ {item.rating}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 w-full md:w-auto justify-end">
                <Link
                  href={`/workout/${item.id}`}
                  className="bg-gray-800/80 hover:bg-gray-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl uppercase tracking-wider transition-all"
                >
                  View Details
                </Link>

                {activeTab === 'plan' ? (
                  <button
                    onClick={() => removeFromPlan(item.id)}
                    className="bg-[#a3e635] hover:bg-[#8fd622] text-black font-extrabold text-xs px-5 py-2.5 rounded-xl uppercase tracking-wider cursor-pointer transition-all"
                  >
                    Mark as Done
                  </button>
                ) : (
                  <button
                    onClick={() => removeFromSaved(item.id)}
                    className="bg-red-500/10 hover:bg-red-500/20 text-red-400 font-extrabold text-xs px-4 py-2.5 rounded-xl uppercase tracking-wider cursor-pointer transition-all"
                  >
                    ✕ Remove
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}