"use client";
import FollowBtn from "@/components/btn/Follow";
import { Avatar } from "./avatar";
import { getExploreByUser } from "@/services/explore";
import { useEffect, useState } from "react";
import Link from "next/link";

export const RecommendedPeopleWidget = ({ mode = "recommended" }) => {
   const [users, setUsers] = useState([]);

   // mode: recommended, following, followers
   // mode: trending by user

   useEffect(() => {
      getExploreByUser()
         .then(({ data, status }) => {
            // { status, data = [] }
            console.log(status, data);

            if (status == 200) {
               setUsers([...data]);
            }
         })
         .catch((err) => {
            console.log(err);
         });
   }, []);

   return (
      <section className="main w-full flex flex-col gap-4">
         <div className="flex items-center justify-between gap-4 whitespace-nowrap">
            <span className="text-xl font-semibold">
               <i className="bx bx-trending-up text-primary mr-2"></i>
               Önerilen İnsanlar
            </span>
            <Link href="/explore-users" className="underline">
               Hepsini gör
            </Link>
         </div>
         {/* <div className="flex flex-col gap-2"> */}
         {typeof users &&
            users.map((user, key) => (
               <div key={user?._id} className="flex items-center justify-between gap-2">
                  <Avatar
                     userAvatar={`${user?.avatar}`}
                     className="w-full"
                     name={user?.name}
                     userName={user?.userName}></Avatar>
                  <FollowBtn id={user?._id} className="p-2 z-50" />
               </div>
            ))}
         {/* </div> */}
      </section>
   );
};
