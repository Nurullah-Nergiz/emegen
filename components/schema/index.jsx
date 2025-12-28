export const SchemaScript = ({ schema }) => {
   return (
      <script
         type="application/ld+json"
         dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema, null, 2),
         }}
      />
   );
};

export const NavbarSchema = ({ schema = [] }) => {
   return <SchemaScript schema={schema} />;
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

   return <SchemaScript schema={postSchema} />;
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

   return <SchemaScript schema={searchActionSchema} />;
};

export const BreadcrumbSchema = ({ items = [] }) => {
   const breadcrumbItems = [
      {
         "@type": "ListItem",
         position: 1,
         name: "Ana Sayfa",
         item: "",
      },
      ...items,
   ].map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: {
         "@type": "WebPage",
         "@id": `https://emegen.com.tr/${item.url ?? ""}`,
      },
   }));

   const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      name: "Breadcrumb List",
      itemListElement: breadcrumbItems,
   };

   return <SchemaScript schema={breadcrumbSchema} />;
};

export const ItemListSchema = ({ items = [], name = "Item List" }) => {
   const itemListSchema = {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "@id": "https://www.emegen.com.tr/@alpaslan-bugday-insaat#profile-main-nav",
      name: name,
      itemListElement: items.map((item, index) => ({
         "@type": "ListItem",
         position: index + 1,
         url: item.url,
         name: item.name,
      })),
   };

   return <SchemaScript schema={itemListSchema} />;
};
