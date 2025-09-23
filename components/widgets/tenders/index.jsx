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
      console.log(fetchedTenders);
      // Check if the user is authenticated and set isAuthorSelf accordingly

      if (fetchedTenders.length > 0) {
         console.log("Tenders fetched:", tenders);
      } else {
         // getTenders()
         //    .then((response) => {
         //       setTenders([...response?.data]);
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
           Tender 
         )}
         <section className="flex flex-col gap-4 ">
            {typeof tenders !== "undefined"
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
   const user = !tender?.author?._id ? tender?.author[0] : tender?.author;
   const invitedUsers = tender?.invitedUsers?.slice(0, 3) || [];
   const [isAuthorSelf, setIsAuthorSelf] = useState(false);

   useEffect(() => {
      useAuthUserId().then((userId) => {
         if (userId) {
            // console.table({
            //    userId,
            //    "tender.author._id": user?._id,
            //    value: userId === user?._id,
            // });

            setIsAuthorSelf(userId === user?._id); // Replace "self" with actual user ID check
         } else {
            setIsAuthorSelf(false);
         }
      });
      // console.log("userId", user?._id, "isAuthorSelf", isAuthorSelf);
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
                     {
                        // invitedUsers.length > 0
                        // ? invitedUsers.map((user, i) => (
                        //      <>
                        //         {/* <Link
                        //            key={user._id + "-" + i}
                        //            href={`/@${user.userName}`}
                        //            prefetch={false}
                        //            className="text-primary hover:underline"> */}
                        //         <AvatarImg
                        //            src={user?.profilePicture}
                        //            alt={user?.name || user?.userName}
                        //            key={
                        //               "invited-user- " + user?._id ||
                        //               user + "-" + i
                        //            }
                        //            className="w-8 h-8 rounded-full object-cover"
                        //         />
                        //         {/* </Link> */}
                        //      </>
                        //   ))
                        // : "Hiçbir davetli yok"
                     }
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
