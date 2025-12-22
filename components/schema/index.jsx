export const NavbarSchema = ({ schema = [] }) => {
   return (
      <script
         type="application/ld+json"
         dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema, null, 2),
         }}
      />
   );
};

export const PostSchema = ({ post }) => {
   const postSchema = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: post.title,
      image: [post.image],
      author: {
         "@type": "Person",
         name: post.author.name,
      },
      publisher: {
         "@type": "Organization",
         name: "YourSiteName",
         logo: {
            "@type": "ImageObject",
            url: "https://yoursite.com/logo.png",
         },
      },
      datePublished: post.datePublished,
      dateModified: post.dateModified,
      description: post.description,
   };

   return (
      <script
         type="application/ld+json"
         dangerouslySetInnerHTML={{
            __html: JSON.stringify(postSchema, null, 2),
         }}
      />
   );
};

export const SearchActionSchema = () => {
   const searchActionSchema = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "Emegen",
      url: "https://emegen.com.tr/",
      potentialAction: {
         "@type": "SearchAction",
         target: "https://emegen.com.tr/search?q={search_term_string}",
         "query-input": "required name=search_term_string",
      },
   };

   return (
      <script
         type="application/ld+json"
         dangerouslySetInnerHTML={{
            __html: JSON.stringify(searchActionSchema, null, 2),
         }}
      />
   );
};
