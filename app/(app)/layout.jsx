import { Header } from "@/components/header/index";
import { Nav } from "@/components/nav";
import useAuthUser from "@/hooks/auth";
import { Suspense } from "react";

export default async function RootLayout({ children }) {
   const user = await useAuthUser();
   const isAuthenticated = user && typeof user?._id === "string" ? true : false;

   const menu = {
      Menu: [
         {
            icon: "bx bx-home-alt-2",
            text: "Göz atmak",
            link: "/",
         },
         {
            icon: "bx bx-plus-circle",
            text: "Yeni gönderi",
            link: "/new-post",
         },
         {
            icon: "bx bx-gift",
            text: "Teklifler",
            link: "/tenders",
         }, 
         {
            icon: "bx bx-bar-chart-alt-2",
            text: "Analitik",
            link: "/analytics",
         },
         {
            icon: "bx bx-bookmark",
            text: "Yer işareti",
            link: "/bookmarks",
         },
      ],
      Genel: [
         {
            icon: "bx bx-user",
            text: "Profil",
            link: `/@${user?.userName}`,
         },
         {
            icon: "bx bx-cog",
            text: "Ayarlar ve Gizlilik",
            link: "/settings",
         },
         {
            icon: "bx bx-log-out",
            text: "Oturumu kapat",
            link: "auth/logout",
         },
      ],
   };

   if (!isAuthenticated) {
      menu.Genel = undefined;
      delete menu.Genel;
   }

   return (
      <>
         <Nav menu={menu} />
         <section className="w-full pb-20 sm:pb-0 flex-1 ">
            <Header />
            <section className="h-full sm:px-10 px-10 flex flex-col lg:flex-row gap-6">
            <Suspense>{children}</Suspense>
               
            </section>
         </section>
      </>
   );
}
