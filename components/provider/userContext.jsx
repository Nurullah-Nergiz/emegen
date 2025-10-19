"use client";
import useAuthUser from "@/hooks/auth";
import { getMe } from "@/services/user";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createContext, useEffect, useState } from "react";

const userContext = createContext();

export const UserContextProvider = ({ children }) => {
   const [user, setUser] = useState({});

   const pathName = usePathname();

   useEffect(() => {
      Promise.all([useAuthUser()]).then(([user]) => {
         if (!user?.userName) return;

         getMe(user?.userName || "").then((userData) => {
            setUser(userData.data.user || {});
         });
      });
   }, []);

   return (
      <userContext.Provider value={[user, setUser]}>
         {pathName !== "/settings" ? (
            <Link href="/settings" className="underline">
               Ayarlara Geri Dön
            </Link>
         ) : (
            ""
         )}
         {children}
      </userContext.Provider>
   );
};

export default userContext;
