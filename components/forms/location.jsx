"use client";
import { SecondaryBtn } from "@/components/btn";
import { putUser } from "@/services/user";
import { setAuthenticationUser } from "@/utils/auth";

export default function LocationInput({ defaultValue = "", title = "Konum" }) {
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
      <form onSubmit={handleSubmit} className="main">
         {/* <b className="py-2 inline-block">Konum</b> */}
         <div className="flex flex-col gap-4">
            <b>
               {title}
            </b>
            <label className="w-full  flex items-center gap-4 input">
               <span className="bx bx-current-location"></span>
               <input
                  type="text"
                  className="w-full bg-transparent outline-none"
                  placeholder="Enter your location"
                  defaultValue={defaultValue}
               />
            </label>
            <SecondaryBtn type="submit" className="w-min ml-auto">Kaydet</SecondaryBtn>
         </div>
      </form>
   );
}
