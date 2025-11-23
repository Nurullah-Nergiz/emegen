"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const formatPrice = (price, currency) => {
   const options = {
      style: "currency",
      currency: currency || "TRY",
   };
   const formatter = new Intl.NumberFormat(
      navigator.language || navigator.userLanguage,
      options
   );

   if (price.type === "range") {
      return `${formatter.format(price.min)} - ${formatter.format(price.max)}`;
   }
   return formatter.format(price.value);
};

export default function ProfileServices({
   children,
   services = [],
   isOwner = false,
   moreButton = true,
}) {
   const pathname = usePathname();

   return (
      <>
         <div className="flex flex-col gap-4 w-full">
            <div className="flex justify-between items-center ">
               <h3 className="text-2xl font-bold mb-4">Hizmetler</h3>
               {moreButton && (
                  <Link
                     href={`${pathname}/services`}
                     className="text-primary hover:underline">
                     Hizmetleri Görüntüle
                  </Link>
               )}
            </div>
            <ul className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4">
               {services.length > 0 ? (
                  services.map((service, i) => (
                     <li
                        key={`service-${service?.id}-${i}`}
                        className="main !bg-accent flex gap-2  relative">
                        <i
                           className={`bx ${service.icon?.url} !text-5xl text-primary`}></i>
                        <div className="flex flex-col gap-1">
                           <b className="text-xl font-semibold ">
                              {service.title}
                           </b>
                           <p className="">{service.description}</p>
                           {service?.price && (
                              <span className="text-green-600 font-bold">
                                 {formatPrice(service.price, service.currency)}
                              </span>
                           )}
                        </div>
                        {isOwner ? (
                           <div className="absolute top-0 right-0 p-2">
                              <Link
                                 href={`${pathname}/services/${service._id}/edit`}
                                 className="text-sm text-primary hover:underline">
                                 Düzenle
                              </Link>
                              <button
                                 onClick={() =>
                                    alert(
                                       "Hizmet silme işlemi henüz uygulanmadı."
                                    )
                                 }
                                 className="ml-2 text-sm text-red-600 hover:underline">
                                 Sil
                              </button>
                           </div>
                        ) : (
                           <></>
                        )}
                     </li>
                  ))
               ) : (
                  <>
                     <div className="col-span-full text-center py-10">
                        <p className="text-gray-500">
                           Henüz bir hizmet eklenmemiş.
                        </p>
                     </div>
                  </>
               )}
            </ul>
         </div>
      </>
   );
}
