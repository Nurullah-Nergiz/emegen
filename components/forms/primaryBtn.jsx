"use client";

import { useState } from "react";
import { SecondaryBtn } from "@/components/btn";

export default function PrimaryFormButton({
   type: selectionType = "none",
   text: buttonLabel = "",
   url = "",
}) {
   const [type, setType] = useState(selectionType);
   const [value, setValue] = useState(url);
   const [text, setText] = useState(buttonLabel);

   return (
      <form className="main flex flex-col gap-4">
         <b className="block text-lg">Birincil Butonunuz</b>
         <section className="flex items-stretch gap-4">
            <label className="flex flex-col justify-between gap-1">
               <b className="">Buton Türü:</b>
               <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="h-7 text-black block">
                  <option value="">yok</option>
                  <option value="price">Fiyat Teklifi Al</option>
                  <option value="custom">Bağlantı</option>
               </select>
            </label>
            {type === "custom" && (
               <>
                  <label className="flex flex-col justify-between gap-1">
                     <b className="">Buton Metni:</b>
                     <input
                        type="text"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Buton metni girin"
                        className="input w-full max-w-xs mt-2"
                     />
                  </label>

                  <label className="flex flex-col justify-between gap-1">
                     <b className="">URL:</b>
                     <input
                        type="url"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        placeholder="URL girin"
                        className="input w-full max-w-xs mt-2"
                     />
                  </label>
               </>
            )}
         </section>
         <div className="flex flex-row-reverse">
            <SecondaryBtn>Kaydet</SecondaryBtn>
         </div>
      </form>
   );
}
