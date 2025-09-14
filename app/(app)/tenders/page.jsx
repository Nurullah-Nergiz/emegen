import { getTenders } from "@/services/tender.js";
import { PrimaryBtn, SecondaryBtn } from "@/components/btn";
import Link from "next/link";
import Tenders from "@/components/widgets/tenders";

export default async function ({}) {
   // Fetch tenders data from the server
   const { data: fetchedTenders = [] } = await getTenders();

   
   return (
      <>
         <main className="flex-1 flex flex-col gap-4">
            <Tenders data={fetchedTenders} isFilterActive={true}></Tenders>
         </main>
         {/* <aside className="main min-w-96">
            {Object.entries(filter).map(([key, value]) => (
               <div key={key + "-" + value}>
                  <b>{key}:</b>
                  <span>{value}</span>
               </div>
            ))}
         </aside> */}
      </>
   );
}

export const metadata = {
   title: "Tenders - Emegen",
   description: "Tenders page",
   keywords: ["tenders", "offers", "bids"],
   openGraph: {
      title: "Tenders",
      description: "Tenders page",
      url: "/tenders",
     
   },
   alternates: {
      canonical: "/tenders",
   },
};