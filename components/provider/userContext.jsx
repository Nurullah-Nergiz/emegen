"use client";
import useAuthUser from "@/hooks/auth";
import { getMe, getUser } from "@/services/user";
import { createContext, useEffect, useState } from "react";

const userContext = createContext();

export const UserContextProvider = ({ children }) => {
   const [user, setUser] = useState({});

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
         {children}
      </userContext.Provider>
   );
};

export default userContext;
