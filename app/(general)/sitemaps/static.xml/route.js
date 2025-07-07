import { readdirSync } from "fs";
import { join } from "path";

export async function GET() {
   // const baseUrl = "https://emgen.com.tr/";

   // // Example static routes, add more as needed
   // const pagesDir = join(process.cwd(), "app/(app)");
   //  const files = readdirSync(pagesDir);
   //  const routes = files
   //      .filter((file) => !file.endsWith(".jsx") || !file.endsWith(".js")|| file.endsWith("]"))
   // .map((file) => `/${file.replace(/\.jsx?$/, "")}`);
   // Add more static routes if needed
   // For example, you can add:
   // routes.push("/about", "/contact", "/products", "/blog");

   //    const routes = [];

   // const urls = routes
   //    .map(
   //       (route) => `
   //          <url>
   //              <loc>${baseUrl}${route}</loc>
   //              <changefreq>weekly</changefreq>
   //              <priority>0.8</priority>
   //          </url>`
   //    )
   //    .join("");
   // ${urls}

   const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
            <url>
               <loc>https://emegen.com.tr/</loc>
               <changefreq>weekly</changefreq>
               <lastmod>${new Date().toISOString()}</lastmod>
               <priority>1.0</priority>
            </url>
            <url>
               <loc>https://emegen.com.tr/auth/login</loc>   
               <changefreq>weekly</changefreq>
               <lastmod>${new Date().toISOString()}</lastmod>
               <priority>0.8</priority>
            </url>
            <url>
               <loc>https://emegen.com.tr/auth/register</loc>
               <changefreq>weekly</changefreq>
               <lastmod>${new Date().toISOString()}</lastmod>
               <priority>0.8</priority>
            </url>
            
        </urlset>`;

   return new Response(sitemap, {
      headers: {
         "Content-Type": "application/xml",
      },
   });
}
