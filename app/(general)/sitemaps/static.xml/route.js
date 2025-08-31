import { readdirSync } from "fs";
import { join } from "path";

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

   const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
         ${urls}
      </urlset>
   `;

   return new Response(sitemap, {
      headers: {
         "Content-Type": "application/xml",
      },
   });
}
