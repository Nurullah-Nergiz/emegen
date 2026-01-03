"use client";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";

export const Search = () => {
   const [search, setSearch] = useState("");
   const searchRef = useRef();
   const router = useRouter();

   const submit = (e) => {
      e.code == "Enter"
         ? router.push(
              `/search?q=${e.target.value.trim().replaceAll(" ", "+")}`
           )
         : "";
   };

   return (
      <div className="search sr-only sm:!not-sr-only sm:flex max-w-80 text-secondary bg-main sm:!relative has-[input:focus]:!not-sr-only has-[input:focus]:!absolute top-0 right-0 left-0 !w-screen z-50">
         <label className="bx bx-search py-2 px-3 flex items-center gap-2 border border-secondary rounded-2xl text-2xl">
            <input
               type="text"
               id="header-search-input"
               className="w-full bg-transparent text-base outline-none "
               placeholder="Search..."
               onKeyDown={submit}
               ref={searchRef}
               onChange={(e) => setSearch(e.target.value)}
            />
            {!search ? (
               <button className="bx bx-microphone"></button>
            ) : (
               <button
                  className="bx bx-x"
                  onClick={() => {
                     setSearch("");
                     searchRef.current.blur();
                  }}></button>
            )}
         </label>
         <ul
            // ${!search ? "hidden" : "hidden"}
            className={` hidden group-has-[:focus]:block max-h-80 main absolute -right-0 bottom-4 -left-0 translate-y-full border border-t-0 border-current rounded-b-xl !rounded-t-none`}>
            <hr />
            <li className="w">
               <i className="bx bx-search text-2xl"></i>a
            </li>
         </ul>
      </div>
   );
};
