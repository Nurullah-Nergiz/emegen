"use client";
import Link from "next/link";
import Logo from "../Logo";
import { ItemLink } from "@/components/nav/itemLink";
import { PrimaryBtn } from "@/components/btn";
import { useSelector } from "react-redux";

export const Nav = ({ menu }) => {
   const navbar =
      useSelector((state) => state.ui.navbar) === true ? true : false;

   return (
      <nav className="sm:max-w-[20%] sm:h-screen sm:sticky sm:top-0 left-0  sm:shadow-md sm:shadow-tertiary hover:overflow-y-auto ">
         <section className="hidden max-h-screen w-min h-full px-10 pb-4 sm:flex flex-col gap-4  text-secondary sm:sticky sm:top-0 left-0 z-50">
            <Link href="/" className="h-24 flex items-center">
               <Logo mode="icon" />
            </Link>
            <div className="mb-5 flex flex-col items-stretch gap-4">
               {Object.entries(menu).map(([key, value]) => (
                  <ul
                     key={`navbar-itemMenu-${key}`}
                     className={`flex flex-col gap-2`}>
                     <li className="w-min pb-2 text-xs font-bold text-tertiary whitespace-nowrap">
                        {key}
                     </li>
                     {value.map((item, index) => (
                        <ItemLink key={`navbar-itemLink-${index}`} {...item} />
                     ))}
                  </ul>
               ))}
            </div>
            {/* <div className="h-0  before:block before:pt-[75%] before:bg-tertiary before:rounded-2xl relative opacity-85">
               <span className="h-10 p-2 bg-tertiary rounded-t-2xl absolute -top-4 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  icon
               </span>
               <div className="h-min p-4 flex flex-col items-stretch justify-between absolute top-0 right-0 bottom-0 left-0">
                  <b>title</b>
                  <span className="text-sm">description</span>
                  <PrimaryBtn>a</PrimaryBtn>
               </div>
            </div> */}
         </section>
         <section className="main  fixed right-0 bottom-0 left-0 sm:hidden">
            <div className="flex justify-evenly items-center gap-8">
               <ItemLink icon="bx bx-home-alt-2" link="/" mode="col" className="text-2xl" />
               <ItemLink icon="bx bx-search" link="/" mode="col" />
               <ItemLink icon="bx bx-plus-circle" link="/new-post" mode="col" />
               <ItemLink icon="bx bx-home" link="/" mode="col" />
               <ItemLink icon="bx bx-user-circle" link="/profile" mode="col" />
            </div>
         </section>
      </nav>
   );
};
