import { UserContextProvider } from "@/components/provider/userContext";
import { useAuthUserId } from "@/hooks/auth";
import { redirect } from "next/navigation";

export default async function RootLayout({ children }) {
   console.clear();

   const id = await useAuthUserId();
   if (!id) {
      redirect("/auth/login");
   }

   return (
      <>
         <section className="w-full h-full flex flex-col lg:flex-row gap-6 relative pt-8">
            <UserContextProvider>
               {/*  */}
               {children}
            </UserContextProvider>
         </section>
      </>
   );
}

export const metadata = {
   title: "Ayarlar",
   description: "Hesap ayarlarınızı buradan yapabilirsiniz.",
};
