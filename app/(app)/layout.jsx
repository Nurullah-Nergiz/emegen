import { Header } from "@/components/header/index";
import { Nav } from "@/components/nav";
import useAuthUser from "@/hooks/auth";

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
      console.log("file: layout.jsx:55 => menu=>", menu);
   }

   return (
      <>
         <Nav menu={menu} />
         <section className="w-full px-10 flex-1 ">
            <Header />
            <section className="h-full sm:px-0 flex flex-col lg:flex-row gap-8">
               {children}
            </section>
         </section>
      </>
   );
}
