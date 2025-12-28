"use client";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export default function ExpandableDetailsPopup({
   children,
   title = "",
   open = false,
   onClose = () => {},
   setModal = () => {},
}) {
   const [mounted, setMounted] = useState(false);

   // open/close helpers
   const openPopup = () => setModalOpen(true);
   const closePopup = () => {
      setModalOpen(false);
      onClose();
   };

   useEffect(() => setMounted(true), []);

   // sync internal state with prop
   useEffect(() => {
      setModalOpen(open);
   }, [open]);

   // ESC ile kapatma
   useEffect(() => {
      const handleEsc = (e) => {
         if (e.key === "Escape") closePopup();
      };
      document.addEventListener("keydown", handleEsc);
      return () => document.removeEventListener("keydown", handleEsc);
   }, [onClose]);

   if (!mounted || !modalOpen) return null;

   return createPortal(
      <Suspense fallback={null}>
         <div
            aria-modal="true"
            role="dialog"
            className="fixed inset-0 z-[99] flex items-center justify-center bg-black/50"
            onClick={(e) => {
               if (e.target === e.currentTarget) closePopup();
            }}>
            <div
               className={`relative w-full max-w-lg min-w-96 rounded-xl bg-main shadow-xl p-4 transform transition-all duration-200 ease-out
        opacity-100 scale-100`}
               onClick={(e) => e.stopPropagation()}>
               <div className="flex justify-between items-center pb-4">
                  <h2 className="text-lg font-semibold">{title}</h2>

                  <button
                     aria-label="Close"
                     className="bx bx-x text-2xl cursor-pointer"
                     onClick={closePopup}
                  />
               </div>
               {children}
            </div>
         </div>
      </Suspense>,
      document.body
   );
}
