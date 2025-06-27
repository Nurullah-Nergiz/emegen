import { Inter } from "next/font/google";
import "./globals.css";

import ReduxProvider from "../components/provider/redux";
import { Suspense } from "react";
import useTheme from "@/hooks/useTheme";

const inter = Inter({ subsets: ["latin"] });

export default async function Layout({ children }) {
   const currentTheme = await useTheme();

   return (
      <html lang="tr" className={`${currentTheme} `}>
         <head>
            <meta
               name="viewport"
               content="width=device-width, initial-scale=1"
            />
            <meta charSet="UTF-8" />
            <meta
               name="description"
               content="Emegen, a social media platform for sharing and discovering new ideas."
            />
            <meta name="theme-color" content="#ffffff" />
            <link rel="icon" href="/favicon.ico" />
            <title>Emegen</title>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link
               rel="preconnect"
               href="http://cdn.emegen.com.tr"
               crossOrigin="true"
            />
            <meta
               name="google-adsense-account"
               content="ca-pub-1933557350242575"
            />
            {/* <script
               async
               src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1933557350242575"
               crossorigin="anonymous"></script> */}
            <script
               async
               src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1933557350242575"
               crossorigin="anonymous"></script>
         </head>
         <ReduxProvider>
            <body className={`${inter.className} `}>
               <Suspense>{children}</Suspense>
            </body>
         </ReduxProvider>
      </html>
   );
}
