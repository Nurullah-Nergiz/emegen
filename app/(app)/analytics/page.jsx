"use server";
import Loading from "./loading";

export default async function AnalyticsPage({}) {
   // await new Promise((resolve) => setTimeout(resolve, 10000));

   return <Loading />;

   return (
      <>
         <main className="flex-1 flex flex-col gap-8 p-2">
            {/* Header */}
            <section className="flex flex-col gap-4">
               <div className="flex justify-between items-center">
                  <h1 className="text-3xl font-bold text-gray-900">Analitik</h1>
                  <div className="flex gap-3">
                     <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors">
                        <i className="bx bx-download text-lg"></i> Dışa Aktar
                     </button>
                     <select className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-600 outline-none cursor-pointer">
                        <option>Son 7 Gün</option>
                        <option>Son 30 Gün</option>
                        <option>Son 90 Gün</option>
                     </select>
                  </div>
               </div>
            </section>

            {/* Stats Cards */}
            <ul className="grid grid-cols-1 md:grid-cols-3 gap-6">
               {/* Card 1 */}
               <li className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col gap-4">
                  <div className="flex justify-between items-start">
                     <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-500">
                        <i className="bx bx-show text-xl"></i>
                     </div>
                     <span className="flex items-center gap-1 bg-green-50 text-green-600 px-2 py-1 rounded text-xs font-bold">
                        <i className="bx bx-trending-up"></i> 12%
                     </span>
                  </div>
                  <div>
                     <p className="text-gray-500 text-sm font-medium mb-1">
                        Profil Görüntülenme
                     </p>
                     <b className="text-3xl text-gray-900">2,543</b>
                  </div>
               </li>

               {/* Card 2 */}
               <li className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col gap-4">
                  <div className="flex justify-between items-start">
                     <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center text-red-500">
                        <i className="bx bx-heart text-xl"></i>
                     </div>
                     <span className="flex items-center gap-1 bg-green-50 text-green-600 px-2 py-1 rounded text-xs font-bold">
                        <i className="bx bx-trending-up"></i> 5.4%
                     </span>
                  </div>
                  <div>
                     <p className="text-gray-500 text-sm font-medium mb-1">
                        İçerik Etkileşimi
                     </p>
                     <b className="text-3xl text-gray-900">856</b>
                  </div>
               </li>

               {/* Card 3 */}
               <li className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col gap-4">
                  <div className="flex justify-between items-start">
                     <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center text-orange-500">
                        <i className="bx bx-briefcase-alt-2 text-xl"></i>
                     </div>
                     <span className="flex items-center gap-1 bg-red-50 text-red-500 px-2 py-1 rounded text-xs font-bold">
                        <i className="bx bx-trending-down"></i> 2.1%
                     </span>
                  </div>
                  <div>
                     <p className="text-gray-500 text-sm font-medium mb-1">
                        İhale Görüntülenme
                     </p>
                     <b className="text-3xl text-gray-900">124</b>
                  </div>
               </li>
            </ul>

            {/* Chart Section */}
            <section className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
               <div className="flex justify-between items-center mb-6">
                  <h2 className="text-lg font-bold text-gray-900">
                     Aktivite Özeti
                  </h2>
                  <div className="flex items-center gap-2">
                     <span className="w-2 h-2 rounded-full bg-red-500"></span>
                     <span className="text-xs text-gray-500 font-medium">
                        Etkileşim
                     </span>
                  </div>
               </div>
               <div className="h-64 w-full relative">
                  {/* Simulated Chart */}
                  <svg
                     viewBox="0 0 1000 300"
                     className="w-full h-full overflow-visible"
                     preserveAspectRatio="none">
                     <defs>
                        <linearGradient
                           id="gradient"
                           x1="0%"
                           y1="0%"
                           x2="0%"
                           y2="100%">
                           <stop
                              offset="0%"
                              stopColor="#ef4444"
                              stopOpacity="0.2"
                           />
                           <stop
                              offset="100%"
                              stopColor="#ef4444"
                              stopOpacity="0"
                           />
                        </linearGradient>
                     </defs>
                     {/* Grid lines */}
                     <line
                        x1="0"
                        y1="250"
                        x2="1000"
                        y2="250"
                        stroke="#f3f4f6"
                        strokeWidth="1"
                     />
                     <line
                        x1="0"
                        y1="150"
                        x2="1000"
                        y2="150"
                        stroke="#f3f4f6"
                        strokeWidth="1"
                        strokeDasharray="4 4"
                     />
                     <line
                        x1="0"
                        y1="50"
                        x2="1000"
                        y2="50"
                        stroke="#f3f4f6"
                        strokeWidth="1"
                        strokeDasharray="4 4"
                     />

                     {/* The Wave */}
                     <path
                        d="M0,250 C150,250 200,150 300,150 S450,200 600,200 S750,50 850,100 S950,150 1000,120 V300 H0 Z"
                        fill="url(#gradient)"
                     />
                     <path
                        d="M0,250 C150,250 200,150 300,150 S450,200 600,200 S750,50 850,100 S950,150 1000,120"
                        fill="none"
                        stroke="#ef4444"
                        strokeWidth="2"
                     />

                     {/* Points */}
                     <circle
                        cx="300"
                        cy="150"
                        r="4"
                        fill="#ef4444"
                        stroke="white"
                        strokeWidth="2"
                     />
                     <circle
                        cx="600"
                        cy="200"
                        r="4"
                        fill="#ef4444"
                        stroke="white"
                        strokeWidth="2"
                     />
                     <circle
                        cx="850"
                        cy="100"
                        r="4"
                        fill="#ef4444"
                        stroke="white"
                        strokeWidth="2"
                     />
                  </svg>
                  {/* X Axis Labels */}
                  <div className="flex justify-between text-xs text-gray-400 mt-2 px-2">
                     <span>1 Eki</span>
                     <span>5 Eki</span>
                     <span>10 Eki</span>
                     <span>15 Eki</span>
                     <span>20 Eki</span>
                     <span>25 Eki</span>
                     <span>30 Eki</span>
                  </div>
               </div>
            </section>
         </main>
         <aside></aside>
      </>
   );
}
