// import { useRouter } from "next/navigation";
import { UserContextProvider } from "@/components/provider/userContext";

export default async function RootLayout({ children }) {
   console.clear();

   // const router = useRouter();

   // console.log("Settings Layout Router:", router);

   return (
      <>
         <UserContextProvider>
            {/*  */}
            {children}
         </UserContextProvider>
      </>
   );
}

export const metadata = {
   title: "Ayarlar",
   description: "Hesap ayarlarınızı buradan yapabilirsiniz.",
};
