"use client";
import ChartsDoughnut from "@/components/charts/doughnut";
import userContext from "@/components/provider/userContext";
import { use, useState } from "react";

export default function CompleteProfile({ user: userData = {} }) {
   const [user, setUser] =
      Object.keys(userData).length === 0
         ? use(userContext)
         : useState({ ...userData });

   const userField =
      user &&
      Object.entries(user).filter(
         ([key]) =>
            ![
               "id",
               "_id",
               "active",
               "createdAt",
               "updatedAt",
               "__v",
               "password",
            ].includes(key)
      );

   const validUserFieldCount =
      user &&
      Object.entries(user).filter(
         ([key, val]) =>
            ![
               "id",
               "_id",
               "active",
               "createdAt",
               "updatedAt",
               "__v",
               "password",
            ].includes(key) && val
      ).length;

   const completionPercentage =
      Math.round((100 / userField?.length) * validUserFieldCount) ?? 0;

   return (
      <section className="main flex flex-col gap-4 px-4 ">
         <h2 className="text-xl text-center">Profilinizi tamamlayın</h2>

         {Object.keys(user || {}).length === 0 ? (
            <p>Yükleniyor...</p>
         ) : (
            <>
               <ChartsDoughnut
                  datasets={[
                     {
                        label: "",
                        data: [
                           100 - completionPercentage,
                           completionPercentage,
                        ],
                        backgroundColor: ["rgba(0, 0, 0, .12)", "#d81f26"],
                        borderWidth: 1,
                     },
                  ]}
               />
               <ul className="">
                  {userField &&
                     userField.sort().map(([key, val]) => {
                        const isComplete =
                           val == null || val == undefined || val == ""
                              ? false
                              : true;
                        return (
                           <li
                              key={key}
                              className="py-2 flex items-center gap-2">
                              <i
                                 className={`bx ${
                                    isComplete
                                       ? "bx-check !text-green-500"
                                       : "bx-x"
                                 } text-2xl`}></i>
                              <span
                                 className={`${isComplete ? "font-bold" : ""}`}>
                                 {key.charAt(0).toUpperCase() +
                                    key
                                       .replace(/([A-Z])/g, " $1")
                                       .replace(/^./, (str) =>
                                          str.toUpperCase()
                                       )
                                       .slice(1)}
                              </span>
                              {/* <span>{user[key]}</span> */}
                           </li>
                        );
                     })}
               </ul>
            </>
         )}
      </section>
   );
}
