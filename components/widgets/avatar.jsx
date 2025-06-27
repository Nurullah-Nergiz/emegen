"use client";
import Image from "next/image";
import Link from "next/link";
import { twMerge } from "tailwind-merge";

export const Avatar = ({
   src = "",
   name = "",
   userName = "",
   className = "",
   children,
}) => {
   return (
      <section
         className={twMerge(
            "flex items-center justify-between gap-2",
            className
         )}>
         <Link href={`/@${userName}`} className="flex items-center gap-2">
            <AvatarImg src={src} alt={name} />
            <div className="max-w-60">
               <b
                  className="w-full inline-block
                text-sm overflow-hidden whitespace-nowrap text-ellipsis">
                  {name}
               </b>
               <p className="w-full text-xs whitespace-nowrap text-ellipsis overflow-hidden">
                  @{userName}
               </p>
            </div>
         </Link>
         {children}
      </section>
   );
};

export const AvatarImg = ({
   // src = "https://picsum.photos/seed/picsum/64/64",
   src = "",
   alt = "user avatar",
   className = "",
   width = 64,
}) => {
   return (
      <Image
         src={
            src
               ? `http://cdn.emegen.com.tr/${src}`
               : "http://cdn.emegen.com.tr/avatars/user.png"
         }
         width={width}
         height={width}
         className={twMerge(
            `w-12 h-12 p-[2px] rounded-full border-2 border-primary border-r-transparent border-b-transparent`,
            className
         )}
         alt={alt}
         // onError={(e) => {
         //    e.target.src = "https://picsum.photos/seed/picsum/600/200";
         // }}
      />
   );
};

export const CoverImage = ({
   src = "",
   alt = "cover image",
   className = "",
}) => {
   return (
      <Image
         src={src ? `http://cdn.emegen.com.tr/${src}` : ""}
         width={600}
         height={200}
         className={twMerge("w-full max-h-52 object-cover rounded-xl", className)}
         alt={alt}
         // onError={(e) => {
         //    e.target.src = "https://picsum.photos/seed/picsum/600/200";
         //    e.preventDefault();
         // }}
      />
   );
};
