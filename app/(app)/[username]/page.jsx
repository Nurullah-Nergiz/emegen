
import { getUserServices } from "@/services/services";
import ProfileServices from "@/components/widgets/profile/services";

export default async function Page({ params }) {
   const { username } = await params;

   const [services] = await Promise.all([
      getUserServices(username.replace("%40", "")),
   ]);
   // console.log(services.data);
   

   return (
      <>
         <ProfileServices
            services={services.data || []}
         />
         
      </>
   );
}
