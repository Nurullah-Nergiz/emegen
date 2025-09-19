"use client";

// import AppLogo from "@/app/logo.svg";

export default function Logo({ children, mode = "full", className = "" }) {
   return (
      <>
         <img src="/logo.png"
            alt="Emegen Logo"
            className="h-10" />

         {mode === "full" && (
            <b className="text-3xl text-black dark:text-white">Emegen</b>
         )}
      </>
   );
}
