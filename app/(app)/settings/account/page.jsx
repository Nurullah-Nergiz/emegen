"use client";
import userContext  from "@/components/provider/userContext";
import { use } from "react";

export default function AccountPage() {
   const [user, setUser] = use(userContext);

   console.log("user from context in account page=>", user);
   

   return <>account page</>;
}
