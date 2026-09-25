'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

const WorkoutContext = createContext();

export function WorkoutProvider({ children }) {
  // Initialize state directly from localStorage
  const [plan, setPlan] = useState(() => {
    if (typeof window !== 'undefined') {
      const localPlan = localStorage.getItem('fitlog_plan');
      return localPlan ? JSON.parse(localPlan) : [];
    }
    return [];
  });

  const [saved, setSaved] = useState(() => {
    if (typeof window !== 'undefined') {
      const localSaved = localStorage.getItem('fitlog_saved');
      return localSaved ? JSON.parse(localSaved) : [];
    }
    return [];
  });

  const [toastMessage, setToastMessage] = useState(null);

  // Save changes to localStorage
  useEffect(() => {
    localStorage.setItem('fitlog_plan', JSON.stringify(plan));
  }, [plan]);

  useEffect(() => {
    localStorage.setItem('fitlog_saved', JSON.stringify(saved));
  }, [saved]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const addToPlan = (workout) => {
    if (plan.length >= 5) {
      showToast("Maximum 5 workouts allowed in today's plan!");
      return;
    }
    const exists = plan.some((item) => String(item.id) === String(workout.id));
    if (!exists) {
      setPlan((prev) => [...prev, workout]);
      showToast("Added to today's plan");
    } else {
      showToast("Already in today's plan");
    }
  };

  const removeFromPlan = (id) => {
    setPlan((prev) => prev.filter((item) => String(item.id) !== String(id)));
    showToast('Removed from plan');
  };

  const addToSaved = (workout) => {
    const exists = saved.some((item) => String(item.id) === String(workout.id));
    if (!exists) {
      setSaved((prev) => [...prev, workout]);
      showToast('Added to saved workouts');
    } else {
      showToast('Already in saved workouts');
    }
  };

  const removeFromSaved = (id) => {
    setSaved((prev) => prev.filter((item) => String(item.id) !== String(id)));
    showToast('Removed from saved');
  };

  return (
    <WorkoutContext.Provider
      value={{
        plan,
        saved,
        addToPlan,
        removeFromPlan,
        addToSaved,
        removeFromSaved,
      }}
    >
      {children}

      {/* Global Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#a3e635] text-black font-extrabold px-5 py-3 rounded-xl shadow-2xl border border-black/10 text-xs tracking-wider uppercase animate-bounce">
          {toastMessage}
        </div>
      )}
    </WorkoutContext.Provider>
  );
}

export const useWorkout = () => useContext(WorkoutContext);