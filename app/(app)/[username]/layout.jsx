"use server";
import { AvatarImg, CoverImage } from "@/components/widgets/avatar";
import Link from "next/link";
import { PrimaryBtn, SecondaryBtn } from "@/components/btn";
import { RecommendedPeopleWidget } from "../../../components/widgets/RecommendedPeople";
import FollowBtn from "@/components/btn/Follow";
import { getUser } from "@/services/user";
import { notFound } from "next/navigation";
// import removed: useAuthUser (client hook not allowed in this server component)
import { Ad } from "@/components/AdBanner";
import { ItemLink } from "@/components/nav/itemLink";
import useAuthUser from "@/hooks/auth";

export default async function Layout({ children, params }) {
   console.clear();

   /**
    * @type {String}
    */
   const { username = "" } = await params;
   const cleanUsername = username.replace(/%40/g, "").trim();
   console.log(username);
   if (!username.startsWith("%40")) notFound();

   // Remove trailing slash from username if present
   /**
    * @type {String}
    */

   // console.time("User fetch time");
   
   let userResponse;
   try {
      userResponse = await getUser(cleanUsername);
   } catch (err) {
      console.error("Failed to fetch user:", err);
      notFound();
   }
   const { status, data: user } = userResponse || { status: 500, data: null };
   // console.timeEnd("User fetch time");

   // console.log("user:", user);
   // const isAuthenticatedUser = false; // TODO: implement a server-side auth check
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

   const businessSchema = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      ...(user?.name && { name: user.name }),
      ...(user?.userName && {
         url: `https://www.emegen.com.tr/@${user.userName}`,
      }),
      ...(user?.profilePicture && { logo: user.profilePicture }),
      ...(user?.coverPicture && { image: user.coverPicture }),
      ...(user?.bio && { description: user.bio }),
      ...(user?.phoneNumbers?.[0] && { telephone: user.phoneNumbers[0] }),
      ...(user?.email && { email: user.email }),
      ...(user?.address && {
         address: {
            "@type": "PostalAddress",
            ...(user.address.street && { streetAddress: user.address.street }),
            ...(user.address.city && { addressLocality: user.address.city }),
            ...(user.address.region && { addressRegion: user.address.region }),
            ...(user.address.postalCode && {
               postalCode: user.address.postalCode,
            }),
            ...(user.address.country && {
               addressCountry: user.address.country,
            }),
         },
      }),
      ...(user?.location && {
         geo: {
            "@type": "GeoCoordinates",
            ...(user.location.latitude && { latitude: user.location.latitude }),
            ...(user.location.longitude && {
               longitude: user.location.longitude,
            }),
         },
      }),
      ...(user?.socialLinks?.length > 0 && { sameAs: user.socialLinks }),
      ...(user?.openingHours && { openingHours: user.openingHours }),
      ...(user?.priceRange && { priceRange: user.priceRange }),
      ...(user?.paymentMethods && { paymentAccepted: user.paymentMethods }),
   };

   return (
      <>
         {/* Structured Data */}
         <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(businessSchema) }}
         />
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
                  <div className="w-full flex flex-col  gap-2">
                     <div className="flex flex-col items-center sm:items-start gap-2">
                        <h1 className="inline-flex flex-col sm:flex-row items-center flex-wrap gap-0 text-xls font-bolds whitespace-nowrap">
                           <span className="flex gap-2 items-center text-2xl font-bold">
                              {user?.name}
                              {!user?.isVerified && (
                                 <i className="bx bxs-check-circle text-primary"></i>
                              )}
                           </span>
                           <p className="text-accent text-base">
                              @{user?.userName}
                           </p>
                        </h1>
                        <h2 className="overflow-hidden text-ellipsis text-sm">
                           {user?.bio || "Bu kullanıcı hakkında bilgi yok."}
                        </h2>
                        <div className="flex gap-1">
                           <Link
                              href={`/@${cleanUsername}/followers`}
                              className="">
                              <b className="">{`${
                                 user?.followersCount ?? 0
                              } `}</b>
                              takipçi
                           </Link>
                           <Link
                              href={`/@${cleanUsername}/following`}
                              className=""
                           >
                              <b className="">{` - ${
                                 user?.followingCount ?? 0
                              } `}</b>
                              takip
                           </Link>
                           <span>
                              <b className="">{` - ${
                                 user?.postCount ?? 0
                              } `}</b>
                              gönderi
                           </span>
                        </div>
                        <h3 className="font-semibold">
                           <ul className="flex items-center gap-4">
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
         <aside className="min-w-96 w-full lg:w-1/3 hidden lg:flex flex-col gap-4">
            <Ad />
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
