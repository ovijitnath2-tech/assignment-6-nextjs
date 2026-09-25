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
    fetch(`https://api.abcz.workers.dev/api/fitlog/${workoutId}`)
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
    <main className="w-full max-w-[1200px] mx-auto px-6 py-8 text-white">
      <Link href="/" className="text-gray-400 text-xs hover:text-white mb-6 inline-block">
        ← Back to workouts
      </Link>

      <div className="bg-[#12131a] rounded-2xl p-6 border border-gray-800">
        {workout.image && (
          <div className="w-full h-64 relative mb-6 rounded-xl overflow-hidden">
            <img
              src={workout.image}
              alt={workout.name}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <h1 className="text-3xl font-black uppercase mb-2">{workout.name}</h1>
        <p className="text-gray-400 text-sm mb-4">{workout.equipment}</p>

        <div className="flex items-center gap-4 text-sm text-gray-300 mb-6">
          <span>⏱ {workout.duration} mins</span>
          <span>🔥 {workout.caloriesBurned} kcal</span>
          <span className="text-yellow-400">⭐ {workout.rating}</span>
        </div>

        <div className="flex flex-wrap items-center gap-4 mt-8 pt-4 border-t border-gray-800">
          <button
            onClick={() => addToPlan(workout)}
            className="flex-1 min-w-[200px] bg-[#a3e635] hover:bg-[#8fd622] text-black font-extrabold py-3.5 px-6 rounded-xl text-xs tracking-wider uppercase cursor-pointer"
          >
            + Add to todays plan
          </button>

          <button
            onClick={() => addToSaved(workout)}
            className="flex-1 min-w-[160px] bg-[#12131a] hover:bg-gray-800 border border-gray-700 text-white font-extrabold py-3.5 px-6 rounded-xl text-xs tracking-wider uppercase cursor-pointer"
          >
            🔖 Save for later
          </button>
        </div>
      </div>
    </main>
  );
}