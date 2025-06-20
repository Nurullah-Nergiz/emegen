"use client";

import { useRef } from "react";

export default function NewPostPage({}) {
   const contentRef = useRef(null);

   const handleSubmit = (e) => {
      e.preventDefault();
      console.log("Gönderi gönderildi!");
   };

   return <>tender</>;
}
