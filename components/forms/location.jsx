"use client";
import Cookies from "js-cookie";
import { PrimaryBtn } from "@/components/btn";
import { putUser } from "@/services/user";
import {
   getAuthenticationToken,
   getAuthenticationUser,
   setAuthenticationUser,
} from "@/utils/auth";

export default function LocationInput({ children, user, userToken }) {
   const handleSubmit = (e) => {
      e.preventDefault();
      const inputValue = e.target[0].value.trim();

      if (inputValue) {
         putUser({
            location: inputValue,
         })
            .then(({ data }) => {
               setAuthenticationUser(data.user);
            })
            .catch((err) => {
               console.error("Error updating location:", err);
            });
      }
   };

   return (
      <form onSubmit={handleSubmit}>
         {/* <b className="py-2 inline-block">Konum</b> */}
         <div className="flex items-center gap-2">
            <label className="w-full  flex items-center gap-4 input">
               <span className="bx bx-current-location"></span>
               <input
                  type="text"
                  className="w-full bg-transparent outline-none"
                  placeholder="Enter your location"
                  defaultValue={user?.location || "Çumra"}
               />
            </label>
            <PrimaryBtn type="submit">Kaydet</PrimaryBtn>
         </div>
      </form>
   );
}
