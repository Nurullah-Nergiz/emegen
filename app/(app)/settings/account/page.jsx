"use client";
import userContext from "@/components/provider/userContext";
import { use, useEffect, useMemo, useState, useTransition } from "react";
import { SecondaryBtn } from "@/components/btn";
import { putUser } from "@/services/user";
import CompleteProfile from "@/components/widgets/profile/completeProfile";

export default function AccountPage() {
   const [user, setUser] = use(userContext);
   const [account, setAccount] = useState({
      userName: user?.userName ?? "",
      email: user?.email ?? "",
      publicEmail: user?.publicEmail ?? "",
      phoneNumber: user?.phoneNumber ?? "",
      publicPhoneNumber: user?.publicPhoneNumber ?? "",
   });
   useEffect(() => {
      setAccount({
         ...user,
         // userName: user?.userName ?? "",
         // email: user?.email ?? "",
         // publicEmail: user?.publicEmail ?? "",
         // phoneNumber: user?.phoneNumber ?? "",
         // publicPhoneNumber: user?.publicPhoneNumber ?? "",
      });
      console.log(user);
      
   }, [user]);

   if (!user) {
      return (
         <div className="p-4">
            <h2 className="mb-2 text-2xl font-semibold">Hesap Ayarları</h2>
            <p className="text-gray-600">Yükleniyor...</p>
         </div>
      );
   }

   const handleChange = (field, value) => {
      setAccount({
         ...account,
         [field]: value,
      });
   };

   const handleSave = async (field, value) => {
      putUser({
         [field]: value,
      })
         .then((res) => {
            if (res.status === 200) {
               setUser({
                  ...user,
                  [field]: value,
               });
            } else {
               console.error("Failed to update tags");
            }
         })
         .catch((error) => {
            console.error("Error updating tags:", error);
         });
   };

   return (
      <>
         <main className="flex-1">
            <h1 className="text-3xl font-semibold mb-6">Hesap Ayarları</h1>
            <section className="main">
               <ul className="max-w-3xl flex flex-col gap-6">
                  <li className="w-full flex items-end gap-4">
                     <label className="flex-1 flex flex-col  gap-4">
                        <span className="font-medium">Ad Soyad:</span>
                        <input
                           type="text"
                           className="w-full h-9 px-3 py-2 !bg-transparent border relative border-tertiary shadow shadow-tertiary rounded-2xl outline-none"
                           placeholder="Ad Soyad"
                           value={account?.name ?? ""}
                           onChange={(e) =>
                              handleChange("name", e.target.value)
                           }
                        />
                     </label>
                     <SecondaryBtn
                        onClick={() => handleSave("name", account.name)}>
                        Kaydet
                     </SecondaryBtn>
                  </li>

                  <li className="w-full flex items-end gap-4">
                     <label className="flex-1 flex flex-col  gap-4">
                        <span className="font-medium">Kullanıcı Adı:</span>
                        <input
                           type="text"
                           className="w-full h-9 px-3 py-2 !bg-transparent border relative border-tertiary shadow shadow-tertiary rounded-2xl outline-none"
                           placeholder="Kullanıcı Adı"
                           value={account?.userName ?? ""}
                           onChange={(e) =>
                              handleChange("userName", e.target.value)
                           }
                        />
                     </label>
                     <SecondaryBtn
                        onClick={() =>
                           handleSave("userName", account.userName)
                        }>
                        Kaydet
                     </SecondaryBtn>
                  </li>
                  <li className="w-full flex items-end gap-4">
                     <label className="flex-1 flex flex-col  gap-4">
                        <span className="font-medium">E-posta:</span>
                        <input
                           type="email"
                           className="w-full h-9 px-3 py-2 !bg-transparent border relative border-tertiary shadow shadow-tertiary rounded-2xl outline-none"
                           placeholder="E-posta"
                           value={account?.email ?? ""}
                           onChange={(e) =>
                              handleChange("email", e.target.value)
                           }
                        />
                     </label>
                     <SecondaryBtn
                        onClick={() => handleSave("email", account.email)}>
                        Kaydet
                     </SecondaryBtn>
                  </li>
                  <li className="w-full flex items-end gap-4">
                     <label className="flex-1 flex flex-col  gap-4">
                        <span className="font-medium">Görünen E-posta:</span>
                        <input
                           type="email"
                           className="w-full h-9 px-3 py-2 !bg-transparent border relative border-tertiary shadow shadow-tertiary rounded-2xl outline-none"
                           placeholder="Görünen E-posta"
                           value={account?.publicEmail ?? ""}
                           onChange={(e) =>
                              handleChange("publicEmail", e.target.value)
                           }
                        />
                     </label>
                     <SecondaryBtn
                        onClick={() =>
                           handleSave("publicEmail", account.publicEmail)
                        }>
                        Kaydet
                     </SecondaryBtn>
                  </li>

                  <li className="w-full flex items-end gap-4">
                     <label className="flex-1 flex flex-col  gap-4">
                        <span className="font-medium">Telefon Numarası:</span>
                        <input
                           type="tel"
                           className="w-full h-9 px-3 py-2 !bg-transparent border relative border-tertiary shadow shadow-tertiary rounded-2xl outline-none"
                           placeholder="Telefon Numarası"
                           value={account?.phoneNumber ?? ""}
                           onChange={(e) =>
                              handleChange("phoneNumber", e.target.value)
                           }
                        />
                     </label>
                     <SecondaryBtn
                        onClick={() =>
                           handleSave("phoneNumber", account.phoneNumber)
                        }>
                        Kaydet
                     </SecondaryBtn>
                  </li>
                  <li className="w-full flex items-end gap-4">
                     <label className="flex-1 flex flex-col gap-4">
                        <span className="font-medium">
                           Görünen Telefon Numarası:
                        </span>
                        <input
                           type="tel"
                           className="w-full h-9 px-3 py-2 !bg-transparent border relative border-tertiary shadow shadow-tertiary rounded-2xl outline-none"
                           placeholder="Görünen Telefon Numarası"
                           value={user.publicPhoneNumber ?? ""}
                           onChange={(e) =>
                              handleChange("publicPhoneNumber", e.target.value)
                           }
                        />
                     </label>
                     <SecondaryBtn
                        onClick={() =>
                           handleSave(
                              "publicPhoneNumber",
                              account.publicPhoneNumber
                           )
                        }>
                        Kaydet
                     </SecondaryBtn>
                  </li>
               </ul>
            </section>
         </main>
         <aside className="min-w-80 w-1/3 h-min">
            <CompleteProfile user={user} />
         </aside>
      </>
   );
}
