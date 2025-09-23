import { readdirSync } from "fs";
import { join } from "path";
import js2xmlparser from "js2xmlparser";

export async function GET() {
   const baseUrl = "https://emgen.com.tr";

   // Example static routes, add more as needed
   const pagesDir = join(process.cwd(), "app/(app)");
   const files = readdirSync(pagesDir);
   const routes = files
      .filter(
         (file) =>
            !file.endsWith(".jsx") ||
            !file.endsWith(".js") ||
            !(file.startsWith("/[") || file.startsWith("]"))
      )
      .map((file) => `/${file.replace(/\.jsx?$/, "")}`);
   // Add more static routes if needed
   // For example, you can add:
   // routes.push("/about", "/contact", "/products", "/blog");

   //    const routes = [];
   console.log("routes", routes);

   const urls = [
      "/",
      "/auth/forgot-password",
      "/auth/register",
      "/terms",
      "/auth/login",
   ]
      .map(
         (route) => `
         <url>
            <loc>
                  ${baseUrl}${route}
            </loc>
            <lastmod>${route?.updatedAt || new Date().toISOString()}</lastmod>
            <priority>0.8</priority>
         </url>`
      )
      .join("");

   // const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
   //    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
   //       ${urls}
   //    </urlset>
   // `;

   // If you want to use a library for object to XML conversion, you can use js2xmlparser

   const sitemapObject = {
      urlset: {
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
      },
   };

   const sitemap = js2xmlparser.parse("urlset", sitemapObject.urlset);

   

   return new Response(sitemap, {
      headers: {
         "Content-Type": "application/xml",
      },
   });
}
