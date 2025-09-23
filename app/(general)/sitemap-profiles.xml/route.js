import { getUsers } from "@/services/user";
import convert from "xml-js";

export async function GET() {
   console.clear();

   // Fetch user data
   const { data: routes } = await getUsers();

   const generateProfileUrl = (userName) =>
      encodeURI(`https://emgen.com.tr/@${userName}`);

   // Generate URL entries for the sitemap
   // const urlEntries = routes?.flatMap((route) => {
   //    const lastmod = route?.updatedAt || new Date().toISOString();

   //    return [
   //       { loc: generateProfileUrl(route.userName), lastmod, priority: 0.9 },
   //       {
   //          loc: generateProfileUrl(`${route.userName}/tenders`),
   //          lastmod,
   //          priority: 0.8,
   //       },
   //       {
   //          loc: generateProfileUrl(`${route.userName}/posts`),
   //          lastmod,
   //          priority: 0.8,
   //       },
   //    ];
   // });

   const sitemapObject = {
      urlset: {
         _attributes: {
            xmlns: "http://www.sitemaps.org/schemas/sitemap/0.9",
         },

         url: routes?.flatMap((route) => {
            const lastmod = route?.updatedAt || new Date().toISOString();

            return [
               {
                  loc: generateProfileUrl(route.userName),
                  lastmod,
                  priority: 0.9,
               },
               {
                  loc: generateProfileUrl(`${route.userName}/tenders`),
                  lastmod,
                  priority: 0.8,
               },
               {
                  loc: generateProfileUrl(`${route.userName}/posts`),
                  lastmod,
                  priority: 0.8,
               },
            ];
         }),
      },
   };

   // Convert URL entries to XML format
   const sitemap = convert.js2xml(sitemapObject, {
      compact: true,
      ignoreComment: true,
      spaces: 4,
   });

   // Return the sitemap as a response
   return new Response(sitemap, {
      headers: { "Content-Type": "application/xml" },
   });
}

// Ensure the sitemap is dynamically generated on each request
export const dynamic = "force-dynamic";
