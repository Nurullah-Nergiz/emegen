export default function Loading() {
   return (
      <main className="flex-1 flex flex-col gap-8 p-2 animate-pulse">
         {/* Header Skeleton */}
         <section className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
               <div className="h-8 w-32 bg-gray-200 rounded-lg"></div>
               <div className="flex gap-3">
                  <div className="h-10 w-28 bg-gray-200 rounded-lg"></div>
                  <div className="h-10 w-32 bg-gray-200 rounded-lg"></div>
               </div>
            </div>
         </section>

         {/* Stats Cards Skeleton */}
         <ul className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
               <li
                  key={i}
                  className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col gap-4">
                  <div className="flex justify-between items-start">
                     <div className="w-10 h-10 rounded-full bg-gray-200"></div>
                     <div className="w-16 h-6 bg-gray-200 rounded"></div>
                  </div>
                  <div>
                     <div className="h-4 w-24 bg-gray-200 rounded mb-2"></div>
                     <div className="h-8 w-20 bg-gray-200 rounded"></div>
                  </div>
               </li>
            ))}
         </ul>

         {/* Chart Section Skeleton */}
         <section className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <div className="flex justify-between items-center mb-6">
               <div className="h-6 w-32 bg-gray-200 rounded"></div>
               <div className="h-4 w-20 bg-gray-200 rounded"></div>
            </div>
            <div className="h-64 w-full bg-gray-100 rounded-lg"></div>
         </section>
      </main>
   );
}
