"use client";
import Link from "next/link";
import { PrimaryBtn } from "@/components/btn";
import { useState } from "react";

const CookieConsentPopup = () => {
   const [visible, setVisible] = useState(true);

   if (!visible) {
      return null;
   }

   return (
      <div className="w-fit m-4 !mt-auto p-4 bg-main text-main flex flex-col gap-2 absolute right-0 bottom-0 left-0 rounded-lg shadow-lg">
         <div className="text-lg font-bold flex justify-between items-center">
            <b>Çerez rızası</b>
            <button
               type="button"
               aria-label="Kapat"
               className="text-white hover:text-secondary text-2xl"
               onClick={() => setVisible(false)}>
               <i className="bx bx-x"></i>
            </button>
         </div>
         <p className="text-sm mb-2">
            En iyi deneyimi elde etmenizi sağlamak için çerezleri kullanırız.{" "}
            <br />
            Web Sitemizi kullanarak,{" "}
            <Link href="/privacy-policy" className="underline">
               Gizlilik Politikamızı
            </Link>{" "}
            okuduğunuzu ve kabul ettiğinizi onaylamış olursunuz.
         </p>
         <div className="flex flex-col gap-2">
            <PrimaryBtn
               className="w-full bg-secondary"
               onClick={() => {
                  // Add logic to accept cookies
                  setVisible(false);
               }}>
               Çerezlere izin ver
            </PrimaryBtn>
         </div>
      </div>
   );
};

export default CookieConsentPopup;
