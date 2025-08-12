"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import { twMerge } from "tailwind-merge";

/**
 *
 * @param {Object} props
 * @param {String} props.link
 * @param {String} props.icon
 * @param {String} props.text
 * @param {"col"||"row"} props.mode
 * @returns React.Component
 */
export const ItemLink = ({
   link = "",
   icon,
   text,
   mode = "full",
   type = "row",
   className = "",
   activeClass = "before:w-1 before:bg-primary before:absolute sm:before:top-0 before:bottom-0 sm:before:-left-10",
}) => {
   const pathName = usePathname();
   const active =
      !["", "/"].includes(link) &&
      pathName == link
      // || pathName.startsWith(link)
         ? true
         : false;

   // const active =
   //    link !== ""
   //       ? link !== "/"
   //          ? pathName.startsWith(link)
   //          : pathName === link
   //       : false;
   const navbar =
      useSelector((state) => state.ui.navbar) === true ? true : false;

   return (
      <Link
         href={link}
         className={twMerge(
            `${active ? activeClass : ""} flex ${
               navbar === true ? "flex-row" : "flex-col"
            } items-center gap-3 relative`,
            className
         )}
         title={text}>
         {icon && (
            <i
               className={`${
                  active
                     ? icon.replace("bx-", "bxs-") + " sm:text-primary"
                     : icon
               } text-2xl`}></i>
         )}
         {type !== "col" ? (
            <p
               className={`${
                  active ? "font-black" : ""
               } w-max bg-slate-00 whitespace-nowrap xl:block transition-all text-base ${
                  mode === "full" ? "block" : "!hidden"
               }`}>
               {text} <br />
            </p>
         ) : (
            ""
         )}
      </Link>
   );
};
