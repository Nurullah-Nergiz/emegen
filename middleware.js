import { NextResponse } from "next/server";

export function middleware(req) {
   const cookies = req.cookies;
   const url = req.nextUrl.clone();
   const pathname = req.nextUrl.pathname;

   const token = cookies.get("auth-token")?.value || "";
   const loggedInUserNotAccessPaths = ["/auth/login", "/auth/register"];
   // console.log("🔵 Middleware - Current Pathname:", pathname);

   if (process.env.NODE_ENV === "production") {
      if (!pathname.startsWith("/@")) {
         if (pathname === "/") {
         } else if (!token) {
            if (!loggedInUserNotAccessPaths.includes(pathname)) {
               return NextResponse.redirect(
                  new URL(loggedInUserNotAccessPaths[0], url)
               );
            }
         } else if (token) {
            if (loggedInUserNotAccessPaths.includes(pathname)) {
               console.log('"auth', pathname);
               return NextResponse.redirect(new URL("/", url));
            }
         }
      }
   }

   return NextResponse.next();
}

export const config = {
   matcher: [
      /*
       * Match all request paths except for the ones starting with:
       * - api (API routes)
       * - _next/static (static files)
       * - favicon.ico (favicon file)
       */
      "/((?!api|_next/static|favicon.ico|logo.png|sitemaps|robots.txt).*)",
   ],
};
