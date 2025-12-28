"use client";

import { AvatarImg, CoverImage } from "@/components/widgets/avatar";
import Link from "next/link";
import { PrimaryBtn, SecondaryBtn } from "@/components/btn";
import FollowBtn from "@/components/btn/Follow";
import { cleanUserName } from "@/utils/user";
import { useState, useCallback } from "react";
import dynamic from "next/dynamic";

const LazyComponent = dynamic(
   () => import("@/components/widgets/popup/tender"),
   {
      ssr: false,
      // loading: () => <p>Yükleniyor...</p>,
   }
);

export default function ProfileInfoHeader({
   user = {},
   isAuthenticatedUser = false,
}) {
   const cleanUsername = cleanUserName(user?.userName || "");

   const [modalOpen, setModalOpen] = useState(false);
   const openModal = useCallback(() => setModalOpen(true), []);
   const closeModal = useCallback(() => setModalOpen(false), []);

   return (
      <>
         <header className="main !px-0 !pt-0 flex flex-col gap-4 overflow-hidden">
            <CoverImage src={user?.coverPicture} />
            <section className="flex items-start justify-between gap-4 px-4 -mt-16 sm:-mt-24 z-10">
               <AvatarImg
                  src={user?.profilePicture}
                  className="w-auto h-full max-w-32 max-h-32 sm:max-w-48 sm:max-h-48 p-1 bg-background rounded-full border-4"
                  size={128 * 4}
               />
               <div className="pt-16 sm:pt-28 flex items-center gap-4">
                  {isAuthenticatedUser ? (
                     <>
                        <SecondaryBtn className="bx bx-share-alt !hidden sm:!flex py-2 px-4">
                           Paylaş
                        </SecondaryBtn>
                        <Link href="/settings/edit-profile" className="">
                           <PrimaryBtn className="bx bx-edit py-2 px-4">
                              Profili Düzenle
                           </PrimaryBtn>
                        </Link>
                     </>
                  ) : (
                     <>
                        <FollowBtn
                           id={user._id}
                           isFollowing={user?.isFollowing}
                           type="secondary"
                           className=""
                        />
                        {user.primaryBtn?.type === "custom" ? (
                           <Link
                              href={user.primaryBtn?.url}
                              target="_blank"
                              rel="noopener noreferrer">
                              <PrimaryBtn>{user.primaryBtn.text}</PrimaryBtn>
                           </Link>
                        ) : (
                           <PrimaryBtn
                           // onClick={openModal}
                           >
                              Fiyat Teklif İste
                           </PrimaryBtn>
                        )}
                     </>
                  )}
               </div>
            </section>
            <section className="flex flex-col gap-2 px-4 -mt-4">
               <div className="flex flex-col">
                  <h1 className="inline-flex items-center gap-2 text-2xl font-bold">
                     {user?.name}
                     {user?.isVerified ? (
                        <i className="bx bxs-check-circle text-primary"></i>
                     ) : (
                        "null"
                     )}
                  </h1>
                  <h2 className="text-tertiary text-base">@{user?.userName}</h2>
               </div>

               <h3 className="overflow-hidden whitespace-pre-line text-ellipsis text-sm">
                  {user?.bio || "Bu kullanıcı hakkında bilgi yok."}
               </h3>

               <div className="flex gap-4">
                  <Link href={`/@${cleanUsername}/followers`} className="">
                     <b className="">{`${user?.followersCount ?? 0} `}</b>
                     takipci
                  </Link>
                  <Link href={`/@${cleanUsername}/following`} className="">
                     <b className="">{`${user?.followingCount ?? 0} `}</b>
                     takip
                  </Link>
                  <span>
                     <b className="">{`${user?.postCount ?? 0} `}</b>
                     gönderi
                  </span>
               </div>

               <ul className="flex items-center gap-2 font-semibold flex-wrap">
                  {user?.tags &&
                     (typeof user?.tags[0] === "object"
                        ? user.tags[0]
                        : user.tags
                     )?.map((tag) => (
                        <li
                           key={tag}
                           className="w-min px-0 py-1 rounded-md bg-accent text-sm underline">
                           #{tag}
                        </li>
                     ))}
               </ul>
               {/* Working hours */}
               {formatWorkingHours([
                  { day: "Pazartesi", open: "08:30", close: "18:00" },
                  { day: "Salı", open: "08:30", close: "18:00" },
                  { day: "Çarşamba", open: "08:30", close: "18:00" },
                  { day: "Perşembe", open: "08:30", close: "18:00" },
                  { day: "Cuma", open: "08:30", close: "18:00" },
                  { day: "Cumartesi", open: "09:00", close: "16:00" },
                  { day: "Pazar", open: null, close: null },
               ]) && (
                  <div className="text-sm text-tertiary">
                     <span className="font-semibold">Çalışma Saatleri: </span>
                     <span>
                        {formatWorkingHours(
                           [
                              { day: "mon", open: "08:30", close: "18:00" },
                              { day: "tue", open: "08:30", close: "18:00" },
                              { day: "wed", open: "08:30", close: "18:00" },
                              { day: "thu", open: "08:30", close: "18:00" },
                              { day: "fri", open: "08:30", close: "18:00" },
                              { day: "sat", open: "09:00", close: "16:00" },
                              { day: "sun", open: null, close: null },
                           ]
                           // user?.workingHours
                        )}
                     </span>
                  </div>
               )}
               {isAuthenticatedUser && (
                  <div className="w-full flex sm:hidden flex-col sm:flex-row justify-end items-center  gap-4">
                     <SecondaryBtn className="bx bx-share-alt !w-full py-2 px-4">
                        Paylaş
                     </SecondaryBtn>
                  </div>
               )}
            </section>
         </header>
         {/* <LazyComponent open={modalOpen} data={user._id} onClose={closeModal} /> */}
      </>
   );
}

function formatWorkingHours(workingHours) {
   if (!workingHours || workingHours.length === 0) return null;

   const daysMap = {
      mon: "Pzt",
      tue: "Sal",
      wed: "Çar",
      thu: "Per",
      fri: "Cum",
      sat: "Cmt",
      sun: "Paz",
   };

   const groupedHours = [];
   let currentGroup = null;

   workingHours.forEach(({ day, open, close }) => {
      const hours = open && close ? `${open}-${close}` : "Kapalı";

      if (currentGroup && currentGroup.hours === hours) {
         currentGroup.days.push(day);
      } else {
         if (currentGroup) {
            groupedHours.push(currentGroup);
         }
         currentGroup = { days: [day], hours };
      }
   });

   if (currentGroup) {
      groupedHours.push(currentGroup);
   }

   return groupedHours
      .map(({ days, hours }) => {
         const dayRange =
            days.length > 1
               ? `${daysMap[days[0]]}-${daysMap[days[days.length - 1]]}`
               : daysMap[days[0]];
         return `${dayRange} ${hours}`;
      })
      .join(", ");
}
