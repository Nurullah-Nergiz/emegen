import { AvatarImg, CoverImage } from "@/components/widgets/avatar";
import Link from "next/link";
import { PrimaryBtn, SecondaryBtn } from "@/components/btn";
import { RecommendedPeopleWidget } from "../../../components/widgets/RecommendedPeople";
import FollowBtn from "@/components/btn/Follow";
import { getUser } from "@/services/user";
import { notFound } from "next/navigation";
import useAuthUser from "@/hooks/auth";
import { Ad } from "@/components/AdBanner";

export default async function Layout({ children, params }) {
   // console.clear();

   /**
    * @type {String}
    */
   const { username = "" } = await params;
   if (!username.startsWith("%40")) notFound();

   const { status, data: user } = await getUser(
      username.replace(/%40/g, "").trim()
   );
   // console.log("user:", user);

   // console.log(await useAuthUser());
   const isAuthenticatedUser = (await useAuthUser())?._id === user?._id;

   if (status !== 200 || user.length == 0) notFound();

   // Remove trailing slash from username if present
   const cleanUserName = user?.userName?.replace(/\/$/, "");

   return (
      <>
         <section className="flex-1">
            <header className="flex flex-col gap-4">
               <CoverImage src={user?.coverPicture} />

               <div className="main py-4 flex flex-col sm:flex-row items-center gap-4 overflow-hidden">
                  <AvatarImg
                     src={user?.profilePicture}
                     className="w-auto h-full max-w-40 max-h-80 p-1 "
                     size={128 * 4}
                  />
                  <section className="flex-1 flex flex-col  gap-2">
                     <div className="flex flex-col gap-2">
                        <h1 className="inline-flex items-center gap-2 text-xls font-bolds whitespace-nowrap">
                           {user?.name}
                           {user?.isVerified && (
                              <i className="bx bxs-check-circle text-blue-500"></i>
                           )}
                        </h1>
                        <h2 className="flex gap-1">
                           <b className="">@{user?.userName}</b>
                           <span className="">
                              <b className="">{`- ${
                                 user?.followersCount ?? 0
                              } `}</b>
                              takipçi
                           </span>
                           <span>
                              <b className="">{` - ${
                                 user?.postCount ?? 0
                              } `}</b>
                              gönderi
                           </span>
                           <span>
                              <b className="">{` - ${
                                 user?.followingCount ?? 0
                              } `}</b>
                              takip
                           </span>
                        </h2>
                        {user?.location && (
                           <div className="flex flex-wrap items-center">
                              <>
                                 <i className="bx bx-map"></i>
                                 <p className=" px-1 text-base whitespace-nowrap">
                                    {user?.location}
                                 </p>
                              </>
                           </div>
                        )}
                     </div>
                     <div className="w-full sm:w-min flex items-center justify-stretch gap-4">
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
                              <FollowBtn type="secondary" className="!w-full" />
                              <PrimaryBtn className="!w-full">
                                 Teklif al
                              </PrimaryBtn>
                           </>
                        )}
                     </div>
                  </section>
               </div>
            </header>
            <div className="justify-items-end flex gap-4"></div>

            <nav className="main my-4 flex gap-4 border-b border-secondary">
               {[
                  { name: "Ana sayfa", href: "" },
                  { name: "Posts", href: "posts" },
                  { name: "Tenders", href: "tenders" },
               ].map(({ name, href }) => (
                  <Link
                     href={`/@${user?.userName}/${href}`}
                     className="hover:underline"
                     key={"profil-navbar-" + name}>
                     {name}
                  </Link>
               ))}
            </nav>
            <main className="main">{children}</main>
         </section>
         <aside className="min-w-96 w-full lg:w-1/3 flex flex-col gap-4">
            <Ad />
            <div className="main">
               <h3 className="text-xl font-bold border-bs border-current">
                  {/* <i className="bx bx-id-card mr-2"></i> */}
                  Hakkında
               </h3>
               <p className="py-2">
                  {user?.bio || "Bu kullanıcı hakkında bilgi yok."}
               </p>
            </div>
            <div className="main">
               <h3 className="mb-2 text-lg font-semibold">Etiketler</h3>
               <ul className="flex flex-wrap gap-4">
                  {(typeof user?.tags[0] === "object"
                     ? user.tags[0]
                     : user.tags
                  )?.map((tag) => (
                     <li
                        key={tag}
                        className="w-min px-3 py-2 rounded-md bg-[rgba(0,0,0,0.12)] underline">
                        #{tag}
                     </li>
                  ))}
               </ul>
            </div>
            <div className="main">
               <h3 className=" text-xl font-bold border-bs border-current">
                  {/* <i className="bx bx-id-card mr-2"></i> */}
                  İletişim bilgileri
               </h3>
               <ul className="py-2 flex flex-col gap-2">
                  {[
                     {
                        name: "E-posta",
                        icon: "bx bx-envelope",
                        value: user?.email || "E-posta bilgisi yok.",
                     },
                     {
                        name: "Telefon",
                        icon: "bx bx-phone",
                        value: user?.phone || "Telefon bilgisi yok.",
                     },
                     {
                        name: "Website",
                        icon: "bx bx-globe",
                        value: user?.website
                           ? user.website
                                .replace(/^https?:\/\//, "")
                                .replace(/\/$/, "")
                           : "Web sitesi bilgisi yok.",
                     },
                  ].map(({ name, icon, value }) => (
                     <li
                        className="flex items-center gap-4"
                        key={`contact-${name}-${icon}`}>
                        <i className={`${icon} `}></i>
                        <b className="">{value}</b>
                     </li>
                  ))}
               </ul>
            </div>
            {/* <RecommendedPeopleWidget /> */}
         </aside>
      </>
   );
}

export async function generateMetadata({ params }) {
   const { username } = await params;
   if (username[0] !== "@") {
      const { status, data: user } = await getUser(
         username.replace(/%40/g, "").trim()
      );
      if (status == 200 || user.length !== 0)
         return {
            title: `${user?.name} (@${user?.userName}) - Emegen`,
         };
   }
}
