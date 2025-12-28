"use client";

import { ItemLink } from "@/components/nav/itemLink";

export default function ProfileNavbar({ user = {} }) {
   return (
      <>
         <nav
         id="profile-main-nav"
            className="main my-4 flex gap-4 border-b border-secondary">
            {[
               { name: "Ana sayfa", href: "" },
               { name: "Posts", href: "/posts" },
               { name: "Tenders", href: "/tenders" },
               { name: "Hakkında", href: "/about" },
            ].map(({ name, href }) => (
               <ItemLink
                  text={name}
                  link={`/@${user?.userName}${href}`}
                  className="hover:underline"
                  activeClass="border-b-2 border-primary"
                  key={"profil-navbar-" + name}
               />
               // <Link
               // href={`/@${user?.userName}/${href}`}
               // className="hover:underline"
               //    key={"profil-navbar-" + name}>
               //    {name}
               // </Link>
            ))}
         </nav>
      </>
   );
}
