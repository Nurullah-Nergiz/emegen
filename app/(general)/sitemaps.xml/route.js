import convert from "xml-js";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://emegen.com.tr";
export function GET() {
   console.clear();

   const sitemapObject = {
      urlset: {
         _attributes: {
            xmlns: "http://www.sitemaps.org/schemas/sitemap/0.9",
         },

         url: [
            {
               loc: `${baseUrl}/`,
               lastmod: new Date().toISOString(),
               priority: 0.8,
            },
            {
               loc: `${baseUrl}/auth/forgot-password`,
               lastmod: new Date().toISOString(),
               priority: 0.8,
            },
            {
               loc: `${baseUrl}/auth/register`,
               lastmod: new Date().toISOString(),
               priority: 0.8,
            },
            {
               loc: `${baseUrl}/terms`,
               lastmod: new Date().toISOString(),
               priority: 0.8,
            },
            {
               loc: `${baseUrl}/auth/login`,
               lastmod: new Date().toISOString(),
               priority: 0.8,
            },
         ],
      },
   };

   const sitemap = convert.js2xml(sitemapObject, {
      compact: true,
      ignoreComment: true,
      spaces: 4,
   });

   return new Response(sitemap, {
      headers: {
         "Content-Type": "application/xml",
      },
   });
}
