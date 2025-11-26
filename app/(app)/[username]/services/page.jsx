import { getUserServices } from "@/services/services";
import Link from "next/link";
import ProfileServices from "@/components/widgets/profile/services";
import { useAuthUserName } from "@/hooks/auth";
import { cleanUserName } from "@/utils/user";

export default async function ServicesPage({ params }) {
   console.clear();
   const { username } = await params;
   const cleanUsername = cleanUserName(username);

   const [services, authUser] = await Promise.all([
      getUserServices(cleanUsername),
      useAuthUserName(),
   ]);

   const isOwner = authUser === cleanUsername;
   
   

   return (
      <>
         <ProfileServices
            services={services.data || []}
            isOwner={isOwner}
            moreButton={false}
         />
      </>
   );
}
