import React from 'react';

const Navbar = () => {
    return (
       <nav className='bg-[#0f1117] text-white px-8 py-4 flex items-center justify-between border-b border-gray-800 '>
        {/* brand logo */}
        <div className="flex items-center bg-[#181a20] p-1 rounded-full border border-gray-800" >
FITLOG
        </div>
        {/* middle navigation */}
        <div className="flex items-center bg-[#181a20] p-1 rounded-full border border-gray-800">
            <button className="px-5 py-1.5 text-sm font-semibold rounded-full bg-[#a3e635] text-black shadow-md">
                Workouts
            </button>
            <button className="px-5 py-1.5 text-sm font-semibold rounded-full text-gray-400 hover:text-white transition-colors">
                My Plan
            </button >
        </div>
        {/* right counters */}
        <div className="flex items-center gap-4 text-sm font-medium text-gray-300">
            <div className="flex items-center gap-1.5">
                <span>
                    plan
                </span>
                <span className="bg-[#a3e635] text-black text-xs font-bold px-2 py-0.5 rounded-full">
0
                </span>

            </div>
            <div className="flex items-center gap-1.5">
                <span>
Saved
                </span>
                <span className="bg-gray-800 text-white text-xs font-bold px-2 py-0.5 rounded-full border border-gray-700">
0
                </span>
            </div>
        </div>
       </nav>
    );
};

export default Navbar;