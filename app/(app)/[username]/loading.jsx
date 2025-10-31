export default function Loading() {
   return (
      <>
         <section className="flex-1">
            <header className="flex flex-col gap-4">
               {/* Cover Image Skeleton */}
               <div className="w-full h-48 bg-gray-300 dark:bg-gray-700 animate-pulse rounded-md"></div>

               <section className="main py-0 flex flex-col sm:flex-row items-center gap-2 overflow-hidden">
                  {/* Avatar Skeleton */}
                  <div className="w-32 h-32 sm:w-40 sm:h-40 bg-gray-300 dark:bg-gray-700 animate-pulse rounded-full p-1 flex-shrink-0"></div>

                  <div className="w-full flex flex-col gap-2 animate-pulse">
                     <div className="flex flex-col items-center sm:items-start gap-2">
                        {/* Name Skeleton */}
                        <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-48"></div>
                        {/* Bio Skeleton */}
                        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full max-w-md"></div>
                        {/* Stats Skeleton */}
                        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-64"></div>
                        {/* Tags Skeleton */}
                        <div className="flex items-center gap-4 mt-2">
                           <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-20"></div>
                           <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-20"></div>
                        </div>
                        {/* Location Skeleton */}
                        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-40 mt-2"></div>
                     </div>
                     <div className="w-full flex flex-col sm:flex-row justify-end items-center gap-4 mt-2">
                        {/* Buttons Skeleton */}
                        <div className="h-10 bg-gray-300 dark:bg-gray-700 rounded w-full sm:w-32"></div>
                        <div className="h-10 bg-gray-300 dark:bg-gray-700 rounded w-full sm:w-32"></div>
                     </div>
                  </div>
               </section>
            </header>

            {/* Nav Skeleton */}
            <nav className="main my-4 flex gap-4 border-b border-secondary animate-pulse">
               <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-20"></div>
               <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-20"></div>
               <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-20"></div>
               <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-20"></div>
            </nav>

            {/* Children Skeleton */}
            <main className="w-full animate-pulse">
               <div className="h-40 bg-gray-300 dark:bg-gray-700 rounded"></div>
            </main>
         </section>

         {/* Aside Skeleton */}
         <aside className="min-w-96 w-full lg:w-1/3 hidden lg:flex flex-col gap-4 animate-pulse">
            <div className="h-64 bg-gray-300 dark:bg-gray-700 rounded"></div>
            <div className="h-96 bg-gray-300 dark:bg-gray-700 rounded"></div>
         </aside>
      </>
   );
}
