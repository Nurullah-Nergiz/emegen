"use client";

export default function ProfileServices({ children, services = [] }) {
   return (
      <>
         <div className="">
            <h3 className="text-2xl font-bold mb-4">Hizmetler</h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
               {services.length > 0 ? (
                  services.map((service) => (
                     <li
                        key={service.id}
                        className="p-4 flex gap-2  rounded-lg shadow hover:shadow-lg transition">
                        <i className={`${service.icon.url} !text-2xl`}></i>
                        <div className="">
                           <b className="text-xl font-semibold mb-2">
                              {service.title}
                           </b>
                           <p className="mb-4 text-accent">
                              {service.description}
                           </p>
                           {service?.price && (
                              <span className="text-green-600 font-bold">
                                 {service.price} USD
                              </span>
                           )}
                        </div>
                     </li>
                  ))
               ) : (
                  <p className="text-gray-500">Ez da hiztmetzik aurkitu.</p>
               )}
            </ul>
         </div>
      </>
   );
}
