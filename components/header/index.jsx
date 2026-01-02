"use server";
import { Search } from "./search";
import { Avatar } from "@/components/widgets/avatar";

import AuthHeader from "@/components/header/AuthHeader";
import Link from "next/link";
import NavbarBtn from "./navbarBtn";
import useAuthUser from "@/hooks/auth";
import Logo from "@/components/Logo";


export const Header = async () => {
   // const users = await useIsAuthUser();
   const user = await useAuthUser();

   return (
      <header className="h-20 mx-1 px-8  dark:!text-white z-50">
         <section className="flex items-center justify-between">
            <div className="flex-1 flex items-center gap-4">
               <Link href="/" className="sm:hidden">
                  <Logo />
               </Link>
               <NavbarBtn />
               <Search />
            </div>
            <div className=" p-1 flex items-center justify-end gap-4 overflow-hidden">
               {user?._id ? (
                  <>
                     <button className="bx bx-message-rounded-dots text-secondary dark:!text-inherit text-2xl "></button>
                     <button className="bx bx-bell text-secondary dark:!text-inherit text-2xl "></button>
                     <Avatar
                        name={`${user.name} `}
                        userName={user.userName}
                        src={user?.profilePicture}
                        detailsClassName="sm:block hidden"
                     />
                  </>
               ) : (
                  <>
                     <AuthHeader />
                  </>
               )}
            </div>
         </section>
      </header>
   );
};
