"use client";

import Input from "@/components/forms/input";
import { Avatar } from "@/components/widgets/avatar";
import { useEffect, useState } from "react";
import { getSearchUsers } from "@/services/search";
import { PrimaryBtn, SecondaryBtn } from "@/components/btn";
import { useAuthUserId } from "@/hooks/auth";
import { addTender, getTender, updateTender } from "@/services/tender";

export default function NewPage({ children, params }) {
   const [searchText, setSearchText] = useState("");
   const [invitedUsers, setInvitedUsers] = useState([]);
   const [searchUsers, setSearchUsers] = useState("");
   const [tender, setTender] = useState({});
   // const [tenderId, setTenderId] = useState("");

   const handleSearchChange = async (e) => {
      setSearchText(() => e.target.value.toLowerCase());
      const userId = await useAuthUserId();
      const ignoreUserId = [
         userId,
         ...invitedUsers.map((user) => user._id),
      ].join(" ,");

      if (searchText.length < 3) {
         // console.table({
         //    "User ID": userId,
         //    "Searching for:": e.target.value.toLowerCase(),
         //    "Ignoring User IDs:": ignoreUserId,
         //    "Invited Users": invitedUsers,
         //    "Search Users": searchUsers,
         // });

         // Arama sorgusunu debounce etmek için setTimeout kullan
         if (window.searchTimeout) clearTimeout(window.searchTimeout);
         window.searchTimeout = setTimeout(() => {
            getSearchUsers({
               q: e.target.value.toLowerCase(),
               ignoreUserId,
            }).then((data) => {
               // console.log("Search Results:", data?.data);
               setSearchUsers([...data.data]);
            });
         }, 500); // 500ms bekle
         return;
      } else return;
   };

   const handleSubmit = (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      const tenderData = {
         title: formData.get("title"),
         description: formData.get("description"),
         status: formData.get("status"),
         tenderDate: formData.get("tenderDate"),
         invitedUsers: formData.get("invitedUsers").split(" ,"),
         budgetMin: formData.get("budgetMin"),
         budgetMax: formData.get("budgetMax"),
      };
      tenderData.invitedUsers = tenderData.invitedUsers.filter(
         (userId) => userId.trim() !== ""
      );
      // console.log("Tender Data:", tenderData);
      updateTender(tender?._id, tenderData)
         .then((res) => {
            if (res.status === 200) {
               console.log("Tender created successfully:", res.data);
               e.target.reset();
               setInvitedUsers([]);
               setSearchUsers("");
            } else {
               console.error("Error creating tender:", res);
            }
         })
         .catch((error) => {
            console.error("Error creating tender:", error);
         });
   };

   useEffect(() => {
      // console.log(params);

      Promise.all([useAuthUserId(), params]).then(([userId, { tenderId }]) => {
         // console.log("User ID:", userId);
         // console.log("Params:", params);
         // Fetch tender data if tenderId is provided in params
         getTender(tenderId)
            .then((data) => {
               if (data.status === 200 && userId === data.data.author[0]._id) {
                  setTender(data.data);
                  setInvitedUsers(data.data.invitedUsers || []);
                  console.log("Fetched Tender Data:", data.data);
               } else {
                  // If no tenderId is provided, you can initialize an empty tender object
                  setTender({});
               }
            })
            .catch((error) => {
               console.error("Error fetching tender data:", error);
            });
      });
   }, []);

   return (
      <form
         className="w-full flex flex-col lg:flex-row gap-10"
         onSubmit={handleSubmit}>
         <main className="flex-1 flex flex-col  gap-4">
            <label className="main ">
               <b className="block mb-2">Başlık</b>
               <input
                  className="w-full h-9 px-3 py-2 !bg-transparent border relative border-tertiary shadow shadow-tertiary rounded-2xl outline-none"
                  type="text"
                  name="title"
                  placeholder="İhale Başlığı"
                  defaultValue={tender?.title || ""}
                  required
                  autoFocus
               />
            </label>
            <label className="main flex flex-col">
               <b className="block mb-2">Açıklama</b>
               <textarea
                  className="w-full h-9a px-3 py-2 !bg-transparent border relative border-tertiary shadow shadow-tertiary rounded-2xl outline-none"
                  placeholder="İhale Açıklaması"
                  defaultValue={tender?.description || ""}
                  name="description"
                  required></textarea>
            </label>
            <div className="main flex flex-col">
               <b className="block mb-2">İhale Durumu</b>
               <div className="flex gap-4">
                  <label className="flex items-center gap-2 w-min h-9 px-3 py-2 !bg-transparent border relative border-tertiary shadow shadow-tertiary rounded-2xl outline-none">
                     <input
                        type="radio"
                        name="status"
                        value="public"
                        className="mr-2"
                        defaultChecked={tender?.status === "public" || true}
                     />
                     <span className="whitespace-nowrap">Halka Açık Ihale</span>
                  </label>
                  <label className="flex items-center gap-2 w-min h-9 px-3 py-2 !bg-transparent border relative border-tertiary shadow shadow-tertiary rounded-2xl outline-none">
                     <input
                        type="radio"
                        name="status"
                        value="privite"
                        className="mr-2"
                        defaultChecked={tender?.status === "privite" || false}
                     />
                     <span className="whitespace-nowrap">Özel İhale</span>
                  </label>
               </div>
            </div>
            <div className="main flex gap-4">
               <label className="flex flex-col">
                  <b className="block mb-2">İhale Tarihi</b>
                  <input
                     type="date"
                     className="w-60 h-9 px-3 py-2 !bg-transparent border relative border-tertiary shadow shadow-tertiary rounded-2xl outline-none"
                     defaultValue={
                        tender?.tenderDate ||
                        new Date().toISOString().split("T")[0]
                     }
                     name="tenderDate"
                     onChange={(e) => {
                        console.log("Selected Date:", e.target.value);
                     }}
                  />
               </label>
               <label className="flex flex-col">
                  <b className="block mb-2">İhale Tarihi</b>
                  <input
                     type="date"
                     className="w-60 h-9 px-3 py-2 !bg-transparent border relative border-tertiary shadow shadow-tertiary rounded-2xl outline-none"
                     // defaultValue={new Date().toISOString().split("T")[0]}
                     name="tenderDate"
                     defaultValue={
                        tender?.tenderDate ||
                        new Date().toISOString().split("T")[0]
                     }
                     onChange={(e) => {
                        console.log("Selected Date:", e.target.value);
                     }}
                  />
               </label>
            </div>
            {/* Bütçe Aralığı: */}
            <div className="main flex gap-4">
               <label className="flex flex-col">
                  <b className="mb-2">Alt Bütçe (TL)</b>
                  <input
                     type="number"
                     className="w-full h-9 px-3 py-2 !bg-transparent border relative border-tertiary shadow shadow-tertiary rounded-2xl outline-none"
                     placeholder="Bütçe (TL)"
                     name="budgetMin"
                     defaultValue={tender?.budgetMin || ""}
                  />
               </label>
               <label className="flex flex-col">
                  <b className="mb-2">Üst Bütçe (TL)</b>
                  <input
                     type="number"
                     className="w-full h-9 px-3 py-2 !bg-transparent border relative border-tertiary shadow shadow-tertiary rounded-2xl outline-none"
                     placeholder="Bütçe (TL)"
                     name="budgetMax"
                     defaultValue={tender?.budgetMax || ""}
                  />
               </label>
            </div>
            {/* <label className="flex flex-col">
                  İhale Türü:
                  <select
                     className="w-full h-9 px-3 py-2 !bg-transparent border relative border-tertiary shadow shadow-tertiary rounded-2xl outline-none"
                     required>
                     <option value="open">Açık İhale</option>
                     <option value="closed">Kapalı İhale</option>
                     <option value="negotiated">Pazarlık Usulü</option>
                  </select>
               </label> */}
            <label className="main flex flex-col gap-4">
               <b className="block mb-2">İhale Belgeleri</b>
               <input
                  type="file"
                  className="absolute opacity-0 -top-96 -left-96"
                  multiple
                  accept=".pdf,.doc,.docx,.xls,.xlsx"
               />
               <span className="flex flex-col items-center gap-4 cursor-pointer">
                  <b className="">Dosyaları buraya sürükleyip bırak</b>
                  <p className="text-sm text-tertiary dark:text-secondary">
                     PDF, DOC, DOCX, XLS, XLSX formatlarını destekler.
                  </p>
                  <SecondaryBtn className="">Belgeleri Yükle</SecondaryBtn>
               </span>
            </label>
            <input
               type="hidden"
               name="invitedUsers"
               value={[...invitedUsers.map((user) => user._id)].join(" ,")}
            />
         </main>
         <aside className=" min-w-96 lg:w-1/3 flex flex-col gap-4">
            {/* <Ad /> */}
            <div className="main relative flex flex-col gap-4">
               <h2>Davet Edilen Kişiler</h2>
               <ul className="mains flex flex-col gap-4">
                  <li className="relative">
                     <Input
                        icon="bx bx-user-plus"
                        placeholder="Kişi ara..."
                        className="w-full h-9 px-3 py-2 !bg-transparent border relative  outline-none"
                        type="search"
                        name="search"
                        onChange={handleSearchChange}
                     />
                     {Array.isArray(searchUsers) &&
                        searchUsers.length > 0 &&
                        searchText && (
                           <ul className="main flex flex-col gap-2 border rounded shadow max-h-60 absolute top-10 -right-4 -left-4 z-10 overflow-auto">
                              <li className="border-b border-current"></li>
                              {searchUsers?.map((user) => (
                                 <li
                                    key={user._id}
                                    className="flex items-center gap-2 px-3 py-2 cursor-pointer ">
                                    <Avatar
                                       name={user.name}
                                       userName={user.userName}
                                       // className="w-max"
                                    >
                                       <SecondaryBtn
                                          className="z-50"
                                          onClick={() => {
                                             setInvitedUsers((prev) =>
                                                prev.some(
                                                   (u) => u._id === user._id
                                                )
                                                   ? undefined
                                                   : [user, ...prev]
                                             );
                                             setSearchUsers("");
                                          }}>
                                          Davet Et
                                       </SecondaryBtn>
                                    </Avatar>
                                 </li>
                              ))}
                           </ul>
                        )}
                  </li>
                  {invitedUsers.map((user, index) => (
                     <li
                        className=""
                        key={`invited-user-${user?._id}-${index}`}>
                        <Avatar name={user?.name} userName={user?.userName}>
                           <button
                              className="text-primary"
                              onClick={() => {
                                 setInvitedUsers((prev) =>
                                    prev.filter((u) => u._id !== user._id)
                                 );
                              }}>
                              Kaldır
                           </button>
                        </Avatar>
                     </li>
                  ))}
               </ul>
            </div>
            <PrimaryBtn type="submit">İhaleyi Düzenle</PrimaryBtn>
            {/* <div className="main">{JSON.stringify(invitedUsers)}</div> */}
         </aside>
      </form>
   );
}
