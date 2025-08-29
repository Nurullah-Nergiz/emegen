"use server";
import { Inter } from "next/font/google";
import "./globals.css";

import ReduxProvider from "../components/provider/redux";

import useTheme from "@/hooks/useTheme";
// import { usePathname } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

export default async function Layout({ children }) {
   const currentTheme = await useTheme();

   return (
      <html lang="tr" className={`${currentTheme} `}>
         <head>
            <meta name="theme-color" content="#ffffff" />
            <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
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
            <script
               async
               src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1933557350242575"
               crossorigin="anonymous"></script>
         </head>
         <body className={`${inter.className} `}>
            <ReduxProvider>{children}</ReduxProvider>
         </body>
      </html>
   );
}

export async function generateMetadata({ params, pathname }) {
   // console.clear();

   const currentPath = pathname || "/";
   // console.log("🔵 Current Pathname:", currentPath);

   return {
      title: {
         default: "Emegen",
         template: "%s | Emegen",
      },
      description: "Emegen - Emegene özel içerikler ve hizmetler",
      alternates: {
         // canonical: `https://emegen.com.tr/@${}`,
      },
      openGraph: {
         title: `Emegen`,
         description: "Emegen - Emegene özel içerikler ve hizmetler",
         images: [
            {
               url: "https://cdn.emegen.com.tr/emegen-logo.png",
               width: 800,
               height: 600,
               alt: "Emegen Logo",
            },
         ],
      },
      twitter: {
         card: "summary_large_image",
         title: `Emegen`,
         description: "Emegen - Emegene özel içerikler ve hizmetler",
         images: ["https://cdn.emegen.com.tr/emegen-logo.png"],
      },
   };
}
