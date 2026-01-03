"use server";

import { RecommendedPeopleWidget } from "../../../components/widgets/RecommendedPeople";
import { getUser } from "@/services/user";
import { notFound, redirect } from "next/navigation";
// import removed: useAuthUser (client hook not allowed in this server component)
import { Ad } from "@/components/AdBanner";

import useAuthUser from "@/hooks/auth";
import CompleteProfile from "@/components/widgets/profile/completeProfile";
import ProfileInfoHeader from "@/components/profile/header";
import ProfileNavbar from "@/components/profile/nav";
import { ProfileSchemas } from "@/components/schema/profile";
import { cleanUserName } from "@/utils/user";
import Footer from "@/components/footer";

export default async function Layout({ children, params }) {
   // console.clear();

   /**
    * @type {String}
    */
   const { username = "" } = await params;
   const cleanUsername = cleanUserName(username);
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
      // notFound();
   }
   const { status, data: user } = userResponse || { status: 500, data: null };
   // if (process.env.NODE_ENV !== "production") console.log(user);

   /**
    * @type {Boolean}
    */
   const isAuthenticatedUser = (await useAuthUser())?._id === user?._id;

   if (status === 404 || !user) {
      // Başındaki @ işaretini temizle

      const parts = cleanUsername.split("-");
      const last = parts[parts.length - 1];

      // ObjectId kontrolü — 24 chars hex
      const isMongoId = /^[a-fA-F0-9]{24}$/.test(last);
      console.log(isMongoId);

      if (isMongoId) {
         parts.pop(); // id kısmını kaldır
         // parts.join("");
         console.log(parts);

         redirect(`/@${parts.join("-")}`, { status: 302 });
      } else notFound();
   }

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
         <aside className="min-w-96 w-full lg:w-1/3 hidden lg:flex flex-col gap-4 sticky top-0 self-start">
            {!isAuthenticatedUser ? (
               <>
                  <Ad />
                  <RecommendedPeopleWidget />
                  <Footer />
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
   function generateDynamicMetaDescription(data) {
      const { name, bio, tags, address, followerCount, postCount } = data;
      let descriptionParts = [];
      let socialString = "";
      let tagString = "";

      // 1. Temel Yapı (Name ve Bio) - Zorunlu
      const shortBio = bio
         ? bio.substring(0, 80).trim()
         : "Profesyonel hizmetler sunan bir işletme.";

      // 2. Sosyal Kanıt Ekleme (Yeni Adım)
      if (followerCount && followerCount > 0) {
         // Takipçi sayısını formatlayın (Örn: 12.5K)
         const formattedFollower =
            followerCount / 1000 > 1
               ? `${(followerCount / 1000).toFixed(1)}K`
               : followerCount;
         socialString = ` ${formattedFollower}+ takipçi ve ${
            postCount || "yüzlerce"
         } proje ile.`; // postCount yoksa 'yüzlerce' kullanıldı
      }

      // Cümleyi birleştirme sırası değişti: Name + Social + Bio
      descriptionParts.push(`${name}.${socialString} ${shortBio}...`);

      // 3. Anahtar Kelimeler (Tags)
      if (tags && tags.length > 0 && tags[0].length > 0) {
         const relevantTags = tags[0].slice(0, 3).join(", ");
         tagString = ` Uzmanlık: ${relevantTags}.`;
      }
      descriptionParts.push(tagString);

      // 4. Konum Bilgisi
      let locationString = "";
      if (address && address.city && address.district) {
         locationString = ` ${address.district}/${address.city} merkezli.`;
      } else if (address && address.city) {
         locationString = ` ${address.city} merkezli.`;
      }
      descriptionParts.push(locationString);

      // Metinleri birleştirin ve 155 karakteri aşmamaya dikkat edin.
      let finalDescription = descriptionParts.join("").trim();

      // Son uzunluk kontrolü
      if (finalDescription.length > 160) {
         finalDescription = finalDescription.substring(0, 157) + "...";
      }

      return finalDescription;
   }

   const { username } = await params;
   const cleanUsername = cleanUserName(username);

   if (username && username[0] !== "@") {
      const { status, data: user } = await getUser(cleanUsername);
      if (status === 200 && user && (!Array.isArray(user) || user.length !== 0))
         return {
            title: `${user?.name} - (@${user?.userName})`,
            description:
               // user?.bio ||
               generateDynamicMetaDescription({
                  name: user?.name || "",
                  bio: user?.bio || "",
                  tags: user?.tags || [],
                  address: user?.address || {},
                  followerCount: user?.followerCount || 0,
                  postCount: user?.postCount || 0,
                  followingCount: user?.followingCount || 0,
               }),
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
            metadataBase: new URL("http://cdn.emegen.com.tr"),
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
               username: user?.userName,
               firstName: user?.name,
               lastName: user?.surname,
               gender: user?.gender,
               profile: {
                  firstName: user?.name || "",
                  username: user?.userName || "",
               },
               twitter: {
                  card: "summary_large_image",
                  title: `${user?.name} - (@${user?.userName}) - Emegen`,
                  description: user?.bio || "Bu kullanıcı hakkında bilgi yok.",
                  images: [
                     {
                        url: user?.profilePicture,
                        width: 1200,
                        height: 630,
                     },
                  ],
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
               name: user?.name,
               userName: user?.userName,
               locale:
                  typeof user?.location === "string" ? user.location : "tr-TR",
            },
         };
   }
}
