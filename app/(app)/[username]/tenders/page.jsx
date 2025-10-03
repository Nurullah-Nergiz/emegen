import { getTender } from "@/services/tender";
import { getUserTenders } from "@/services/user";
import Tenders from "@/components/widgets/tenders";

export async function generateMetadata({ params }) {
   const { username } = await params;
   return {
      alternates: {
         canonical: `https://emegen.com.tr/@${username.trim()}/tenders`,
      },
   };
}

export default async function TendersPage({ params }) {
   // Promise.all([params]).then(([{ username }]) => {
   //    console.clear();
   //    getUserTenders(username.split("/")[0].replace(/%40/g, "").trim())
   //       .then(({ status, data: tenders }) => {
   //          console.log("file: page.jsx:7 => tenders=>", tenders);
   //       })
   //       .catch((error) => {
   //          console.error("Error fetching tenders:", error);
   //       });
   // });

   const { username } = await params;
   console.clear();
   if (!username) {
   }
   const { status, data: tenders } = await getUserTenders(
      username.split("/")[0].replace(/%40/g, "").trim()
   );
   // console.log("file: page.jsx:7 => tenders=>", tenders);
   if (status !== 200) {
   }

   return (
      <>
         <section className="">
            <Tenders data={tenders} />
         </section>
      </>
   );
}
