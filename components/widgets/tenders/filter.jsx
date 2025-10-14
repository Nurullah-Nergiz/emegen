"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function TendersFilter({ children, isFilterActive, filter, setFilter }) {
   const searchParams = useSearchParams();
   const searchQuery = searchParams.get("query") || "";

   const handleFilterChange = (key, value) => {
      setFilter((prev) => {
         return { ...prev, [key]: value };
      });
   };

   return (
      <>
         {typeof isFilterActive === "boolean" ? (
            <>
               <label className="bx bx-search !py-2 !px-3 mains !bg-accent text-main flex items-center gap-2 rounded-2xl">
                  <input
                     type="text"
                     placeholder="Search tenders..."
                     className="w-full bg-transparent text-base outline-none"
                     onChange={(e) => {
                        handleFilterChange(
                           "search",
                           e.target.value.toLowerCase().trim()
                        );
                     }}
                  />
               </label>

               <div className="flex items-center gap-4">
                  {[
                     {
                        label: "Tüm İlanlar",
                        value: "all",
                     },
                     {
                        label: "Açık İlanlar",
                        value: "open",
                     },
                     {
                        label: "Kapalı İlanlar",
                        value: "closed",
                     },
                  ].map(({ label, value }) => (
                     <button
                        key={value}
                        className={`py-2 px-3 ${
                           filter.status === value
                              ? "!bg-main text-main"
                              : "!bg-accent"
                        } shadow-sm rounded-lg font-semibold`}
                        onClick={() => handleFilterChange("status", value)}>
                        {label}
                     </button>
                  ))}
               </div>
            </>
         ) : (
            ""
         )}
      </>
   );
}
