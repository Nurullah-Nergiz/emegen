export default function Loading() {
   return (
      <div className="flex flex-col gap-4 w-full animate-pulse">
         <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700">
            <div className="h-8 w-32 bg-gray-200 dark:bg-gray-800 rounded mb-4"></div>
            <div className="h-6 w-24 bg-gray-200 dark:bg-gray-800 rounded mb-4"></div>
         </div>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((i) => (
               <div
                  key={i}
                  className="h-40 bg-gray-200 dark:bg-gray-800 rounded-xl"
               ></div>
            ))}
         </div>
      </div>
   );
}
