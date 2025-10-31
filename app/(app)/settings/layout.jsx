// import { useRouter } from "next/navigation";
import { UserContextProvider } from "@/components/provider/userContext";

export default async function RootLayout({ children }) {
   console.clear();

   // const router = useRouter();

   // console.log("Settings Layout Router:", router);

   return (
      <>
         {/* <section className="w-full  px-4 py-6"> */}
            <UserContextProvider>
               {/*  */}
               {children}
            </UserContextProvider>
         {/* </section> */}
      </>
   );
}

export const metadata = {
   title: "Ayarlar",
   description: "Hesap ayarlarınızı buradan yapabilirsiniz.",
};
