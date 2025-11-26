"use client";

import { AvatarImg, CoverImage } from "@/components/widgets/avatar";
import Link from "next/link";
import { PrimaryBtn, SecondaryBtn } from "@/components/btn";
import FollowBtn from "@/components/btn/Follow";

export default function ProfileInfoHeader({
   user = {},
   isAuthenticatedUser = false,
}) {
   const cleanUsername = user?.userName || "";

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
                        {user.primaryBtn?.type === "price" ||
                        user.primaryBtn?.type === "" ? (
                           // <Link href={`/tenders/request/${user?._id}/`}>
                                 <PrimaryBtn
                                    onClick={() => {
                                       
                                 }}
                                 >Fiyat Teklif İste</PrimaryBtn>
                           // </Link>
                        ) : user.primaryBtn?.type === "custom" ? (
                           <Link
                              href={user.primaryBtn?.url}
                              target="_blank"
                              rel="noopener noreferrer">
                              <PrimaryBtn>{user.primaryBtn.text}</PrimaryBtn>
                           </Link>
                        ) : (
                           ""
                        )}
                     </>
                  )}
               </div>
            </section>
            <section className="flex flex-col gap-4 px-4 -mt-4">
               <div className="flex flex-col">
                  <h1 className="inline-flex items-center gap-2 text-2xl font-bold">
                     {user?.name}
                     {user?.isVerified ? (
                        <i className="bx bxs-check-circle text-primary"></i>
                     ) : null}
                  </h1>
                  <p className="text-tertiary text-base">@{user?.userName}</p>
               </div>

               <h2 className="overflow-hidden whitespace-pre-line text-ellipsis text-sm">
                  {user?.bio || "Bu kullanıcı hakkında bilgi yok."}
               </h2>

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
                           className="w-min px-2 py-1 rounded-md bg-accent text-sm underline">
                           #{tag}
                        </li>
                     ))}
               </ul>
               {isAuthenticatedUser && (
                  <div className="w-full flex sm:hidden flex-col sm:flex-row justify-end items-center  gap-4">
                     <SecondaryBtn className="bx bx-share-alt !w-full py-2 px-4">
                        Paylaş
                     </SecondaryBtn>
                  </div>
               )}
            </section>
         </header>
      </>
   );
}

function formatLocation(loc) {
   // Return empty string for falsy values
   if (!loc) return "";
   // Pass through strings
   if (typeof loc === "string") return loc;
   // Try to assemble a nice string from common location fields
   if (typeof loc === "object") {
      const {
         city,
         district,
         region,
         country,
         full_address,
         zipCode,
         postalCode,
      } = loc || {};
      const primary = [city, district || region, country]
         .filter(Boolean)
         .join(", ");
      if (primary) return primary;
      const fallback = [
         full_address,
         city,
         district || region,
         zipCode || postalCode,
         country,
      ]
         .filter(Boolean)
         .join(", ");
      return fallback || "";
   }
   // Last-resort stringification
   try {
      return String(loc);
   } catch {
      return "";
   }
}
