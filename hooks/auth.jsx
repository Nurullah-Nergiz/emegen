"use server";
import Cookies from "js-cookie";
import { cookies } from "next/headers";

export default async function useAuthUser() {
   const cookieStore = await cookies();
   if (!cookieStore.get("user")?.value) return {};
   else return JSON.parse(cookieStore.get("user")?.value)?.user;
}

export async function useAuthToken() {
   if (typeof window === "undefined") {
      const cookieStore = await cookies();
      if (!cookieStore.get("auth-token")?.value) return null;
      else return JSON.parse(cookieStore.get("auth-token")?.value);
      
   } else {
      const token = Cookies.get("user");
      return token ? JSON.parse(token)?.authorization : "w";
   }
   // const cookieStore = cookies();
   // if (!cookieStore.get("user")?.value) return "";
   // else return cookieStore.get("user")?.value;
}

export async function useAuthUserId() {
   const cookieStore = await cookies();
   if (!cookieStore.get("user")?.value) return "";
   else return JSON.parse(cookieStore.get("user")?.value)?.user?._id || "";
}
