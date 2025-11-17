"use client";

import { twMerge } from "tailwind-merge";

/**
 *
 * @param {String} param0.className
 * @param {Function} param0.onClick
 * @returns {import("react").ReactHTMLElement}
 */
export function PrimaryBtn({
   children,
   className = "",
   onClick = () => {},
   ...attr
}) {
   return (
      <button
         className={twMerge(
            "px-4 py-2 bg-primary rounded-md !text-white shadow shadow-secondary inline-block  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200 whitespace-nowrap cursor-pointer",
            className
         )}
         onClick={() => onClick()}
         {...attr}>
         {children}
      </button>
   );
}

export function SecondaryBtn({
   children,
   className = "",
   onClick = () => {},
   attr,
}) {
   return (
      <button
         className={twMerge(
            "!px-4 !py-2 !bg-accent !text-current rounded-md whitespace-nowrap cursor-pointer  hover:!bg-accent/80 transition duration-200 shadow-sm",
            className
         )}
         onClick={() => onClick()}
         {...attr}>
         {children}
      </button>
   );
}

export function TertiaryBtn({
   children,
   className = "",
   onClick = () => {},
   attr,
}) {
   return (
      <button
         className={twMerge(
            "px-4 py-2 !text-current border border-main rounded-md text-main whitespace-nowrap cursor-pointer",
            className
         )}
         onClick={() => onClick()}
         {...attr}>
         {children}
      </button>
   );
}
