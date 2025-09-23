import { getUsers } from "@/services/user";
import js2xmlparser from "js2xmlparser";

export async function GET() {
   // Example static routes, add more as needed
   console.clear();
   const { data: routes } = await getUsers();

   const urlEntries = routes
      ?.map((route) => {
         const baseUrl = `https://emgen.com.tr/@${route.userName}`;
         return [
            {
               loc: baseUrl,
               lastmod: route?.updatedAt || new Date().toISOString(),
               priority: 0.9,
            },
            {
               loc: `${baseUrl}/tender`,
               lastmod: route?.updatedAt || new Date().toISOString(),
               priority: 0.8,
            },
            {
               loc: `${baseUrl}/post`,
               lastmod: route?.updatedAt || new Date().toISOString(),
               priority: 0.8,
            },
         ];
      })
      .flat();

   const sitemap = js2xmlparser.parse("urlset", urlEntries);

   return new Response(sitemap, {
      headers: {
         "Content-Type": "application/xml",
      },
   });
}

// This ensures the sitemap is always generated fresh on each request
export const dynamic = "force-dynamic";
