import { getUser, getUsers } from "@/services/user";

export async function GET() {
   const baseUrl = "https://emgen.com.tr/";

   // Example static routes, add more as needed
   console.clear();
   const { data: routes } = await getUsers();
   console.log(routes);

//    const routes = [""];

   const urls = routes
      ?.map(
         (route) => `
            <url>
                <loc>${baseUrl}@${route.userName}</loc>
                <changefreq>weekly</changefreq>
                <priority>0.8</priority>
            </url>`
      )
      .join("");

   const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
            ${urls}
        </urlset>`;

   return new Response(sitemap, {
      headers: {
         "Content-Type": "application/xml",
      },
   });
}
