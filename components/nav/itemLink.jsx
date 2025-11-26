"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import { twMerge } from "tailwind-merge";
import { useEffect, useState } from "react";

/**
 *
 * @param {Object} props
 * @param {String} props.link
 * @param {String} props.icon
 * @param {String} props.text
 * @param {String} props.className
 * @param {String} props.activeClass
 * @param {"col"||"row"} props.type
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
   activeSartsWith = false,
}) => {
   const pathName = usePathname();
   const navbar = useSelector((state) => state.ui.navbar) === true;

   // Prevent hydration mismatches by deferring dynamic path/navbar dependent styling until after mount
   const [mounted, setMounted] = useState(false);
   useEffect(() => {
      setMounted(true);
   }, []);

   const active =
      mounted &&
      (link === pathName ||
         (link !== "/" && activeSartsWith && pathName.startsWith(link)));

   const orientationClass = mounted && navbar ? "flex-row" : "flex-col";
   const iconClass = icon
      ? `${active ? icon.replace("bx-", "bxs-") + " sm:text-primary" : icon} text-2xl`
      : "";

   return (
      <Link
         href={link}
         className={twMerge(
            `${active ? activeClass : ""} flex ${orientationClass} items-center gap-3 relative`,
            className
         )}
         title={text}
         suppressHydrationWarning>
         {icon && <i className={iconClass}></i>}
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
