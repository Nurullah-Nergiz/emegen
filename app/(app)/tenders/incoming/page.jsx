"use client";
import Tenders, { Tender } from "@/components/widgets/tenders";
import { getMyTenders } from "@/services/tender";
import { useEffect, useState } from "react";

export default function IncomingPage({ children }) {
   // const { user } = useAuth();
   // const userId = useAuthUserId();
   const [tenders, setTenders] = useState([]);
   useEffect(() => {
         getMyTenders()
            .then((response) => {
               setTenders([...response.data]);
               console.log("My Tenders:", response.data);
            })
            .catch((error) => {

               console.error("Error fetching my tenders:", error);
            });
      }, []);
   return (
      <>
      <main className="flex-1 flex flex-col gap-4">
            <Tenders isFilterActive={false} data={tenders}></Tenders>
         </main>
         {/* <Tender  /> */}
      </>
   );
}
