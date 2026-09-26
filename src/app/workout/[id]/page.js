'use client';

import React, { use, useEffect, useState } from 'react';
import Link from 'next/link';
import { useWorkout } from '@/app/context/WorkoutContext';

export default function WorkoutDetailPage({ params }) {
  const resolvedParams = use(params);
  const workoutId = resolvedParams.id;

  const { addToPlan, addToSaved } = useWorkout();

  const [workout, setWorkout] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://api.api-store.workers.dev/api/fitlog/${workoutId}`)
      .then((res) => res.json())
      .then((data) => {
        setWorkout(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load workout:", err);
        setLoading(false);
      });
  }, [workoutId]);

  if (loading) {
    return (
      <div className="text-center py-20 text-white font-bold text-sm">
        Loading workout details...
      </div>
    );
  }

  if (!workout) {
    return (
      <div className="text-center py-20 text-white">
        <h2 className="text-xl font-bold">Workout not found</h2>
        <Link href="/" className="text-lime-400 underline mt-4 inline-block">
          Back to workouts
        </Link>
      </div>
    );
  }

  return (
    <main className="w-full max-w-[1100px] mx-auto px-4 sm:px-6 py-4 sm:py-6 text-white">
      <Link href="/" className="text-gray-400 text-xs hover:text-white mb-4 inline-block">
        ← Back to workouts
      </Link>

      {/* Grid: Stacks on mobile/tablet, Side-by-Side on desktop (lg breakpoint) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-start">
        
        {/* Left Side: Dynamic Aspect-Ratio Image */}
        <div className="w-full aspect-[4/3] sm:aspect-[4/5] relative rounded-2xl overflow-hidden bg-[#12131a] border border-gray-800">
          <img
            src={workout.image || '/banner.png'}
            alt={workout.name}
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = '/banner.png';
            }}
            className="w-full h-full object-cover object-top"
          />
        </div>

        {/* Right Side: Details Table & Instructions */}
        <div className="flex flex-col gap-4 sm:gap-5">
          {/* Header & Badges */}
          <div>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-black uppercase tracking-wide text-white mb-2">
              {workout.name}
            </h1>
            <p className="text-gray-400 text-xs leading-relaxed mb-3">
              {workout.description || 'A targeted exercise designed to build strength and stability.'}
            </p>
            
            {/* Category Badges */}
            <div className="flex flex-wrap gap-1.5">
              {Array.isArray(workout.targetMuscles) ? (
                workout.targetMuscles.map((muscle, idx) => (
                  <span key={idx} className="bg-[#a3e635] text-black text-[10px] font-black px-2.5 py-0.5 rounded-md uppercase">
                    {muscle}
                  </span>
                ))
              ) : (
                <span className="bg-[#a3e635] text-black text-[10px] font-black px-2.5 py-0.5 rounded-md uppercase">
                  {workout.category || 'General'}
                </span>
              )}
            </div>
          </div>

          {/* Responsive Specs Table */}
          <div className="bg-[#12131a] rounded-xl border border-gray-800/80 divide-y divide-gray-800/60 text-xs">
            <div className="flex justify-between px-3.5 sm:px-4 py-2.5">
              <span className="text-gray-500 font-bold uppercase tracking-wider">Equipment</span>
              <span className="text-gray-200 font-medium">{workout.equipment || 'None'}</span>
            </div>
            <div className="flex justify-between px-3.5 sm:px-4 py-2.5">
              <span className="text-gray-500 font-bold uppercase tracking-wider">Difficulty</span>
              <span className="text-gray-200 font-medium capitalize">{workout.difficulty || 'Intermediate'}</span>
            </div>
            <div className="flex justify-between px-3.5 sm:px-4 py-2.5">
              <span className="text-gray-500 font-bold uppercase tracking-wider">Sets</span>
              <span className="text-gray-200 font-medium">{workout.sets || '4'}</span>
            </div>
            <div className="flex justify-between px-3.5 sm:px-4 py-2.5">
              <span className="text-gray-500 font-bold uppercase tracking-wider">Reps</span>
              <span className="text-gray-200 font-medium">{workout.reps || '8-12'}</span>
            </div>
            <div className="flex justify-between px-3.5 sm:px-4 py-2.5">
              <span className="text-gray-500 font-bold uppercase tracking-wider">Duration</span>
              <span className="text-gray-200 font-medium">{workout.duration} min</span>
            </div>
            <div className="flex justify-between px-3.5 sm:px-4 py-2.5">
              <span className="text-gray-500 font-bold uppercase tracking-wider">Calories</span>
              <span className="text-gray-200 font-medium">{workout.caloriesBurned} kcal</span>
            </div>
            <div className="flex justify-between px-4 py-2.5">
              <span className="text-gray-500 font-bold uppercase tracking-wider">Rating</span>
              <span className="text-gray-200 font-medium">⭐ {workout.rating}</span>
            </div>
          </div>

          {/* Instructions List */}
          <div>
            <h3 className="text-xs font-black uppercase tracking-wider text-gray-300 mb-2">Instructions</h3>
            <ol className="list-decimal list-inside text-xs text-gray-400 space-y-1.5 leading-relaxed">
              {Array.isArray(workout.instructions) ? (
                workout.instructions.map((step, idx) => <li key={idx}>{step}</li>)
              ) : (
                <>
                  <li>Position yourself securely with proper posture before starting.</li>
                  <li>Engage your core and maintain controlled movement throughout.</li>
                  <li>Exhale on exertion and return slowly to the starting position.</li>
                </>
              )}
            </ol>
          </div>

          {/* Action Buttons: Stacks full-width on mobile (flex-col), side-by-side on sm+ screens */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
            <button
              onClick={() => addToPlan(workout)}
              className="w-full sm:flex-1 bg-[#a3e635] hover:bg-[#8fd622] text-black font-extrabold py-3 px-4 rounded-xl text-xs tracking-wider uppercase cursor-pointer transition-colors text-center"
            >
              + Add to todays plan
            </button>

            <button
              onClick={() => addToSaved(workout)}
              className="w-full sm:w-auto bg-[#12131a] hover:bg-gray-800 border border-gray-700 text-white font-extrabold py-3 px-4 rounded-xl text-xs tracking-wider uppercase cursor-pointer transition-colors text-center"
            >
              🔖 Save for later
            </button>
          </div>

        </div>

      </div>
    </main>
  );
}