"use client";
import FollowBtn from "@/components/btn/Follow";
import { Avatar } from "@/components/widgets/avatar";
import { Ad } from "@/components/AdBanner";
import { PrimaryBtn, SecondaryBtn } from "@/components/btn";
import Link from "next/link";
import { getTender } from "@/services/tender";
import { useEffect, useState } from "react";

export default function TenderIdPage({ params }) {
   const [tender, setTender] = useState({});

   useEffect(() => {
      Promise.all([params]).then(([{ tenderId }]) => {
         getTender(tenderId)
            .then((response) => {
               // response.data is an object (single tender), so assign directly
               setTender(() => {
                  return { ...response?.data };
               });
               console.log("Fetched tender data:", response?.data);
            })
            .catch((error) => {
               console.error("Error fetching tender data:", error);
            });
      });
   }, []);

   const author =
      typeof tender?.author?.[0] === "object"
         ? tender.author[0]
         : tender?.author;

   return (
      <>
         <main className="w-full">
            {/* {tenderId} */}
            <section className="">
               <h1 className="text-2xl font-bold">{tender?.title}</h1>
               <p className="py-2 text-tertiary">{tender?.description}</p>
               <ul>
                  <li className="flex items-center justify-between gap-2 border-t border-tertiary py-2">
                     <b> Tür</b>
                     <span>
                        {tender?.type === "public"
                           ? "Açık İhale"
                           : "Kapalı İhale"}
                     </span>
                  </li>
                  <li className="flex items-center justify-between gap-2 border-t border-tertiary py-2">
                     <b>Durum:</b>
                     <span>
                        {tender?.status === "open"
                           ? "Açık"
                           : tender?.status === "closed"
                           ? "Kapalı"
                           : tender?.status === "in-progress"
                           ? "Devam Ediyor"
                           : tender?.status === "completed"
                           ? "Tamamlandı"
                           : tender?.status === "cancelled"
                           ? "İptal Edildi"
                           : ""}
                     </span>
                  </li>
                  <li className="flex items-center justify-between gap-2 border-t border-tertiary py-2">
                     <span className="font-bold">İhale Tarihi:</span>{" "}
                     <span>
                        {new Date(tender?.startDate).toLocaleDateString(
                           "tr-TR"
                        )}
                     </span>
                  </li>
                  <li className="flex items-center justify-between gap-2 border-t border-tertiary py-2">
                     <span className="font-bold">Teslim Tarihi:</span>{" "}
                     <span>
                        {new Date(tender?.endDate).toLocaleDateString("tr-TR")}
                     </span>
                  </li>
               </ul>
               <div className="flex items-center justify-between gap-2 border-t border-tertiary py-2">
                  <b>Etiketler</b>
                  <ul className="flex gap-2">
                     {tender?.tags?.map((tag, index) => (
                        <li
                           key={index}
                           className="bg-secondary text-white px-2 py-1 rounded-md">
                           {tag}
                        </li>
                     ))}
                  </ul>
               </div>
            </section>
            {/* <pre className="">{JSON.stringify(author)}</pre> */}
            {/* <pre className="w-96">{JSON.stringify(tender)}</pre> */}
         </main>
         <aside className=" min-w-96 lg:w-1/3 flex flex-col gap-8">
            {/* <Ad /> */}
            <Avatar
               name={author?.name}
               userName={author?.userName}
               src={author?.profilePicture}
               size={64}>
               <FollowBtn id={author?._id} className="p-2" />
            </Avatar>
            <div className="">
               <Link href={`tel:${author?.phoneNumbers}`}>
                  <SecondaryBtn className="block w-full mb-2">Ara</SecondaryBtn>
               </Link>
               <SecondaryBtn className="block w-full mb-2">
                  Mesaj Gönder
               </SecondaryBtn>
               <Link href={`@${author?.userName}`}>
                  <SecondaryBtn className="block w-full mb-2">
                     Profiline Git
                  </SecondaryBtn>
               </Link>
               <PrimaryBtn className="block w-full">Teklif Ver</PrimaryBtn>
            </div>
         </aside>
      </>
   );
}

// export const metadata = {
//    title: "Tender Details",
//    description: "Details of the tender with ID: ",
//    openGraph: {
//       title: "Tender Details",
//       description: "Details of the tender with ID: ",
//    },
// };
