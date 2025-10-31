"use client";

import userContext from "@/components/provider/userContext";
import { putUser } from "@/services/user";
import { use, useInsertionEffect } from "react";
import { PrimaryBtn } from "@/components/btn";

export default function ConnectionsPage({}) {
   const [user, setUser] = use(userContext);

   // putUser
   useInsertionEffect(() => {
      console.log(user);
   }, [user]);

   return (
      <main className="py-8 ">
         <h1 className="text-2xl font-bold mb-6">
            Bağlı Web Sitelerinizi Yönetin
         </h1>
         <div className="">
            {Object.entries(user.websites || {}).map(([key, value]) => (
               <ul
                  key={key}
                  className="main mb-4 flex flex-wrap items-center gap-4">
                  <li className="">
                     <label className="flex flex-col gap-2 text-sm font-medium ">
                        <b>Website Name</b>
                        <input
                           type="text"
                           className="max-w-60 w-full h-9 px-3 py-2 !bg-transparent border border-tertiary shadow shadow-tertiary rounded-2xl outline-none"
                           value={key}
                           onChange={(e) =>
                              setUser((prev) => ({
                                 ...prev,
                                 websites: {
                                    ...prev.websites,
                                    [key]: e.target.value,
                                 },
                              }))
                           }
                        />
                     </label>
                  </li>
                  <li className="flex-1 flex items-start">
                     <label className="flex-1 flex flex-col gap-2 text-sm font-medium ">
                        <b>URL</b>
                        <input
                           type="text"
                           className="w-full h-9 px-3 py-2 !bg-transparent border border-tertiary shadow shadow-tertiary rounded-2xl outline-none"
                           value={value}
                           onChange={(e) =>
                              setUser((prev) => ({
                                 ...prev,
                                 websites: {
                                    ...prev.websites,
                                    [key]: e.target.value,
                                 },
                              }))
                           }
                        />
                     </label>
                           <span
                         className="ml-2 flex flex-col gap-2 items-center justify-start mt-6"
                           >
                        <button
                           className=" h-9 pt-0 bg-transparent !text-red-500 shadow-none"
                           onClick={() =>
                              setUser((prev) => {
                                 const newWebsites = { ...prev.websites };
                                 delete newWebsites[key];
                                 return {
                                    ...prev,
                                    websites: newWebsites,
                                 };
                              })
                           }>
                           X
                        </button>
                        <button
                           className="disabled:opacity-50"
                           disabled={
                              Object.keys(user.websites || {}).length >= 5
                           }
                           onClick={() => {
                              setUser((prev) => ({
                                 ...prev,
                                 websites: {
                                    ...prev.websites,
                                    ["new-website-" +
                                    Object.keys(prev.websites || {}).length]:
                                       "",
                                 },
                              }));
                           }}>
                           +
                        </button>
                     </span>
                  </li>
               </ul>
            ))}
         </div>
      </main>
   );
}
