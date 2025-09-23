export default function Portfolio({ items }) {
   if (!items || items.length === 0) {
      return <p>Portföy bulunamadı.</p>;
   }

   return (
      <section className="portfolio">
         <h2 className="text-xl font-bold mb-4">Portföy</h2>
         <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {items.map((item, index) => (
               <li key={index} className="portfolio-item">
                  {item.link ? (
                     <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer">
                        <img
                           src={item.image || "https://picsum.photos/200/300"}
                           alt={item.title || "Portfolio item"}
                           className="w-full h-40 object-cover rounded-md"
                        />
                        <h3 className="mt-2 text-lg font-semibold">
                           {item.title}
                        </h3>
                        <p className="text-sm text-gray-600">
                           {item.description}
                        </p>
                     </a>
                  ) : (
                     <>
                        <img
                           src={
                              item.image ||
                              "https://picsum.photos/200/300"
                           }
                           alt={item.title || "Portfolio item"}
                           className="w-full h-40 object-cover rounded-md"
                        />
                        <h3 className="mt-2 text-lg font-semibold">
                           {item.title}
                        </h3>
                        <p className="text-sm text-gray-600">
                           {item.description}
                        </p>
                     </>
                  )}
               </li>
            ))}
         </ul>
      </section>
   );
}
