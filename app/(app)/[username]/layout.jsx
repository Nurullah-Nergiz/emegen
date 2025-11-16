"use server";
import Link from "next/link";
import { PrimaryBtn, SecondaryBtn } from "@/components/btn";
import { RecommendedPeopleWidget } from "../../../components/widgets/RecommendedPeople";
import { getUser } from "@/services/user";
import { notFound } from "next/navigation";
// import removed: useAuthUser (client hook not allowed in this server component)
import { Ad } from "@/components/AdBanner";

import useAuthUser from "@/hooks/auth";
import CompleteProfile from "@/components/widgets/profile/completeProfile";
import ProfileInfoHeader from "@/components/profile/header";
import ProfileNavbar from "@/components/profile/nav";
import ProfileSchemas from "@/components/profile/schema";

// Format user.location object into a readable string

export default async function Layout({ children, params }) {
   // console.clear();

   /**
    * @type {String}
    */
   const { username = "" } = await params;
   const cleanUsername = username.replace(/%40/g, "").trim();
   if (!username.startsWith("%40")) notFound();

   // Remove trailing slash from username if present
   /**
    * @type {String}
    */

   // await new Promise((resolve) => setTimeout(resolve, 10000));

   let userResponse;
   try {
      userResponse = await getUser(cleanUsername);
   } catch (err) {
      console.error("Failed to fetch user:", err);
      notFound();
   }
   const { status, data: user } = userResponse || { status: 500, data: null };
   // if (process.env.NODE_ENV !== "production") console.log(user);

   /**
    * @type {Boolean}
    */
   const isAuthenticatedUser = (await useAuthUser())?._id === user?._id;

   if (status !== 200 || !user) notFound();

   return (
      <>
         <ProfileSchemas user={user} />

         <section className="flex-1">
            <ProfileInfoHeader
               user={user}
               isAuthenticatedUser={isAuthenticatedUser}
            />
            {/* <div className="justify-items-end flex gap-4"></div> */}

            <ProfileNavbar user={user} />

            <main className="w-full main">{children}</main>
         </section>
         <aside className="min-w-96 w-full lg:w-1/3 hidden lg:flex flex-col gap-4 sticky top-20 self-start">
            {!isAuthenticatedUser ? (
               <>
                  <Ad />
                  <RecommendedPeopleWidget />
               </>
            ) : (
               <>
                  <CompleteProfile user={user} />
               </>
            )}
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
            title: `${user?.name} - (@${user?.userName})`,
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
            metadataBase: new URL(
               process.env.NEXT_PUBLIC_CDN_URL || "http://localhost:3000"
            ),
            openGraph: {
               title: `${user?.name} - (@${user?.userName}) - Emegen`,
               description: user?.bio || "Bu kullanıcı hakkında bilgi yok.",
               images: [
                  {
                     url: user?.profilePicture,
                     width: 1200,
                     height: 630,
                  },
               ],
               type: "profile",
               profile: {
                  firstName: user?.name || "",
                  username: user?.userName || "",
               },
               twitter: {
                  card: "summary_large_image",
                  title: `${user?.name} - (@${user?.userName}) - Emegen`,
                  description: user?.bio || "Bu kullanıcı hakkında bilgi yok.",
                  images: [user?.profilePicture],
               },
            },
            locale:
               typeof user?.location === "string" ? user.location : "tr-TR",
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
               locale:
                  typeof user?.location === "string" ? user.location : "tr-TR",
            },
         };
   }
}
