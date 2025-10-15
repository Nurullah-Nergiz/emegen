"use client";

import { Ad } from "@/components/AdBanner";
import { Avatar } from "@/components/widgets/avatar";
import Post from "@/components/widgets/post";
import Link from "next/link";
import { RecommendedPeopleWidget } from "@/components/widgets/RecommendedPeople";
import { getExplore } from "@/services/explore";
import { useEffect, useState } from "react";
import Posts from "@/components/widgets/post";
import Footer from "@/components/footer";

export default function Home() {
   const [posts, setPosts] = useState([]);
   useEffect(() => {
      getExplore().then((res) => {
         // console.log("res", typeof res);
         if (typeof res === "undefined" || res === null) {
            return;
         }

         if (res?.status !== 200) {
            return;
         }
         setPosts([...(res?.data || [])]);
      }).catch;
   }, []);

   return (
      <>
         <main className="w-full h-h-full mb-4 flex gap-8">
            <section className="flex-1 mx-auto ">
               <div className="w-full !pt-[30%] mb-4 !bg-secondary text-white main">
                  {/* Premium masaüstü 
                  475 */}
               </div>
               <Posts posts={posts} />
            </section>
         </main>
         <aside className=" min-w-96 lg:w-1/3 ">
            <div className=" sticky top-10 transition-all">
               {/* <Ad /> */}
               <RecommendedPeopleWidget />
               <Footer />
            </div>
         </aside>
      </>
   );
}
