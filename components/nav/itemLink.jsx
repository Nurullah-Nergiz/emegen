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
   mode = "row",
   className = "",
}) => {
   const pathName = usePathname();
   const active =
      link !== ""
         ? link !== "/"
            ? pathName.startsWith(link)
            : pathName === link
         : false;
   const navbar =
      useSelector((state) => state.ui.navbar) === true ? true : false;

   return (
      <Link
         href={link}
         className={twMerge(
            `${
               active
                  ? "before:w-1 before:bg-primary before:absolute sm:before:top-0 before:bottom-0 sm:before:-left-10"
                  : ""
            } mb-2 flex ${
               navbar === true ? "flex-row" : "flex-col"
            } items-center gap-3 relative`,
            className
         )}
         title={text}>
         <i
            className={`${
               active ? icon.replace("bx-", "bxs-") + " sm:text-primary" : icon
            } text-2xl`}></i>
         {mode !== "col" ? (
            <p
               className={`${
                  active ? "font-black" : ""
               } w-max pr-10 bg-slate-00 whitespace-nowrap xl:block transition-all text-base ${
                  navbar ? "block" : "!hidden"
               }`}>
               {text} <br />
            </p>
         ) : (
            ""
         )}
      </Link>
   );
};
