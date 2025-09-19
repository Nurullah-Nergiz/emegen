"use server";
import { AvatarImg, CoverImage } from "@/components/widgets/avatar";
import Link from "next/link";
import { PrimaryBtn, SecondaryBtn } from "@/components/btn";
import { RecommendedPeopleWidget } from "../../../components/widgets/RecommendedPeople";
import FollowBtn from "@/components/btn/Follow";
import { getUser } from "@/services/user";
import { notFound } from "next/navigation";
import useAuthUser from "@/hooks/auth";
import { Ad } from "@/components/AdBanner";
import { ItemLink } from "@/components/nav/itemLink";

export default async function Layout({ children, params }) {
   // console.clear();

   /**
    * @type {String}
    */
   const { username = "" } = await params;
   if (!username.startsWith("%40")) notFound();

   // Remove trailing slash from username if present
   /**
    * @type {String}
    */

   const { status, data: user } = await getUser(
      username.replace(/%40/g, "").trim()
   );
   // console.log("user:", user);

   // console.log(await useAuthUser());
   /**
    * @type {Boolean}
    */
   const isAuthenticatedUser = (await useAuthUser())?._id === user?._id;

   if (status !== 200 || !user || (Array.isArray(user) && user.length === 0))
      notFound();

   const navSchema = [
      {
         "@context": "https://schema.org",
         "@type": "SiteNavigationElement",
         name: "Ana Sayfa",
         url: "https://www.emegen.com.tr/",
      },
      {
         "@context": "https://schema.org",
         "@type": "SiteNavigationElement",
         name: "Profil",
         url: `https://www.emegen.com.tr/@${username}`,
      },
      {
         "@context": "https://schema.org",
         "@type": "SiteNavigationElement",
         name: "Posts",
         url: `https://www.emegen.com.tr/@${username}/posts`,
      },
      {
         "@context": "https://schema.org",
         "@type": "SiteNavigationElement",
         name: "Tenders",
         url: `https://www.emegen.com.tr/@${username}/tenders`,
      },
      {
         "@context": "https://schema.org",
         "@type": "SiteNavigationElement",
         name: "Hakkında",
         url: `https://www.emegen.com.tr/@${username}/about`,
      },
   ];

   return (
      <>
         {/* Structured Data */}
         {navSchema.map((item, index) => (
            <script
               key={index}
               type="application/ld+json"
               dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
            />
         ))}
         {/* End Structured Data */}

         <section className="flex-1">
            <header className="flex flex-col gap-4">
               <CoverImage src={user?.coverPicture} />

               <section className="main py-0 flex flex-col sm:flex-row items-center gap-2 overflow-hidden">
                  <AvatarImg
                     src={user?.profilePicture}
                     className="w-auto h-full max-w-40 max-h-40 p-1 "
                     size={128 * 4}
                  />
                  <div className="flex-1 flex flex-col  gap-2">
                     <div className="flex flex-col gap-2">
                        <h1 className="inline-flex items-center gap-2 text-xls font-bolds whitespace-nowrap">
                           {user?.name}
                           <span className="">
                              <b className="">@{user?.userName}</b>
                              {!user?.isVerified && (
                                 <i className="bx bxs-check-circle text-blue-500"></i>
                              )}
                           </span>
                        </h1>
                        <h2 className="h-10 overflow-hidden text-ellipsis text-sm">
                           {user?.bio || "Bu kullanıcı hakkında bilgi yok."}
                        </h2>
                        <div className="flex gap-1">
                           <span className="">
                              <b className="">{`${
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
                        </div>
                        <h3 className="font-semibold">
                           <ul className="flex flex-wrap gap-4">
                              {user?.tags &&
                                 (typeof user?.tags[0] === "object"
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
                        </h3>

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
                     <div className="w-full  flex justify-end items-center  gap-4">
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
                              <Link
                                 className="!w-full"
                                 href={`/tenders/request/${user?._id}/`}>
                                 <PrimaryBtn className="!w-full">
                                    Fiyat Teklif İste
                                 </PrimaryBtn>
                              </Link>
                           </>
                        )}
                     </div>
                  </div>
               </section>
            </header>
            {/* <div className="justify-items-end flex gap-4"></div> */}

            <nav className="main my-4 flex gap-4 border-b border-secondary">
               {[
                  { name: "Ana sayfa", href: "" },
                  { name: "Posts", href: "/posts" },
                  { name: "Tenders", href: "/tenders" },
                  { name: "Hakkında", href: "/about" },
               ].map(({ name, href }) => (
                  <ItemLink
                     text={name}
                     link={`/@${user?.userName}${href}`}
                     className="hover:underline"
                     activeClass="border-b-2 border-primary"
                     key={"profil-navbar-" + name}
                  />
                  // <Link
                  // href={`/@${user?.userName}/${href}`}
                  // className="hover:underline"
                  //    key={"profil-navbar-" + name}>
                  //    {name}
                  // </Link>
               ))}
            </nav>
            <main className="w-full">{children}</main>
         </section>
         <aside className="min-w-96 w-full lg:w-1/3 flex flex-col gap-4">
            <Ad />
            {/* <div className="main">
               <h3 className="text-xl font-bold border-bs border-current">
                  <i className="bx bx-id-card mr-2"></i>
                  Hakkında
               </h3>
            </div> */}

            {/* <div className="main">
               <h3 className=" text-xl font-bold border-bs border-current">
                  <i className="bx bx-id-card mr-2"></i>
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
                        value: user?.phoneNumbers[0] || "Telefon bilgisi yok.",
                     },
                     {
                        name: "Website",
                        icon: "bx bx-globe",
                        value:
                           typeof user?.website === "string"
                              ? user?.website
                                   ?.replace(/^https?:\/\//, "")
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
            </div> */}
            <RecommendedPeopleWidget />
         </aside>
      </>
   );
}

export async function generateMetadata({ params }) {
   const { username } = await params;

   if (username && username[0] !== "@") {
      const { status, data: user } = await getUser(
         username.replace(/%40/g, "").trim()
      );
      if (status === 200 && user && (!Array.isArray(user) || user.length !== 0))
         return {
            title: `${user?.name} (@${user?.userName})`,
            description: user?.bio || "Bu kullanıcı hakkında bilgi yok.",
            alternates: {
               canonical: `https://emegen.com.tr/@${user?.userName}`,
            },
            keywords: [
               user?.name || "Emegen",
               user?.userName || "Emegen",
               ...(user?.tags || []),
               "Emegen",
               "emegen",
               "emegen.com.tr",
            ],

            openGraph: {
               title: `${user?.name} (@${user?.userName}) - Emegen`,
               description: user?.bio || "Bu kullanıcı hakkında bilgi yok.",
               images: [
                  {
                     url: user?.profilePicture,
                     width: 1200,
                     height: 630,
                  },
               ],
            },
            locale: user?.location || "tr-TR",
            formatDetection: {
               email: true,
               address: true,
               telephone: true,
            },
            robots: {
               index: true,
               follow: true,
               nocache: false,
            },
            category: "profile",
            other: {
               locale: user?.location || "tr-TR",
            },
         };
   }
}
