"use server";
import { cookies } from "next/headers";

export default async function useAuthUser() {
   const cookieStore = await cookies();
   if (!cookieStore.get("user")?.value) return {};
   else return JSON.parse(cookieStore.get("user")?.value)?.user;
}

export async function useAuthToken() {
   const cookieStore = await cookies();
   if (!cookieStore.get("user")?.value) return "";
   else return cookieStore.get("user")?.value;
}

export async function useAuthUserId() {
   const cookieStore = await cookies();
   if (!cookieStore.get("user")?.value) return "";
   else return JSON.parse(cookieStore.get("user")?.value)?.user?._id || "";
}
