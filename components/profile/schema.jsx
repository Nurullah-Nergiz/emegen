export default function ProfileSchemas({ user = {} }) {
   const navSchema = [
      // {
      //    "@context": "https://schema.org",
      //    "@type": "SiteNavigationElement",
      //    name: "Ana Sayfa",
      //    url: "https://www.emegen.com.tr/",
      // },
      {
         "@context": "https://schema.org",
         "@type": "SiteNavigationElement",
         name: "Profil",
         url: `https://www.emegen.com.tr/@${user?.userName}`,
      },
      {
         "@context": "https://schema.org",
         "@type": "SiteNavigationElement",
         name: "Posts",
         url: `https://www.emegen.com.tr/@${user?.userName}/posts`,
      },
      {
         "@context": "https://schema.org",
         "@type": "SiteNavigationElement",
         name: "Tenders",
         url: `https://www.emegen.com.tr/@${user?.userName}/tenders`,
      },
      {
         "@context": "https://schema.org",
         "@type": "SiteNavigationElement",
         name: "Hakkında",
         url: `https://www.emegen.com.tr/@${user?.userName}/about`,
      },
   ];

   const businessSchema = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      ...(user?.name && { name: user.name }),
      ...(user?.userName && {
         url: `https://www.emegen.com.tr/@${user.userName}`,
      }),
      ...(user?.profilePicture && {
         logo: user.profilePicture.startsWith("http")
            ? user.profilePicture
            : `http://cdn.emegen.com.tr/${String(user.profilePicture).replace(
                 /^\/+/,
                 ""
              )}`,
      }),
      ...(user?.coverPicture && {
         image: user?.coverPicture.startsWith("http")
            ? user.coverPicture
            : `http://cdn.emegen.com.tr/${String(user.coverPicture).replace(
                 /^\/+/,
                 ""
              )}`,
      }),
      ...(user?.bio && { description: user.bio }),
      ...(Array.isArray(user?.phoneNumbers) &&
         user.phoneNumbers[0] && { telephone: user.phoneNumbers[0] }),
      ...(user?.email && { email: user?.publicEmail }),
      ...(user?.location &&
         typeof user.location === "object" && {
            address: {
               "@type": "PostalAddress",
               ...(user.location?.street && {
                  streetAddress: user.location?.street,
               }),
               ...(user.location?.city && {
                  addressLocality: user.location?.city,
               }),
               ...(user.location?.region && {
                  addressRegion: user.location?.district,
               }),
               ...(user.location?.postalCode && {
                  postalCode: user.location?.zipCode,
               }),
               ...(user.location?.country && {
                  addressCountry: user.location?.country,
               }),
            },
         }),
      ...(user?.location &&
         typeof user.location === "object" &&
         (user.location?.latitude || user.location?.longitude) && {
            geo: {
               "@type": "GeoCoordinates",
               ...(user.location?.latitude != null && {
                  latitude: user.location.latitude,
               }),
               ...(user.location?.longitude != null && {
                  longitude: user.location.longitude,
               }),
            },
         }),
      ...((Array.isArray(user?.socialLinks) && user.socialLinks.length > 0) ||
      (Array.isArray(user?.websites) && user.websites.length > 0)
         ? {
              sameAs:
                 Array.isArray(user.socialLinks) && user.socialLinks.length > 0
                    ? user.socialLinks
                    : user.websites,
           }
         : {}),
      ...(user?.openingHours && { openingHours: user.openingHours }),
      priceRange: user.priceRange || "try",
      ...(user?.paymentMethods && { paymentAccepted: user.paymentMethods }),
   };

   return (
      <>
         {/* Structured Data */}
         <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(businessSchema) }}
         />
         {navSchema.map((item, index) => (
            <script
               key={index}
               type="application/ld+json"
               dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
            />
         ))}
         {/* End Structured Data */}
      </>
   );
}
