import { getUsers } from "@/services/user";

export async function GET() {
   const baseUrl = "https://emgen.com.tr/";

   // Example static routes, add more as needed
   console.clear();
   const { data: routes } = await getUsers();
   // console.log(routes);

   //    const routes = [""];

   const urls = routes
      ?.map((route) => {
         const userBase = `${baseUrl}@${route.userName}`;
         return `
         <url>
            <loc>${userBase}</loc>
            <lastmod>${route?.updatedAt || new Date().toISOString()}</lastmod>
            <priority>0.9</priority>
         </url>
         <url>
            <loc>${userBase}/tender</loc>
            <lastmod>${route?.updatedAt || new Date().toISOString()}</lastmod>
            <priority>0.8</priority>
         </url>
         <url>
            <loc>${userBase}/post</loc>
            <lastmod>${route?.updatedAt || new Date().toISOString()}</lastmod>
            <priority>0.8</priority>
         </url>`;
      }) 
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

// This ensures the sitemap is always generated fresh on each request
export const dynamic = "force-dynamic";