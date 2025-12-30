import { getUserServices } from "@/services/services";
import ProfileServices from "@/components/widgets/profile/services";
import { useAuthUserName } from "@/hooks/auth";
import { cleanUserName } from "@/utils/user";
import { BreadcrumbSchema } from "@/components/schema";

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
         <BreadcrumbSchema
            items={[
               {
                  name: `${cleanUsername}` || "Profile",
                  url: `/@${cleanUsername}`,
               },
               {
                  name: "Posts",
                  url: `/@${cleanUsername}/posts`,
               },
            ]}
         />
      </>
   );
}
