"use client";

import { useState } from "react";

export default function Input({
   title = "",
   value = "",
   placeholder = "",
   onChange = (e) => {},
   ...props
}) {
   const [inputValue, setInputValue] = useState(value);
   return (
      <label>
         <b className="block">{title}</b>
         <input
            className="w-full h-9 px-3 py-2 !bg-transparent border relative border-tertiary shadow shadow-tertiary rounded-2xl outline-none"
            type="text"
            value={inputValue}
            placeholder={placeholder}
            onChange={(e) => {
               onChange(e);
               setInputValue(e.target.value);
            }}
            {...props}
         />
      </label>
   );
}
