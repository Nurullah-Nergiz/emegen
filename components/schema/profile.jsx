import { SchemaScript } from ".";

export const ProfileSchema = ({ user }) => {
   const { name, jobTitle, image, description } = user;
   const schemaData = {
      "@context": "https://schema.org",
      "@type": "ProfilePage",
      mainEntity: {
         "@type": "Person",
         name: name,
         jobTitle: jobTitle,
         image: image,
         description: description,
      },
   };

   return <SchemaScript schema={schemaData} />;
};

export const ServiceSchema = ({ service }) => {
   const schemaData = {
      "@context": "https://schema.org",
      "@type": "Service",
      name: service?.name,
      description: service?.description,
      provider: {
         "@type": service?.user?.buisnessType || "LocalBusiness",
         name: service?.user?.name,
         url: `https://emegen.com.tr/@${service?.user?.userName}`,
      },
      areaServed: {
         "@type": "City",
         name: service?.user?.address?.city || "Unknown City",
      },
   };

   return <SchemaScript schema={schemaData} />;
};
