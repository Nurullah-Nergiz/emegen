import Footer from "@/components/footer";
import {
   BreadcrumbSchema,
   NavbarSchema,
} from "@/components/schema";
import Posts from "@/components/widgets/post";
import { RecommendedPeopleWidget } from "@/components/widgets/RecommendedPeople";
import { getExplore } from "@/services/explore";

export const metadata = {
   title: "Keşfet",
   description:
      "Aradığınız uzman kapınızda! En iyi inşaat firmaları, kuaförler ve binlerce profesyonel hizmet sağlayıcı Emegen'de. Hemen keşfedin, güvenle hizmet alın.ı",
   keywords: [
      "Emegen",
      "emegen",
      "emegen.com.tr",
      "Profesyonel Hizmetler",
      "Uzmanlar",
      "Hizmet Sağlayıcılar",
      "İnşaat Firmaları",
      "Kuaförler",
      "Ev Temizliği",
      "Tadilat Hizmetleri",
      "Mobil Ustalar",
      "Yerel Hizmetler",
      "Güvenilir Uzmanlar",
      "Hizmet Keşfetme",
      "Online Hizmetler",
      "Hizmet Yorumları",
      "Hizmet Fiyatları",
   ],
   alternates: {
      canonical: "https://emegen.com.tr/",
   },

   openGraph: {
      title: "Keşfet - Emegen",
      description:
         "Aradığınız uzman kapınızda! En iyi inşaat firmaları, kuaförler ve binlerce profesyonel hizmet sağlayıcı Emegen'de. Hemen keşfedin, güvenle hizmet alın.",
      url: "https://emegen.com.tr/",
      siteName: "Emegen",
      images: [
         {
            url: "https://cdn.emegen.com.tr/logo.png",
            width: 1200,
            height: 630,
         },
      ],
      locale: "tr_TR",
      type: "website",
   },
};

export default async function Home() {
   let posts = [];
   // try {
   //    const res = await getExplore();
   //    if (res?.status === 200 && res?.data) {
   //       posts = res.data;
   //    }
   // } catch (error) {
   //    console.error("Failed to fetch posts:", error);
   // }

   return (
      <>
         <main className="w-full h-h-full mb-4 flex gap-8">
            <section className="flex-1 mx-auto ">
               <div className="w-full !pt-[30%] mb-4 !bg-secondary text-white main">
                  <h1>Türkiye’nin En Güvenilir Profesyonel Hizmet Ağı</h1>
                  <h2>
                     Popüler Hizmetler, Neden Emegen?, Sektörün Öncü Uzmanları
                  </h2>
                  {/* Premium masaüstü 
                  475 */}
               </div>
               <Posts posts={posts} />
            </section>
         </main>
         <aside className=" min-w-96 lg:w-1/3 ">
            {/* <div className="sticky top-0 z-50"> */}
            {/* <Ad /> */}
            <RecommendedPeopleWidget />
            <Footer />
            {/* </div> */}
         </aside>
         <NavbarSchema
            navbarSchema={[
               {
                  "@context": "https://schema.org",
                  "@type": "SiteNavigationElement",
                  name: "Ana Sayfa",
                  url: "https://emegen.com.tr/",
               },
               {
                  "@context": "https://schema.org",
                  "@type": "SiteNavigationElement",
                  name: "Giris Yap",
                  url: "https://emegen.com.tr/auth/login",
               },
               {
                  "@context": "https://schema.org",
                  "@type": "SiteNavigationElement",
                  name: "Kaydol",
                  url: "https://emegen.com.tr/auth/register",
               },
            ]}
         />
         <BreadcrumbSchema items={[]} />
         
      </>
   );
}

// import { Ad } from "@/components/AdBanner";
// import { Avatar } from "@/components/widgets/avatar";
// import Post from "@/components/widgets/post";
// import Link from "next/link";
// import { RecommendedPeopleWidget } from "@/components/widgets/RecommendedPeople";
// import { getExplore } from "@/services/explore";
// import { useEffect, useState } from "react";
// import Posts from "@/components/widgets/post";
// import Footer from "@/components/footer";
// import { NavbarSchema } from "@/components/schema";

// export default function Home() {
//    const navbarSchema = [
//       {
//          "@context": "https://schema.org",
//          "@type": "SiteNavigationElement",
//          name: "Ana Sayfa",
//          url: "https://emegen.com.tr/",
//       },
//       {
//          "@context": "https://schema.org",
//          "@type": "SiteNavigationElement",
//          name: "Giris Yap",
//          url: "https://emegen.com.tr/auth/login",
//       },
//       {
//          "@context": "https://schema.org",
//          "@type": "SiteNavigationElement",
//          name: "Kaydol",
//          url: "https://emegen.com.tr/auth/register",
//       },
//    ];

//    const [posts, setPosts] = useState([]);
//    useEffect(() => {
//       getExplore().then((res) => {
//          // console.log("res", typeof res);
//          if (typeof res === "undefined" || res === null) {
//             return;
//          }

//          if (res?.status !== 200) {
//             return;
//          }
//          setPosts([...(res?.data || [])]);
//       }).catch;
//    }, []);

//    return (
//       <>
//          <main className="w-full h-h-full mb-4 flex gap-8">
//             <section className="flex-1 mx-auto ">
//                <div className="w-full !pt-[30%] mb-4 !bg-secondary text-white main">
//                   {/* Premium masaüstü
//                   475 */}
//                </div>
//                <Posts posts={posts} />
//             </section>
//          </main>
//          <aside className=" min-w-96 lg:w-1/3 ">
//             {/* <div className="sticky top-0 z-50"> */}
//             {/* <Ad /> */}
//             <RecommendedPeopleWidget />
//             <Footer />
//             {/* </div> */}
//          </aside>
//          <NavbarSchema navbarSchema={navbarSchema} />
//       </>
//    );
// }

// export const metadata = {
//    title: "Emegen - Keşfet",
// };
