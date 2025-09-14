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
            <div className="max-w-60 overflow-hidden">
               <b
                  className="w-full inline-block
                text-sm overflow-hidden whitespace-nowrap text-ellipsis">
                  {name}
               </b>
               <p className="text-xs whitespace-nowrap text-ellipsis overflow-hidden -z-0">
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
   size = 48,
}) => {
   return (
      <Image
         src={
            src
               ? `http://cdn.emegen.com.tr/${src}`
               : "http://cdn.emegen.com.tr/avatars/user.png"
         }
         width={size}
         height={size}
         className={twMerge(
            `p-[2px] rounded-full border-2 border-primary border-r-transparent border-b-transparent aspect-square`,
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
      <div className="before:block before:pt-[25%] h-min !bg-secondary relative">
         {src && (
            <Image
               src={`http://cdn.emegen.com.tr/${src}`}
               width={600}
               height={200}
               className={twMerge(
                  "w-full h-full object-cover rounded-xl absolute top-0 right-0 bottom-0 left-0",
                  className
               )}
               alt={alt}
               // onError={(e) => {
               //    e.target.src = "https://picsum.photos/seed/picsum/600/200";
               //    e.preventDefault();
               // }}
            />
         )}
      </div>
   );
};
