"use client";

import TenderList from "@/components/widgets/tenders";
import { getTenders } from "@/services/tender";
import { useEffect, useState } from "react";
import { PrimaryBtn, SecondaryBtn } from '@/components/btn';

export default function RequestPage() {
   const [tenders, setTenders] = useState([]);
   useEffect(() => {
      getTenders()
         .then((response) => {
            setTenders(Array.isArray(response.data) ? response.data : []);
         })
         .catch((error) => {
            console.error("Error fetching tenders:", error);
         });
   }, []);

   return (
      <>
         <main>
            <h1 className="text-2xl font-bold mb-4">Tüm İhaleler </h1>
            
            <div className="flex justify-between items-center mb-6">
               <span className="text-lg font-medium">Yeni İhaleler</span>
               <PrimaryBtn>
                  Yeni İhale Ekle
               </PrimaryBtn>
            </div>
            
            {Array.isArray(tenders) && tenders.length > 0
               ? tenders.map((tender, i) => (
                  <Tender tender={tender} key={tender._id + "-" + i}>
                     <SecondaryBtn>
                       Seç
                     </SecondaryBtn>
                    </Tender>
                 ))
               : null}
         </main>
      </>
   );
}
