import { getUserServices } from "@/services/services";
import Link from "next/link";

export default async function ServicesPage({ params }) {
   const { username } = await params;
   const isOwner = true;

   const { data: services = [] } = await getUserServices(
      username.replace("%40", "")
   );

   return (
      <div className="container mx-auto px-4 py-8">
         <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold">Services</h1>
            {isOwner && (
               <Link
                  href={`/@${username.replace
                     ("%40", "")
                  }/services/new`}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  Add New Service
               </Link>
            )}
         </div>
         {services.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               {services.map((service, i) => (
                  <div
                     key={`service-${service?._id}-${i}`}
                     className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 relative">
                     {isOwner && (
                        <div className="absolute top-4 right-4 flex gap-2">
                           <Link
                              href={`/${username}/services/${service._id}/edit`}
                              className="text-sm bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-1 px-2 rounded">
                              Update
                           </Link>
                           <Link
                              href={`/${username}/services/${service._id}/delete`}
                              className="text-sm bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded">
                              Delete
                           </Link>
                        </div>
                     )}
                     <h2 className="text-2xl font-semibold mb-3 text-gray-800 pt-8">
                        {service.title}
                     </h2>
                     <p className="text-gray-600">{service.description}</p>
                  </div>
               ))}
            </div>
         ) : (
            <p className="text-center text-gray-500">
               No services are offered by {username} at the moment.
            </p>
         )}
      </div>
   );
}
