"use client";
import { PrimaryBtn, SecondaryBtn } from "@/components/btn";
import { Avatar, AvatarImg } from "@/components/widgets/avatar";

import { useAuthUserId } from "@/hooks/auth";
import getRelativeTime from "@/utils/getRelativeTime ";
import Link from "next/link";
import { getTenders } from "@/services/tender";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function Tenders({
   isFilterActive = false,
   data: fetchedTenders = [],
}) {
   const searchParams = useSearchParams();
   const searchQuery = searchParams.get("query") || "";

   const [tenders, setTenders] = useState([...fetchedTenders]);
   const [filter, setFilter] = useState({
      status: "all", // all, open, closed
      query: searchQuery,
      offerType: "",
   });

   useEffect(() => {
      // console.log(fetchedTenders);
      // Check if the user is authenticated and set isAuthorSelf accordingly

      if (fetchedTenders.length > 0) {
         console.log("Tenders fetched:", tenders);
      } else {
         // getTenders()
         //    .then((response) => {
         //       setTenders([...response.data]);
         //    })
         //    .catch((error) => {
         //       console.error("Error fetching tenders:", error);
         //    });
      }
   }, [...Object.values(filter)]);

   const handleFilterChange = (key = "", val = "") => {
      setFilter((prev) => ({ ...prev, [key]: val }));
   };

   return (
      <>
         {isFilterActive && (
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
         )}
         <section className="flex flex-col gap-4 ">
            {typeof tenders !== "undefined" && tenders.length === 0 ? (
               <div className="flex flex-col items-center justify-center py-16 px-4 text-center w-full">
                  <div className="flex justify-center mb-6">
                     {/* Empty folder/document illustration */}
                     <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
                        <rect x="16" y="24" width="48" height="40" rx="8" fill="#F3F4F6"/>
                        <path d="M16 32V24a8 8 0 0 1 8-8h12l6 8h20a8 8 0 0 1 8 8v8" stroke="#E53935" strokeWidth="2" fill="none"/>
                        <rect x="28" y="40" width="24" height="4" rx="2" fill="#E53935"/>
                        <rect x="28" y="48" width="16" height="4" rx="2" fill="#E53935" opacity="0.5"/>
                     </svg>
                  </div>
                  <h2 className="text-2xl font-bold text-[#E53935] mb-2">Henüz teklif bulunamadı</h2>
                  <p className="text-base text-gray-500 mb-8">Şu anda görüntüleyebileceğiniz teklif yok.</p>
                  <div className="flex flex-col sm:flex-row gap-3 w-full max-w-xs mx-auto">
                     <Link href="/tenders/new" className="w-full">
                        <button
                           className="w-full py-3 px-6 rounded-lg bg-[#E53935] text-white font-semibold shadow hover:bg-[#c62828] transition">
                           Yeni Teklif Oluştur
                        </button>
                     </Link>
                     <Link href="/tenders" className="w-full">
                        <button
                           className="w-full py-3 px-6 rounded-lg border border-[#E53935] text-[#E53935] font-semibold bg-white shadow hover:bg-[#fbe9e7] transition">
                           İlanlara Göz At
                        </button>
                     </Link>
                  </div>
               </div>
            ) : typeof tenders !== "undefined"
               ? tenders?.map((tender, i) => {
                    return (
                       <Tender tender={tender} key={tender._id + "-" + i} />
                    );
                 })
               : ""}
         </section>
      </>
   );
}

export const Tender = ({ children, tender }) => {
   // console.log(tender.author);
   const user = tender?.author;

   const invitedUsers = tender?.invitedUsers?.slice(0, 3) || [];
   const [isAuthorSelf, setIsAuthorSelf] = useState(false);

   useEffect(() => {
      useAuthUserId().then((userId) => {
         if (userId) {
            setIsAuthorSelf(userId === user?._id); // Replace "self" with actual user ID check
         } else {
            setIsAuthorSelf(false);
         }
      });
      console.clear();
      // console.log(Object.keys(tender));
   }, [user?._id]);

   return (
      <div className="main flex flex-col gap-4">
         <Avatar
            userAvatar={user?.avatar}
            name={`${user?.name} `}
            userName={user?.userName}
            src={user?.profilePicture}
         />

         <Link href={`/tenders/${tender?._id}`} className="flex flex-col gap-2">
            <ul className="flex flex-col gap-2">
               <li className="text-2xl">{tender?.title}</li>
               <li className="h-12 text-secondary dark:text-tertiary text-ellipsis overflow-hidden whitespace-pre-wrap">
                  {tender?.description}
               </li>
               <li className="flex justify-between">
                  <span className="">Davetliler:</span>
                  <span className="max-w-28 h-10 flex items-center flex-wrap gap-2 overflow-hidden">
                     {tender?.invitedUsers?.length > 3 && (
                        <span className="ml-2 text-xs text-gray-500">
                           +{tender.invitedUsers.length - 3} daha
                        </span>
                     )}
                  </span>
               </li>
               <li className="flex justify-between">
                  <span className="">Durum:</span>
                  <b>{tender?.status === "open" ? "Açık" : "Kapalı"}</b>
               </li>
               {tender?.createdAt && (
                  <li className="flex justify-between">
                     <span className="">Oluşturulma Tarihi:</span>
                     <b>{getRelativeTime(tender?.createdAt)}</b>
                  </li>
               )}
            </ul>
         </Link>

         <div className="flex flex-row-reverse">
            {isAuthorSelf ? (
               <Link
                  href={`/tenders/${tender._id}/edit`}
                  className="btn btn-primary">
                  <SecondaryBtn>Düzenle</SecondaryBtn>
               </Link>
            ) : (
               <SecondaryBtn className="btn btn-secondary">
                  Teklif Ver
               </SecondaryBtn>
            )}
            <Link
               href={`/tenders/${tender._id}`}
               className="btn btn-primary ml-2">
               Detaylar
            </Link>
            {children}
         </div>
      </div>
   );
};
