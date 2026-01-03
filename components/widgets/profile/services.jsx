"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { deleteUserService } from "@/services/services";

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
   emptyStateText = "Henüz bir hizmet eklenmemiş.",
   isOwner = false,
   moreButton = true,
}) {
   const pathname = usePathname().split("/")[1];

   return (
      <>
         <div id="profile-services" className="flex flex-col gap-4 w-full">
            <div className="flex justify-between items-center border-b border-current">
               <h3 className="w-full text-2xl font-bold mb-4 ">Hizmetler</h3>
               {moreButton ? (
                  <Link
                     href={`/${pathname}/services`}
                     className="text-primary hover:underline whitespace-nowrap">
                     Hizmetleri Görüntüle
                  </Link>
               ) : isOwner && services.length > 0 ? (
                  <Link
                     href={`/${pathname}/services/new`}
                     className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark whitespace-nowrap">
                     Yeni Hizmet Ekle
                  </Link>
               ) : null}
            </div>
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
               {services.length > 0 ? (
                  services.map((service, i) => {
                     const priceString = formatPrice(
                        service.price,
                        service.currency
                     );
                     return (
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
                              {service.price?.value !== 0 && (
                                 <span className="text-green-600 font-bold">
                                    {priceString}
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
                                    onClick={async () =>
                                       await deleteUserService(service._id)
                                    }
                                    className="ml-2 text-sm text-red-600 hover:underline">
                                    Sil
                                 </button>
                              </div>
                           ) : (
                              <></>
                           )}
                        </li>
                     );
                  })
               ) : (
                  <>
                     <div className="col-span-full flex flex-col items-center justify-center py-10 text-center">
                        <svg
                           className="w-16 h-16 text-gray-300 mb-4"
                           fill="none"
                           stroke="currentColor"
                           viewBox="0 0 24 24"
                           xmlns="http://www.w3.org/2000/svg">
                           <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"></path>
                        </svg>
                        <p className="text-gray-500">
                           {emptyStateText}
                        </p>
                        {isOwner ? (
                           <>
                              <Link
                                 href={`/${pathname}/services/new`}
                                 className="mt-4 px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark whitespace-nowrap">
                                 Yeni Hizmet Ekle
                              </Link>
                           </>
                        ) : null}
                     </div>
                  </>
               )}
            </ul>
         </div>
      </>
   );
}
