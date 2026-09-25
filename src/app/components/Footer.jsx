'use client';



export default function Footer() {
  return (
    <footer className="w-full bg-[#090a0f] border-t border-gray-800/80 py-6 px-8 mt-auto">
      <div className="max-w-[1200px] mx-auto flex items-center justify-between">
        {/* Left Side: Logo Image + Text */}
        <div className="flex items-center gap-2">
          {/* Replace src with your exact logo image path (e.g., /logo.png or /dumbbell.png in public folder) */}
          <img
            src='/public/logo.png' 
            alt="FitLog Logo" 
            className="w-5 h-5 object-contain"
          />
          <span className="font-black text-white text-base tracking-wider uppercase">
            FITLOG
          </span>
        </div>

        {/* Right Side: Copyright Text */}
        <p className="text-gray-500 text-xs font-medium tracking-wide">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
}