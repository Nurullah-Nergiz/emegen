import useAuthUser from "@/hooks/auth";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
   const user = await useAuthUser();
   redirect(`/${"@" + user.userName ?? "auth/login"}`);
   return null;
}
