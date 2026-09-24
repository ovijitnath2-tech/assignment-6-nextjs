import Link from "next/link";
const WorkoutCard = ({ workout = {} }) => {
  
  const {
    id,
    name = '',
    image = '',
    muscleGroups = [],
    equipment = '',
    duration = 0,
    caloriesBurned = 0,
    rating = 0,
  } = workout;


  return (
    <Link href={`/workout/${id}`} className="block group">
      <div className="bg-[#12131a] rounded-2xl overflow-hidden border border-gray-800/60 flex flex-col justify-between group-hover:border-gray-700 transition-all shadow-lg">
        <div>
          {/* Card Image */}
          <div className="w-full h-48 overflow-hidden bg-gray-900">
            <img
              src={image || 'https://via.placeholder.com/400x300?text=No+Image'}
              alt={name || 'Workout Image'}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Card Body */}
          <div className="p-5">
            {/* Muscle Groups */}
            <div className="flex flex-wrap items-center gap-2 mb-3">
              {muscleGroups.map((group, idx) => (
                <span
                  key={idx}
                  className="bg-[#a3e635] text-black font-extrabold text-[10px] tracking-wider uppercase px-2 py-0.5 rounded-md"
                >
                  {group}
                </span>
              ))}
            </div>

            {/* Name & Equipment */}
            <h3 className="text-white font-black text-lg tracking-wide uppercase mb-1">
              {name}
            </h3>
            <p className="text-gray-400 text-xs mb-4">{equipment}</p>
          </div>
        </div>

        {/* Footer Specs */}
        <div className="px-5 pb-5 pt-2 flex items-center justify-between text-gray-400 text-xs border-t border-gray-800/40">
          <div className="flex items-center gap-1">
            <span>⏱</span>
            <span>{duration} min</span>
          </div>
          <div className="flex items-center gap-1">
            <span>🔥</span>
            <span>{caloriesBurned} kcal</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-yellow-400">⭐</span>
            <span>{rating}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default WorkoutCard;