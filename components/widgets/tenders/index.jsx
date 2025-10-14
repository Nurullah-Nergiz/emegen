"use client";

import TenderList from "@/components/widgets/tenders/TenderList";
import { getInvitedTenderList } from "@/services/tender";
import { useEffect, useState } from "react";

export default function ({ isFilterActive = false, initialData = [] }) {
   console.log(initialData);

   return (
      <>
         <TenderList
            initialData={initialData}
            isFilterActive={isFilterActive}
         />
      </>
   );
}

export function MyTenders({ isFilterActive = false, initialData = [] }) {
   const [tenders, setTenders] = useState(initialData || []);

   useEffect(() => {
      getInvitedTenderList().then((res) => {
         setTenders([...res.data] || []);
         // console.log(res.data);
      });
   }, []);

   return (
      <>
         <TenderList
            initialData={tenders}
            isFilterActive={isFilterActive || true}
         />
      </>
   );
}
