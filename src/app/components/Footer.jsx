'use client';



export default function Footer() {
  return (
    <footer className="w-full bg-[#090a0f] border-t border-gray-800/80 py-6 px-4 sm:px-8 mt-auto">
      <div className="max-w-[1200px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        {/* Left Side: Logo Image + Text */}
        <div className="flex items-center gap-2">
          <img
            src='/logo.png' 
            alt="FitLog Logo" 
            width={80}
            height={80}
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