import convert from "xml-js";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://emegen.com.tr";

const paths = [
   "/",
   "/auth/forgot-password",
   "/auth/register",
   "/terms",
   "/auth/login",
   "/favicon.ico",
];

export function GET() {
   console.clear();

   const now = new Date().toISOString();

   const urlEntries = paths.map((path) => ({
      loc: `${baseUrl}${path}`,
      lastmod: now,
      priority: 0.8,
   }));

   const sitemapObject = {
      urlset: {
         _attributes: {
            xmlns: "http://www.sitemaps.org/schemas/sitemap/0.9",
         },
         url: urlEntries,
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
