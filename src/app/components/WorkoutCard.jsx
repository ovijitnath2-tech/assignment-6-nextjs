

const WorkoutCard = ({ workout }) => {
  const { name, image, muscleGroups, equipment, duration, caloriesBurned, rating } = workout;

  return (
    <div className="bg-[#12131a] rounded-2xl overflow-hidden border border-gray-800/60 flex flex-col justify-between hover:border-gray-700 transition-all shadow-lg">
      <div>
        {/* Card Image */}
        <div className="w-full h-48 overflow-hidden bg-gray-900">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Card Body */}
        <div className="p-5">
          {/* Muscle Groups / Tags */}
          <div className="flex flex-wrap items-center gap-2 mb-3">
            {muscleGroups?.map((group, idx) => (
              <span
                key={idx}
                className="bg-[#a3e635] text-black font-extrabold text-[10px] tracking-wider uppercase px-2 py-0.5 rounded-md"
              >
                {group}
              </span>
            ))}
          </div>

          {/* Title & Equipment */}
          <h3 className="text-white font-black text-lg tracking-wide uppercase mb-1">
            {name}
          </h3>
          <p className="text-gray-400 text-xs mb-4">{equipment}</p>
        </div>
      </div>

      {/* Card Footer Details */}
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
  );
};

export default WorkoutCard;