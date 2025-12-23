import { getUserTenders } from "@/services/user";
import TenderList from "@/components/widgets/tenders/TenderList";
import { cleanUserName } from "@/utils/user";

export async function generateMetadata({ params }) {
   const { username } = await params;
   return {
      alternates: {
         canonical: `https://emegen.com.tr/@${cleanUserName(username)}tenders`,
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
   // if (status !== 200) {
   // }

   return (
      <>
         <section className="">
            <TenderList
               initialData={tenders}
               mode="user"
               username={cleanUserName(username)}
               isFilterActive={true}
            />
         </section>
      </>
   );
}
