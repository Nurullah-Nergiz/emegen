import { getUserServices } from "@/services/services";
import ProfileServices from "@/components/widgets/profile/services";
import { useAuthUserName } from "@/hooks/auth";
import { BreadcrumbSchema } from "@/components/schema";

export default async function Page({ params }) {
   const { username } = await params;
   const cleanUsername = username.replace(/%40/g, "").trim();

   const [services, authUser] = await Promise.all([
      getUserServices(cleanUsername),
      useAuthUserName(),
   ]);

   const isOwner = authUser === cleanUsername;

   const serviceList = services?.data || [];

   return (
      <>
         <ProfileServices
            services={serviceList}
            isOwner={isOwner}
            emptyStateText={`${
               isOwner
                  ? "Henüz bir hizmet eklemediniz."
                  :  `@${cleanUsername} henüz bir hizmet eklememiş.`
            }`}
         />

         {/* <BreadcrumbSchema
            items={[
               {
                  name: `${cleanUsername}` || "Profile",
                  url: `/@${cleanUsername}`,
               },
            ]}
         /> */}
      </>
   );
}
