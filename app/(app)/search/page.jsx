"use client";

import { getSearch, getSearchUsers } from "@/services/search";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { Avatar, AvatarImg } from "@/components/widgets/avatar";
import FollowBtn from "@/components/btn/Follow";

export default function Page({}) {
   const router = useRouter();
   const pathname = usePathname();
   const searchParams = useSearchParams();

   const query = searchParams.get("q") || "";

   const [searchRes, setSearch] = useState([]);
   const [filter, setFilter] = useState({
      q: searchParams.get("q") || "",
      status: searchParams.get("status") || "all",
      short: "recent",
      page: 0,
      limit: 20,
   });
   //     console.log("query:", query);

   useEffect(() => {
      if (!query) return;

      if (filter.status === "all") {
         getSearch(filter)
            .then((searchResults) => {
               console.log(searchResults.data.users);

               setSearch(searchResults?.data.users ?? []);
            })
            .catch(() => {
               setSearch([]);
            });
         return;
      } else if (filter.status === "user") {
         getSearchUsers(filter)
            .then((searchResults) => {
               console.log(searchResults.data);

               setSearch(searchResults?.data ?? []);
            })
            .catch(() => {
               setSearch([]);
            });
         return;
      }
   }, [...Object.values(filter)]);

   const handleFilterChange = (key = "", val = "") => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(key, val);
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
      setFilter((prev) => ({ ...prev, [key]: val }));
   };

   return (
      <>
         <main className="flex flex-col gap-6 flex-1">
            {query.trim() !== "" ? (
               <>
                  <h1 className="text-2xl font-semibold">
                     "{query}" için arama sonuçları
                  </h1>
                  <div className="flex items-center gap-4">
                     {[
                        {
                           label: "Tümü",
                           value: "all",
                        },
                        {
                           label: "Kullanıcı",
                           value: "user",
                        },
                        {
                           label: "Gönderi",
                           value: "post",
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
                  <ul className="flex flex-col gap-4">
                     {searchRes.map((user) => (
                        <li
                           key={user.id}
                           className="w-full bg-main border border-gray-300 rounded-lg p-4 flex flex-col items-center">
                           <Avatar
                              name={`${user.name} `}
                              userName={user.userName}
                              bio={user.bio}
                              src={user?.profilePicture}
                              className="w-full max-w-none">
                              <FollowBtn
                                 id={user._id}
                                 isFollowing={user?.isFollowing}
                                 type="secondary"
                                 className=""
                              />
                           </Avatar>
                        </li>
                     ))}
                  </ul>
               </>
            ) : (
               <div className="main">
                  <svg
                     width="160"
                     height="160"
                     viewBox="0 0 160 160"
                     fill="none"
                     xmlns="http://www.w3.org/2000/svg"
                     role="img"
                     aria-labelledby="emptySearchTitle emptySearchDesc"
                     style={{
                        display: "block",
                        margin: "2rem auto",
                        opacity: 0.6,
                     }}>
                     <title id="emptySearchTitle">Arama sonucu yok</title>
                     <desc id="emptySearchDesc">
                        Sonuçsuz arama durumunu gösteren büyüteç illüstrasyonu
                     </desc>
                     <circle
                        cx="70"
                        cy="70"
                        r="50"
                        stroke="#6B7280"
                        strokeWidth="6"
                        fill="#F9FAFB"
                     />
                     <circle
                        cx="70"
                        cy="70"
                        r="34"
                        stroke="#D1D5DB"
                        strokeWidth="4"
                     />
                     <path
                        d="M107 107L140 140"
                        stroke="#6B7280"
                        strokeWidth="10"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                     />
                     <path
                        d="M56 62c0-4.418 7.163-8 16-8s16 3.582 16 8"
                        stroke="#9CA3AF"
                        strokeWidth="4"
                        strokeLinecap="round"
                     />
                     <path
                        d="M60 82c3 4 9 7 12 7s9-3 12-7"
                        stroke="#9CA3AF"
                        strokeWidth="4"
                        strokeLinecap="round"
                     />
                     <text
                        x="80"
                        y="152"
                        textAnchor="middle"
                        fontFamily="system-ui, sans-serif"
                        fontSize="14"
                        fill="#6B7280">
                        Sonuç bulunamadı
                     </text>
                  </svg>
               </div>
            )}
         </main>
         <aside className="max-w-xs w-full h-min p-4 bg-white shadow shadow-tertiary rounded-2xl overflow-hidden">
            <h2 className="">Filtre</h2>
            <div className="flex"></div>
         </aside>
      </>
   );
}
