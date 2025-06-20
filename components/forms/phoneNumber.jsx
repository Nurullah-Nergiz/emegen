"use client";
import { useState } from "react";
import Input from "./input";
import { xxx } from "next/server";
import { PrimaryBtn } from '@/components/btn';

export default function FormsPhoneNumber({ children }) {
   const [inputValue, setInputValue] = useState("");
   return (
      <div className="flex items-center gap-4">
         <input
            type="text"
            value={+90}
            className="w-14 h-9 px-3 py-2 !bg-transparent border relative border-tertiary shadow shadow-tertiary rounded-2xl outline-none "
            onChange={() => {}}
            placeholder="+90"
            disabled
         />
         <input
            type="tel"
            className="w-full h-9 px-3 py-2 !bg-transparent border relative border-tertiary shadow shadow-tertiary rounded-2xl outline-none"
            value={inputValue}
            onChange={(e) => {
               const value = e.target.value
                  .replace(/\D/g, "")
                  .replace(/^(\d{1,3})(\d{0,3})(\d{0,4}).*/, (m, g1, g2, g3) =>
                     [g1, g2, g3].filter(Boolean).join(" ")
                  );
               console.clear();
               console.log("file: phoneNumber.jsx:18 => value=>", value);
               setInputValue(value);
            }}
            maxLength={12}
            minLength={12}
            placeholder="5xx xxx xxxx"
         />
         <PrimaryBtn type="submit">Kaydet</PrimaryBtn>
      </div>
   );
}
