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
      <nav className="sm:max-w-[25%] sm:h-screen sm:relative sm:top-0 left-0  sm:shadow-md sm:shadow-tertiary overflow-hidden">
         <section className="hidden max-h-screen w-min h-full px-10 pb-4 sm:block  text-secondary sticky top-0 z-50 hover:overflow-y-auto">
            <Link href="/" className="h-20 flex items-center gap-4">
               <Logo mode={navbar ? "full" : "icon"} />
            </Link>
            {/* {navbar ? "true" : "false"} */}
            <div className="flex flex-col items-stretch gap-1">
               {Object.entries(menu).map(([key, value]) => (
                  <ul
                     key={`navbar-itemMenu-${key}`}
                     className={`flex flex-col`}>
                     <li className="w-min pb-2 text-xs font-bold text-tertiary whitespace-nowrap">
                        {key}
                     </li>
                     {value.map((item, index) => (
                        <li className="mb-2"
                           key={`navbar-itemLink-${index}`}
                        >
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

            {/* {navbar && <CookieConsentPopup />} */}
         </section>
         <section className="main  fixed right-0 bottom-0 left-0 sm:hidden">
            <div className="flex justify-evenly items-center gap-8">
               <ItemLink
                  icon="bx bx-home-alt-2"
                  link="/"
                  mode="col"
                  className="text-2xl"
               />
               <ItemLink icon="bx bx-search" link="/" mode="col" />
               <ItemLink icon="bx bx-plus-circle" link="/new-post" mode="col" />
               <ItemLink icon="bx bx-home" link="/" mode="col" />
               <ItemLink icon="bx bx-user-circle" link="/profile" mode="col" />
            </div>
            {/* Example: Ads cookie consent banner */}
         </section>
      </nav>
   );
};

const CookieConsentPopup = () => {
   return (
      <>
         <div className="w-fit m-4 !mt-auto p-4 bg-main text-main flex flex-col gap0 absolute right-0 bottom-0 left-0">
            <div className="text-lg font-bold flex justify-between">
               <b>Çerez rızası</b>
               <button
                  type="button"
                  aria-label="Kapat"
                  className="text-white hover:text-secondary text-2xl"
                  onClick={() => {
                     // Add your close logic here, e.g., hide the consent banner
                  }}>
                  <i className="bx bx-x"></i>
               </button>
            </div>
            <p className="text-sm mb-2">
               En iyi deneyimi elde etmenizi sağlamak için çerezleri kullanırız.{" "}
               <br />
               Web Sitemizi kullanarak bunu kabul edersiniz okudun ve bizim{" "}
               <Link href="/privacy-policy" className="underline">
                  Gizlilik Politikası
               </Link>
               .
            </p>
            <div className="flex flex-col gap-2">
               <PrimaryBtn className="w-full bg-secondary">
                  Çerezlere izin ver
               </PrimaryBtn>
            </div>
         </div>
      </>
   );
};
