"use server";

import { MyTenders } from "@/components/widgets/tenders";
import { getInvitedTenderList } from "@/services/tender";

export default async function IncomingPage() {
   return (
      <main className="flex-1 flex flex-col gap-4">
         <MyTenders
            // initialData={tenders.data}
            isFilterActive={true}
         />
      </main>
   );
}
