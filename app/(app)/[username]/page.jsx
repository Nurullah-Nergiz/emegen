import { getUserServices } from "@/services/services";
import ProfileServices from "@/components/widgets/profile/services";
import { useAuthUserName } from "@/hooks/auth";

export default async function Page({ params }) {
   const { username } = await params;
   const cleanUsername = username.replace(/%40/g, "").trim();

   const [services, authUser] = await Promise.all([
      getUserServices(cleanUsername),
      useAuthUserName(),
   ]);

   const isOwner = authUser === cleanUsername;

   return (
      <>
         <ProfileServices services={services?.data || []} isOwner={isOwner} />
      </>
   );
}
