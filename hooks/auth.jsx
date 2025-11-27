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
      const token = Cookies.get("auth-token");
      return token ? JSON.parse(token) : "";
   }
   // const cookieStore = cookies();
   // if (!cookieStore.get("user")?.value) return "";
   // else return cookieStore.get("user")?.value;
}

export async function useAuthUserId() {
   const { _id } = await useAuthUser();
   return _id || "";
}

export async function useIsAuthUser() {
   const user = await useAuthUser();
   return Boolean(user && Object.keys(user).length > 0);
}

export async function useAuthUserName() {
   const { name } = await useAuthUser();
   return name || "";
}

export async function useSetAuthUser(user, token) {
   const cookieStore = await cookies();
   cookieStore.set("user", JSON.stringify(user));
   if (token) {
      cookieStore.set("auth-token", JSON.stringify(token));
   }
}
export async function useRemoveAuthUser() {
   const cookieStore = await cookies();
   cookieStore.delete("user");
   cookieStore.delete("auth-token");
}
