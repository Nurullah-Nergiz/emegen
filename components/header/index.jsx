"use server";
import { Search } from "./search";
import { Avatar } from "@/components/widgets/avatar";

import AuthHeader from "@/components/header/AuthHeader";
import Link from "next/link";
import NavbarBtn from "./navbarBtn";
import useAuthUser from "@/hooks/auth";
import Logo from "@/components/Logo";

export const Header = async () => {
   const user = await useAuthUser();

   return (
      <header className="h-20 mx-2 px-8 flex items-center justify-between bg-headerBackground dark:!text-white dark:bg-[#1c1d22] sticky top-0 z-50">
         <section className="flex-1 flex items-center gap-4">
            <Link href="/" className="sm:hidden">
               <Logo />
            </Link>
            <NavbarBtn />
            <Search />
         </section>

         <section className=" p-1 flex items-center justify-end gap-4 overflow-hidden">
            {user && Object.keys(user).length > 0 ? (
               <>
                  <button className="bx bx-message-rounded-dots text-secondary dark:!text-inherit text-2xl "></button>
                  <button className="bx bx-bell text-secondary dark:!text-inherit text-2xl "></button>
                  <Avatar
                     userAvatar={user?.avatar}
                     name={`${user.name} `}
                     userName={user.userName}
                     src={user?.profilePicture}
                     className="sm:flex hidden"
                  />
               </>
            ) : (
               <>
                  <AuthHeader />
               </>
            )}
         </section>
      </header>
   );
};
