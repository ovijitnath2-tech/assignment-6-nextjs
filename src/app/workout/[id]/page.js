import Link from 'next/link';

async function getWorkoutDetails(id) {
  try {
    const res = await fetch(
      'https://api.abcz.workers.dev/api/fitlog',
      { cache: 'no-store' }
    );

    if (!res.ok) return null;

    const rawData = await res.json();

    // 1. Handle array nested inside response object or direct array
    let list = [];
    if (Array.isArray(rawData)) {
      list = rawData;
    } else if (rawData && typeof rawData === 'object') {
      list = rawData.workouts || rawData.data || rawData.items || Object.values(rawData);
    }

    if (!Array.isArray(list)) return null;

    // 2. Flexible matching (handles number vs string, _id vs id, and string prefixes)
    const match = list.find((item) => {
      if (!item) return false;
      const itemId = String(item.id ?? item._id ?? item.workout_id ?? '');
      const searchId = String(id ?? '');
      
      return (
        itemId === searchId ||
        Number(itemId) === Number(searchId) ||
        itemId.endsWith(searchId)
      );
    });

    return match || null;
  } catch (error) {
    console.error('Error fetching workout:', error);
    return null;
  }
}

export default async function WorkoutDetailPage({ params }) {
  // Await params for Next.js 15+
  const resolvedParams = await params;
  const id = resolvedParams?.id;

  const workout = await getWorkoutDetails(id);

  if (!workout) {
    return (
      <div className="max-w-[1400px] mx-auto px-6 py-20 text-center text-white">
        <h2 className="text-2xl font-bold mb-2">Workout Not Found</h2>
        <p className="text-gray-400 text-sm mb-6">Requested ID: <span className="text-[#a3e635] font-mono">{id}</span></p>
        <Link
          href="/"
          className="bg-[#a3e635] text-black font-extrabold px-6 py-3 rounded-xl text-xs uppercase tracking-wider inline-block"
        >
          ← Back to Library
        </Link>
      </div>
    );
  }

  const {
    name = '',
    image = '',
    description = '',
    muscleGroups = [],
    equipment = '',
    difficulty = '',
    sets = 0,
    reps = '',
    duration = 0,
    caloriesBurned = 0,
    rating = 0,
    instructions = [],
  } = workout;

  return (
    <main className="w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 py-8 text-white">
      <div className="bg-[#12131a] rounded-3xl p-6 md:p-10 border border-gray-800/80 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Image */}
        <div className="lg:col-span-6 rounded-2xl overflow-hidden border border-gray-800/60 bg-gray-900 aspect-square relative">
          <img
            src={image || 'https://via.placeholder.com/600x600?text=No+Image'}
            alt={name || 'Workout'}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Column: Specs */}
        <div className="lg:col-span-6 flex flex-col justify-between h-full">
          <div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-black uppercase tracking-tight mb-3">
              {name}
            </h1>
            <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-6">
              {description}
            </p>

            {/* Muscle Groups */}
            <div className="flex flex-wrap gap-2 mb-8">
              {muscleGroups.map((group, idx) => (
                <span
                  key={idx}
                  className="bg-[#a3e635] text-black font-extrabold text-xs px-3 py-1 rounded-md uppercase tracking-wider"
                >
                  {group}
                </span>
              ))}
            </div>

            {/* Table */}
            <div className="space-y-3 border-t border-b border-gray-800/80 py-4 text-xs md:text-sm font-semibold uppercase">
              <div className="flex justify-between items-center">
                <span className="text-gray-500">EQUIPMENT</span>
                <span className="text-white">{equipment}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500">DIFFICULTY</span>
                <span className="text-white">{difficulty}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500">SETS</span>
                <span className="text-white">{sets}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500">REPS</span>
                <span className="text-white">{reps}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500">DURATION</span>
                <span className="text-white">{duration} min</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500">CALORIES</span>
                <span className="text-white">{caloriesBurned} kcal</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500">RATING</span>
                <span className="text-white">{rating}</span>
              </div>
            </div>

            {/* Instructions */}
            {instructions.length > 0 && (
              <div className="mt-6">
                <h3 className="text-xs font-black uppercase text-gray-400 tracking-wider mb-3">
                  INSTRUCTIONS
                </h3>
                <ol className="list-decimal list-inside space-y-2 text-gray-300 text-xs md:text-sm leading-relaxed">
                  {instructions.map((step, idx) => (
                    <li key={idx} className="pl-1">
                      {step}
                    </li>
                  ))}
                </ol>
              </div>
            )}
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap items-center gap-4 mt-8 pt-4">
            <button className="flex-1 min-w-[200px] bg-[#a3e635] hover:bg-[#8fd622] text-black font-extrabold py-3.5 px-6 rounded-xl text-xs tracking-wider uppercase transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-[#a3e635]/10">
              <span>+</span> Add to todays plan
            </button>
            <button className="flex-1 min-w-[160px] bg-[#12131a] hover:bg-gray-800 border border-gray-700 text-white font-extrabold py-3.5 px-6 rounded-xl text-xs tracking-wider uppercase transition-all flex items-center justify-center gap-2 cursor-pointer">
              <span>🔖</span> Save for later
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}