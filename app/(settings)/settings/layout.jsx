import { Header } from "@/components/header/index";
import { Nav } from "@/components/nav";

export const metadata = {
   title: "Settings - Emegen",
};

export default async function RootLayout({ children }) {
   const menu = {
      "Dış görünüş": [
         {
            icon: "bx bx-cog",
            text: "Genel ayarlar",
            link: "/settings/general",
         },
         {
            icon: "bx bx-palette",
            text: "Tema ayarları",
            link: "/settings/theme",
         },
         {
            icon: "",
            text: "",
            // link: "/settings/",
         },
      ],
      Hesap: [
         {
            icon: "bx bx-user",
            text: "Profili Düzenle",
            link: "/settings/edit-profile",
         },
         {
            icon: "bx bx-lock",
            text: "Şifre değiştir",
            link: "/settings/change-password",
         },
         {
            icon: "bx bx-shield",
            text: "Gizlilik ayarları",
            link: "/settings/privacy",
         },
         // {
         //    icon: "bx bx-bell",
         //    text: "Bildirim ayarları",
         //    link: "/settings/notifications",
         // },
      ],
      "": [
         // {},
         {
            icon: "bx bx-trash",
            text: "Hesabı Sil",
            link: "/settings/delete-account",
            className: "text-primary",
         },
      ],
   };
   return (
      <>
         <Nav menu={menu} prefix="/setting" />
         <section className="w-full flex-1">
            <Header />
            <section className="h-full px-8 flex gap-4">{children}</section>
         </section>
      </>
   );
}
