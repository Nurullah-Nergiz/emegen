import { getUsers } from "@/services/user";
import convert from "xml-js";

export async function GET() {
   console.clear();

   // Fetch user data
   const { data: routes } = await getUsers();

   // Generate URL entries for the sitemap
   const urlEntries = routes?.flatMap((route) => {
      const baseUrl = `https://emgen.com.tr/@${route.userName}`;
      const lastmod = route?.updatedAt || new Date().toISOString();

      return [
         { loc: baseUrl, lastmod, priority: 0.9 },
         { loc: `${baseUrl}/tender`, lastmod, priority: 0.8 },
         { loc: `${baseUrl}/post`, lastmod, priority: 0.8 },
      ];
   });

   // Convert URL entries to XML format
   const sitemap = convert.js2xml(
      { urlset: { url: urlEntries } },
      { compact: true, ignoreComment: true, spaces: 4 }
   );

   // Return the sitemap as a response
   return new Response(sitemap, {
      headers: { "Content-Type": "application/xml" },
   });
}

// Ensure the sitemap is dynamically generated on each request
export const dynamic = "force-dynamic";
