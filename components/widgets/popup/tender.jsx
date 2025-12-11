"use client";
import { PrimaryBtn } from "@/components/btn";
import ExpandableDetailsPopup from "@/components/widgets/popup";
import { getMyTenders } from "@/services/tender";
import { useEffect, useState } from "react";

export default function TenderDetailsModal({
   children,
   open = false,
   title = "",
   data,
}) {
   const [isModalOpen, setIsModalOpen] = useState(open);
   const [tenders, setTenders] = useState([]);
   const userId = typeof data === "string" ? data : undefined;

   const handleTenderSelect = (tender) => {
      // İhale seçildiğinde yapılacak işlemler
      console.log({
         userId,
         "Seçilen İhale:": tender,
      });
      open = false;
   };

   useEffect(() => {
      getMyTenders().then((res) => {
         if (res?.status === 200) {
            setTenders(res.data);
         }
      });
   }, []);

   return (
      <>
         <ExpandableDetailsPopup
            title="İhalelerim Seç"
            open={isModalOpen}
            setModal={setIsModalOpen()}>
            <div className="flex flex-col gap-4 max-h-96 overflow-y-auto">
               {tenders.length === 0 ? (
                  <p className="text-center text-gray-500">
                     İhale mevcut değil.
                  </p>
               ) : (
                  tenders.map((tender) => (
                     <div
                        className="p-4 border rounded-lg shadow-sm"
                        onClick={handleTenderSelect.bind(null, tender)}
                        key={tender._id}>
                        <h3 className="text-lg font-semibold">
                           {tender.title}
                        </h3>
                        <p className="text-gray-600">{tender.description}</p>
                     </div>
                  ))
               )}
            </div>
         </ExpandableDetailsPopup>
      </>
   );
}
