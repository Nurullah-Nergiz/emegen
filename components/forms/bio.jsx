"use client";
import { SecondaryBtn } from "@/components/btn";
import { putUser } from "@/services/user";
import { use, useRef } from "react";
import userContext from "../provider/userContext";

export default function BiographyEditor({ defaultValue = "" }) {
   const [user, setUser] = use(userContext);
   const bioInputRef = useRef();

   const updateUserBio = (e) => {
      putUser({
         bio: bioInputRef?.current?.value || null,
      })
         .then((data) => {
            setUser({ ...user, bio: bioInputRef?.current?.value || null });
            console.log(data);
         })
         .catch((error) => {
            // Handle error here, e.g., show an error message
            console.error("Error updating bio:", error);
         });
   };

   return (
      <>
         <div className="main flex flex-col gap-4">
            <b>Bio</b>
            <textarea
               className="w-full h-24 px-3 py-2 !bg-transparent border relative border-tertiary shadow shadow-tertiary rounded-2xl outline-none"
               defaultValue={defaultValue}
               ref={bioInputRef}
               placeholder="Kendinizi tanıtın"></textarea>
            <SecondaryBtn className="ml-auto" onClick={updateUserBio}>
               Güncelle
            </SecondaryBtn>
         </div>
      </>
   );
}
