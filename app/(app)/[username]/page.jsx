import { getUserServices } from "@/services/services";
import ProfileServices from "@/components/widgets/profile/services";
import { useAuthUserName } from "@/hooks/auth";
import { ServiceSchema } from "@/components/schema/profile";

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
         <ProfileServices services={serviceList} isOwner={isOwner} />
         
         {serviceList.length > 0 &&
            serviceList.map((service) => (
               <ServiceSchema
                  key={service._id}
                  service={service} //
               />
            ))}
      </>
   );
}
