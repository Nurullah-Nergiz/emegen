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
         <header className="flex flex-col gap-4">
            <CoverImage src={user?.coverPicture} />

            <section className="main py-0 flex flex-col sm:flex-row items-center gap-2 overflow-hidden">
               <AvatarImg
                  src={user?.profilePicture}
                  className="w-auto h-full max-w-52 max-h-52 p-1 "
                  size={128 * 4}
               />
               <div className="w-full flex flex-col  gap-2">
                  <div className="flex flex-col items-center sm:items-start gap-2">
                     <h1 className="inline-flex flex-col sm:flex-row items-center flex-wrap gap-0 text-xls font-bolds whitespace-nowrap">
                        <span className="flex gap-2 items-center text-2xl font-bold">
                           {user?.name}
                           {user?.isVerified && (
                              <i className="bx bxs-check-circle text-primary"></i>
                           )}
                        </span>
                        <p className="text-accent text-base">
                           @{user?.userName}
                        </p>
                     </h1>
                     <h2 className="overflow-hidden whitespace-pre-line text-ellipsis text-sm">
                        {user?.bio || "Bu kullanıcı hakkında bilgi yok."}
                     </h2>
                     <div className="flex gap-1">
                        <Link
                           href={`/@${cleanUsername}/followers`}
                           className="">
                           <b className="">{`${user?.followersCount ?? 0} `}</b>
                           takipci
                        </Link>
                        <Link
                           href={`/@${cleanUsername}/following`}
                           className="">
                           <b className="">{` - ${
                              user?.followingCount ?? 0
                           } `}</b>
                           takip
                        </Link>
                        <span>
                           <b className="">{` - ${user?.postCount ?? 0} `}</b>
                           gönderi
                        </span>
                     </div>
                     <h3 className="font-semibold">
                        <ul className="flex items-center gap0">
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
                     </h3>

                     {user?.location && (
                        <div className="flex flex-wrap items-center">
                           <>
                              <i className="bx bx-map"></i>
                              <p className=" px-1 text-base whitespace-nowrap">
                                 {formatLocation(user?.location)}
                              </p>
                           </>
                        </div>
                     )}
                  </div>
                  <div className="w-full flex flex-col sm:flex-row justify-end items-center  gap-4">
                     {isAuthenticatedUser ? (
                        <>
                           <SecondaryBtn className="bx bx-share-alt !w-full py-2 px-4">
                              Paylaş
                           </SecondaryBtn>
                           <Link
                              href="/settings/edit-profile"
                              className="!w-full">
                              <PrimaryBtn className="bx bx-edit !w-full py-2 px-4">
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
                              className="!w-full"
                           />
                           {user.primaryBtn?.type === "price" ? (
                              <Link
                                 className="!w-full"
                                 href={`/tenders/request/${user?._id}/`}>
                                 <PrimaryBtn className="!w-full">
                                    Fiyat Teklif İste
                                 </PrimaryBtn>
                              </Link>
                           ) : user.primaryBtn?.type === "custom" ? (
                              <Link
                                 className="!w-full"
                                 href={user.primaryBtn?.url}
                                 target="_blank"
                                 rel="noopener noreferrer">
                                 <PrimaryBtn className="!w-full">
                                    {user.primaryBtn.text}
                                 </PrimaryBtn>
                              </Link>
                           ) : (
                              ""
                           )}
                        </>
                     )}
                  </div>
               </div>
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
