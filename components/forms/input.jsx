"use client";

import { useState } from "react";

export default function Input({
   title = "",
   value = "",
   name = "",
   icon = "",
   placeholder = "",
   onChange = (e) => {},
   ...props
}) {
   // const [inputValue, setInputValue] = useState(value);
   return (
      <label>
         <b className="block">{title}</b>
         <span className="px-3 py-2 flex items-center gap-2 border relative border-tertiary shadow shadow-tertiary rounded-2xl outline-none">
            {icon && <i className={icon}></i>}
            <input
               className="w-full h-9 px-3 py-2 !bg-transparent outline-none"
               type="text"
               name={name}
               defaultValue={value}
               placeholder={placeholder}
               onChange={(e) => {
                  onChange(e);
                  // setInputValue(e.target.value);
               }}
               {...props}
            />
         </span>
      </label>
   );
}
