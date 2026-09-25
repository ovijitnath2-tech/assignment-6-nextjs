'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useWorkout } from '../context/WorkoutContext';

export default function Navbar() {
  const pathname = usePathname();
  const { plan, saved } = useWorkout();

  return (
    <nav className="w-full bg-[#0b0c10] border-b border-gray-800 px-6 py-4 flex items-center justify-between fixed top-0 left-0 right-0 z-40">
      {/* Brand Logo */}
      <Link href="/" className="font-black text-lg tracking-wider text-white">
        FITLOG
      </Link>

      {/* Center Navigation Links */}
      <div className="flex items-center bg-[#12131a] p-1 rounded-full border border-gray-800">
        <Link
          href="/"
          className={`px-5 py-1.5 rounded-full text-xs font-bold transition-colors ${
            pathname === '/'
              ? 'bg-[#a3e635] text-black'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          Workouts
        </Link>
        <Link
          href="/my-plan"
          className={`px-5 py-1.5 rounded-full text-xs font-bold transition-colors ${
            pathname === '/my-plan'
              ? 'bg-[#a3e635] text-black'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          My Plan
        </Link>
      </div>

      {/* Right Stats Badges */}
      <div className="flex items-center gap-4 text-xs font-semibold uppercase tracking-wider text-gray-300">
        <Link href="/my-plan" className="flex items-center hover:opacity-80 transition-opacity">
          plan{' '}
          <span className="bg-[#a3e635] text-black px-2 py-0.5 rounded-full font-bold ml-1.5">
            {plan?.length || 0}
          </span>
        </Link>
        <div className="flex items-center">
          Saved{' '}
          <span className="bg-gray-800 text-white px-2 py-0.5 rounded-full font-bold ml-1.5">
            {saved?.length || 0}
          </span>
        </div>
      </div>
    </nav>
  );
}