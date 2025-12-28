"use client";
import Image from "next/image";
import Link from "next/link";
import { twMerge } from "tailwind-merge";

export const Avatar = ({
   src = "",
   name = "",
   userName = "",
   bio = "",
   className = "",
   children,
   detailsClassName = "",
}) => {
   return (
      <section
         className={twMerge(
            "max-w-full w-full flex items-center justify-between gap-4",
            className
         )}>
         <Link href={`/@${userName}`} className="flex-1 flex items-center gap-2 overflow-hidden">
            <AvatarImg src={src} alt={name} />
            <div
               className={twMerge(
                  "overflow-hidden flex flex-col justify-center gap-0.5",
                  detailsClassName
               )}>
               <b className="max-w-40 w-fulls inline-block text-sm overflow-hidden whitespace-nowrap text-ellipsis">
                  {name}
               </b>
               <p className="max-w-40 text-xs whitespace-nowrap text-ellipsis overflow-hidden">
                  @{userName}
               </p>
               {bio && (
                  <p
                     className="max-h-12
                        text-secondary dark:text-tertiary  text-ellipsis overflow-hidden">
                     {bio}
                  </p>
               )}
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
      <div className="p-px bg-white bg-clip-padding rounded-full overflow-hidden inline-block">
         <Image
            src={
               src
                  ? `http://cdn.emegen.com.tr/${src}`
                  : "http://cdn.emegen.com.tr/avatars/user.png"
            }
            width={size}
            height={size}
            className={twMerge(
               `p-px border-2 border-primary border-r-transparent border-b-transparent rounded-full aspect-square`,
               className
            )}
            alt={alt}
            // onError={(e) => {
            //    e.target.src = "https://picsum.photos/seed/picsum/600/200";
            // }}
         />
      </div>
   );
};

export const CoverImage = ({
   src = "",
   alt = "cover image",
   className = "",
}) => {
   return (
      <div className="before:block before:pt-[25%] h-min !bg-secondary relative">
         {src ? (
            <Image
               src={
                  src
                     ? `http://cdn.emegen.com.tr/${src}`
                     : "http://cdn.emegen.com.tr/avatars/user.png"
               }
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
         ) : (
            <div
               className={twMerge(
                  "w-full h-full bg-accent rounded-xl absolute top-0 right-0 bottom-0 left-0",
                  className
               )}></div>
         )}
      </div>
   );
};
