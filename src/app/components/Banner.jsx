import Image from 'next/image';


const Banner = () => {
    return (
        <div className="bg-[#12131a] rounded-2xl p-8 lg:p-12 my-6 flex flex-col md:flex-row items-center justify-between border border-gray-800/60 relative overflow-hidden">
      {/* Left Content Area */}
      <div className="max-w-xl z-10">
        <span className="text-[#a3e635] font-extrabold text-xs tracking-widest uppercase mb-3 block">
          WORKOUT LIBRARY
        </span>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-none tracking-tight mb-4">
          TRAIN WITH INTENT. LOG EVERY SET.
        </h1>
        <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-6 max-w-lg">
          FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
          into todays plan, and watch the weeks work add up.
        </p>
        <button className="bg-[#a3e635] hover:bg-[#8fd622] text-black font-extrabold px-6 py-3 rounded-lg text-xs tracking-wider uppercase transition-colors">
          BROWSE WORKOUTS
        </button>
      </div>

      {/* Right Graphic Illustration */}
      <div className="mt-8 md:mt-0 z-10 flex justify-center items-center">
        <Image src='/banner.png'
          alt='banner Illustration'
          width={400}
          height={400}
          className='w-64 md:w-80 lg:w-96 object-contain'
        />
      </div>
    </div>
    );
};

export default Banner;