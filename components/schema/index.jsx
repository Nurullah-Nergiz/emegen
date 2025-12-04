export const NavbarSchema = ({ schema=[] }) => {
   return (
      <script
         type="application/ld+json"
         dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema, null, 2),
         }}
      />
   );
};
