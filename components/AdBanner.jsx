"use client";

import { useEffect } from "react";

export const Ad = () => {
   // useEffect(() => {
   //    if (typeof window !== "undefined" && window.adsbygoogle) {
   //       try {
   //          (window.adsbygoogle = window.adsbygoogle || []).push({});
   //          // console.log(
   //          //    "file: AdBanner.jsx:10 => window.adsbygoogle=>",
   //          //    window.adsbygoogle
   //          // );
   //       } catch (e) {
   //          // console.error("Adsense error:", e);
   //       }
   //    }
   // }, []);

   return (
      <>
         {/* <ins
            className="adsbygoogle block min-h-52 !bg-secondary  main !p-0 relative overflow-hidden"
            // style="display:block"
            data-ad-client="ca-pub-1933557350242575"
            data-ad-slot="2364594790"
            data-ad-format="auto"
            data-full-width-responsive="true"></ins> */}
         <div className="before:block before:pt-[66%] h-min mb-4 main !bg-transparent !p-0 relative overflow-hidden">
            <img
               src="https://picsum.photos/300/200"
               alt=""
               className="absolute inset-0 w-full h-h-full object-cover "
            />
         </div>
      </>
   );
};
