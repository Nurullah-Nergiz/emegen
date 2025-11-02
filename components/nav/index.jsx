"use client";
import Link from "next/link";
import Logo from "../Logo";
import { ItemLink } from "@/components/nav/itemLink";
import { PrimaryBtn } from "@/components/btn";
import { useSelector } from "react-redux";
import useAuthUser from "@/hooks/auth";
import CookieConsentPopup from "./CookieConsentPopup";
import { useEffect, useState } from "react";

export const Nav = ({ menu }) => {
   const navbar =
      useSelector((state) => state.ui.navbar) === true ? true : false;

   const [user, setUser] = useState(null);
   useEffect(() => {
      useAuthUser().then((data) => setUser(data));
   }, []);

   return (
      <nav className="sm:max-w-[25%] sm:h-screen sm:sticky sm:top-0 left-0  sm:shadow-md sm:shadow-tertiary overflow-hidden">
         <section className="hidden max-h-screen w-min h-full px-10 pb-4 sm:block  text-secondary hover:overflow-y-auto">
            <Link href="/" className="h-20 flex items-center gap-4">
               <Logo mode={navbar ? "full" : "icon"} />
            </Link>
            <div className="flex flex-col items-stretch gap-1">
               {Object.entries(menu).map(([key, value]) => (
                  <ul
                     key={`navbar-itemMenu-${key}`}
                     className={`flex flex-col`}>
                     <li className="w-min pb-2 text-xs font-bold text-tertiary whitespace-nowrap">
                        {key}
                     </li>
                     {value.map((item, index) => (
                        <li className="mb-2" key={`navbar-itemLink-${index}`}>
                           <ItemLink
                              mode={navbar ? "full" : "icon"}
                              activeSartsWith={true}
                              {...item}
                           />
                        </li>
                     ))}
                  </ul>
               ))}
            </div>
            {/* {navbar && <CookieConsentPopup />} */}
         </section>
         <section className="main fixed right-0 bottom-0 left-0 sm:hidden bg-main border-t border-tertiary p-2 z-50">
            <div className="flex justify-evenly items-center">
               <ItemLink
                  icon="bx bx-home-alt-2"
                  link="/"
                  mode="col"
                  className="text-2xl"
                  activeSartsWith={true}
               />
               <ItemLink
                  icon="bx bx-search"
                  link="/explore"
                  mode="col"
                  className="text-2xl"
               />
               <ItemLink
                  icon="bx bx-plus-circle"
                  link="/new-post"
                  mode="col"
                  className="text-3xl"
               />
               <ItemLink
                  icon="bx bx-bell"
                  link="/notifications"
                  mode="col"
                  className="text-2xl"
               />
               <ItemLink
                  icon="bx bx-user-circle"
                  link={user ? `/@${user.userName}` : "/login"}
                  mode="col"
                  className="text-2xl"
               />
            </div>
         </section>
      </nav>
   );
};
