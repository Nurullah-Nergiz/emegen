// "use client";

import { ItemLink } from "@/components/nav/itemLink";
import Link from "next/link";
import { PrimaryBtn } from "@/components/btn";

export const metadata = {
   title: "Yeni Gönderi Oluştur",
   description: "Yeni gönderi oluşturma sayfası",
};

export default function NewPostPage({ children }) {
   const handleSubmit = (e) => {
      e.preventDefault();
      console.log("Gönderi gönderildi!");
   };

   return (
      <>
         <main className="w-full h-h-full mb-4 main flex flex-col gap-4">
            <h1 className="text-2xl font-bold whitespace-nowrap">
               Yeni gönderi oluştur
            </h1>
            <header className="py-2 px-4 bg-secondary">
               <div className="flex items-center gap-4">
                  {[
                     {
                        icon: "bx bx-image",
                        text: "post",
                        link: "/new-post",
                     },
                     {
                        icon: "bx bx-video",
                        text: "tender",
                        link: "/new-post/tender",
                     },
                     {
                        icon: "bx bx-bar-chart",
                        text: "poll",
                        link: "/new-post/poll",
                     },
                  ].map(({ icon, text, link }, index) => (
                     <Link
                        key={`new-post-link-${index}`}
                        href={link}
                        className="flex items-center gap-2 text-white"
                        title={text}>
                        <i className={icon + " text-2xl"}></i>
                        <span className="text-sm">{text}</span>
                     </Link>
                  ))}
               </div>
            </header>
            <main>{children}</main>
         </main>
      </>
   );
}
