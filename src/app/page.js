
import Banner from './components/Banner';
import WorkoutCard from './components/WorkoutCard';

async function getWorkouts() {
  const res = await fetch('https://api.api-store.workers.dev/api/fitlog');
  return res.json();
}

export default async function Home() {
  const workoutsData = await getWorkouts();

  return (
    <main className="min-h-screen bg-[#0b0c10] text-white px-6 md:px-12 lg:px-16 py-6">
      {/* Banner Section */}
      <Banner />

      {/* Library Section Header */}
      <div className="w-full max-w-[1400px] mx-auto mt-12 mb-6">
        <h2 className="text-2xl md:text-3xl font-black tracking-wide text-white uppercase">
          THE LIBRARY
        </h2>
        <p className="text-gray-400 text-sm mt-1">
          Twelve lifts covering every major muscle group.
        </p>
      </div>

      {/* 3x4 Grid Layout */}
      <div className="w-full max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-16">
        {workoutsData.map((workout) => (
          <WorkoutCard key={workout.id} workout={workout} />
        ))}
      </div>
    </main>
  );
}