import { UserContextProvider } from "@/components/provider/userContext";
// "use client";

export default async function RootLayout({ children }) {
   console.clear();
   // const [user, setUser] = useContext(userContextProvider);

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
