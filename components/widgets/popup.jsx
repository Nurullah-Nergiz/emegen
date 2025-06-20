"use client";
import { PrimaryBtn, SecondaryBtn } from "@/components/btn";
import { useRef } from "react";

export default function WidgetsPopup({ children, title = "" }) {
   return (
      <>
         
               {/* <b className="py-2 inline-block">{title}</b> */}
               {children}
      </>
   );
}
