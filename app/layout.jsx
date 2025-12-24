"use server";
import { Inter } from "next/font/google";
import "./globals.css";

import ReduxProvider from "../components/provider/redux";

import useTheme from "@/hooks/useTheme";
import { headers } from "next/headers";

import * as services from "@/services/index";
import { useAuthToken } from "@/hooks/auth";
import { SearchActionSchema } from "@/components/schema";

const inter = Inter({ subsets: ["latin"] });

export default async function Layout({ children }) {
   const currentTheme = await useTheme();

   try {
      const token = await useAuthToken();
      // console.log("Auth Token in Layout:", token.trim());

      if (token) {
         for (const svc of Object.values(services)) {
            svc.interceptors.request.use(
               async (config) => {
                  config.headers.authorization = token;

                  // console.log(config);

                  return config;
               },
               (error) => {
                  console.error("❌ [Request Errors]:", error);
                  return Promise.reject(error);
               }
            );

            // if (svc?.defaults?.headers) {
            //    svc.defaults.headers.authorization = token;
            //    // console.log(svc.defaults.headers);
            // }
         }
      }
   } catch (e) {
      console.error("Failed to attach auth token to services:", e);
   }

   Object.values(services).forEach((svc) => {
      svc.interceptors.response.use((response) => {
         // console.log("Response from:", response.config.url, response.status);
         return response;
      });
   });

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
               crossOrigin="anonymous"></script>
         </head>
         <body className={`${inter.className} `}>
            <ReduxProvider>{children}</ReduxProvider>
            <SearchActionSchema />
         </body>
      </html>
   );
}

export async function generateMetadata({ params }) {
   return {
      title: {
         default: "Emegen",
         template: "%s | Emegen",
      },
      description: {
         default: "Emegen - Emegen özel içerikler ve hizmetler",
      },
      openGraph: {
         title: {
            default: "Emegen",
            template: "%s | Emegen",
         },
         description: {
            default: "Emegen - Emegen özel içerikler ve hizmetler",
         },
         images: [
            {
               url: "https://cdn.emegen.com.tr/emegen-logo.png",
               width: 800,
               height: 600,
               alt: "Emegen Logo",
            },
         ],
      }
      
      // alternates: {},
      // openGraph: {
      //    title: {
      //       default: "Emegen",
      //       template: "%s | Emegen",
      //    },
      //    description: {
      //       default: "Emegen - Emegene özel içerikler ve hizmetler",
      //    },
      //    images: [
      //       {
      //          url: "https://cdn.emegen.com.tr/emegen-logo.png",
      //          width: 800,
      //          height: 600,
      //          alt: "Emegen Logo",
      //       },
      //    ],
      // },
      // twitter: {
      //    card: "summary_large_image",
      //    title: `Emegen`,
      //    description: "Emegen - Emegene özel içerikler ve hizmetler",
      //    images: ["https://cdn.emegen.com.tr/emegen-logo.png"],
      // },
   };
}
