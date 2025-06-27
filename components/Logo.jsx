export default function Logo({ children, mode = "full", className = "" }) {
   return (
      <>
         <svg
            className={`inline-block w-8 h-8 mr-2 align-middle ${className}`}
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-label="Emegen Logo">
            <circle cx="16" cy="16" r="16" fill="#2563EB" />
            <path
               d="M10 22L22 10M10 10h12v12"
               stroke="#fff"
               strokeWidth="2"
               strokeLinecap="round"
               strokeLinejoin="round"
            />
         </svg>

         {mode === "full" && (
            <b className="text-3xl text-black dark:text-white">Emegen</b>
         )}
      </>
   );
}
