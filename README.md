## Project Name-

 FitLog — Modern Workout & Fitness Planner
 
 ## Short Description-

 FitLog is a dynamic, fully responsive web application built with Next.js App Router that allows users to explore workout libraries, build custom daily workout plans, and save exercises for future training sessions. Designed with a sleek modern dark theme, it delivers an intuitive user experience across mobile, tablet, and desktop devices.

 ## Techonologies Used-
 
  NextJs, DaisyUI,Tailwind CSS, ReactToastify and React.

 ## 5 Key Features

1. **Interactive Plan & Saved Workouts Management**  
   Seamlessly add or remove exercises to your daily plan or saved list with live badge counters in the navigation header that persist state across sessions using local storage.

2. **Hydration-Safe Live Badge Synchronization**  
   Engineered with client-side mounting guards and state synchronization (`useSyncExternalStore`) to ensure smooth hydration between server-rendered HTML and client storage without UI flickering or console errors.

3. **Dynamic Workout Detail Pages**  
   Features deep-dive exercise views powered by Next.js dynamic routes (`/workout/[id]`), presenting exercise specifications, targeted muscle groups, difficulty tiers, and step-by-step instructions in a clean side-by-side portrait layout.

4. **Resilient Asset & Fallback Image Handling**  
   Includes built-in image error detection (`onError` handlers) that automatically gracefully substitute missing or broken external API image URLs with local fallback assets.

5. **Fully Responsive Adaptive Layout**  
   Crafted with a mobile-first design strategy—featuring adaptive grid layouts, full-width stacking action buttons, and responsive navbar wrapping for an optimal experience across all screen sizes.