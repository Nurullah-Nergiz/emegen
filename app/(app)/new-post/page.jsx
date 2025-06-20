"use client";

import { useRef } from "react";

export default function NewPostPage({ children }) {
   const contentRef = useRef(null);
   return (
      <>
         <div className="w-full h-52 mb-4">
            <textarea
               className="w-full h-full p-4 outline-none resize-none"
               placeholder="Gönderi başlığı"
               
               ref={contentRef}></textarea>
         </div>
      </>
   );
}
