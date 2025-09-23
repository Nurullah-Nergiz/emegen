import js2xmlparser from "js2xmlparser";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://emegen.com.tr";
export function GET() {
   const sitemapObject = {
      "@": {
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
   };

   const sitemap = js2xmlparser.parse("urlset", sitemapObject);

   return new Response(sitemap, {
      headers: {
         "Content-Type": "application/xml",
      },
   });
}
