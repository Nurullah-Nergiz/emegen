import { ItemListSchema, SchemaScript } from ".";

export const ProfileSchemas = ({ user = {} }) => {
   const businessSchema = {
      "@context": "https://schema.org",
      "@graph": [
         {
            "@type": user?.businessType || "LocalBusiness",
            "@id": `https://emegen.com.tr/@${user?.userName}#business`,
            ...(user?.name && { name: user.name }),
            ...(user?.userName && {
               url: `https://emegen.com.tr/@${user.userName}`,
            }),
            ...(user?.profilePicture && {
               logo: user.profilePicture.startsWith("http")
                  ? user.profilePicture
                  : `https://cdn.emegen.com.tr/${String(
                       user.profilePicture
                    ).replace(/^\/+/, "")}`,
            }),
            ...(user?.coverPicture && {
               image: user?.coverPicture.startsWith("http")
                  ? user.coverPicture
                  : `https://cdn.emegen.com.tr/${String(
                       user.coverPicture
                    ).replace(/^\/+/, "")}`,
            }),
            ...(user?.bio && { description: user.bio }),
            ...(Array.isArray(user?.phoneNumbers) &&
               user.phoneNumbers[0] && { telephone: user.phoneNumbers[0] }),
            ...(user?.email && { email: user?.publicEmail }),
            ...(user?.address &&
               typeof user.address === "object" && {
                  address: {
                     "@type": "PostalAddress",
                     ...(user.address?.streetAddress && {
                        streetAddress: user.address.streetAddress,
                     }),
                     ...(user.address?.city && {
                        addressLocality: user.address.city,
                     }),
                     ...(user.address?.state && {
                        addressRegion: user.address.state,
                     }),
                     ...(user.address?.postalCode && {
                        postalCode: user.address.postalCode,
                     }),
                     ...(user.address?.country && {
                        addressCountry: user.address.country,
                     }),
                  },
               }),
            ...(Array.isArray(user?.workingHours) &&
               user.workingHours.length > 0 && {
                  openingHoursSpecification: user.workingHours.map((hours) => ({
                     "@type": "OpeningHoursSpecification",
                     dayOfWeek: hours.dayOfWeek,
                     opens: hours.opens,
                     closes: hours.closes,
                  })),
               }),
            ...(Array.isArray(user?.services) &&
               user.services.length > 0 && {
                  hasOfferCatalog: {
                     "@type": "OfferCatalog",
                     name: "Services",
                     itemListElement: user.services.map((service) => ({
                        "@type": "Offer",
                        itemOffered: {
                           "@type": "Service",
                           name: service.title,
                           description: service.description,
                           areaServed: {
                              "@type": "City",
                              name: user?.address?.city || "Unknown City",
                           },
                           provider: {
                              "@id": `https://emegen.com.tr/@${user?.userName}#business`,
                           },
                        },
                     })),
                  },
               }),
         },
      ],
   };

   return (
      <>
         <SchemaScript schema={businessSchema} />
         <ItemListSchema
            name="Profil Menüsü"
            items={[
               {
                  name: "Profil",
                  url: "https://emegen.com.tr/@alpaslan-bugday-insaat",
               },
               {
                  name: "Gönderiler",
                  url: "https://emegen.com.tr/@alpaslan-bugday-insaat/posts",
               },
               {
                  name: "Teklifler",
                  url: "https://emegen.com.tr/@alpaslan-bugday-insaat/tenders",
               },
               {
                  name: "Hakkında",
                  url: "https://emegen.com.tr/@alpaslan-bugday-insaat/about",
               },
            ]}
         />
      </>
   );
};
