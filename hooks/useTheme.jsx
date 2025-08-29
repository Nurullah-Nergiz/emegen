"use server";
import { cookies } from "next/headers";
import { Cookies } from "js-cookie";

export default async function useTheme() {
   if (typeof window !== "undefined") {
      return Cookies.get("theme");
   } else {
      const cookieStore = await cookies();
      const theme = cookieStore.get("theme")?.value;
      return theme ?? "system";
   }
}
