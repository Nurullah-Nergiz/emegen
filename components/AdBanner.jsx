"use client";

import { useEffect, useState } from "react";

export const Ad = () => {
   const [isClient, setIsClient] = useState(false);

   useEffect(() => {
      setIsClient(true);
      if (typeof window !== "undefined" && window.adsbygoogle) {
         try {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
         } catch (e) {
            console.error("Adsense error:", e);
         }
      }
   }, []);

   return (
      <>
         {isClient && (
            <div className="before:block before:pt-[66%] h-min mb-4 main !bg-transparent !p-0 relative overflow-hidden">
               <ins
                  className="adsbygoogle block min-h-52 !bg-secondary absolute inset-0 w-full overflow-hidden"
                  data-ad-client="ca-pub-1933557350242575"
                  data-ad-slot="2364594790"
                  data-ad-format="auto"
                  data-full-width-responsive="true"></ins>
            </div>
         )}
      </>
   );
};
