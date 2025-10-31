"use client";
import { useState } from "react";
import { SecondaryBtn } from "@/components/btn";
import { putUser } from "@/services/user";
import { setAuthenticationUser } from "@/utils/auth";

const defaultLocation = {
   address: "",
   city: "",
   state: "",
   country: "",
   zipCode: "",
};

export default function LocationInput({ defaultValue, title = "Konum" }) {
   const [location, setLocation] = useState({
      // ...defaultLocation,
      ...defaultValue,
   });

   const handleChange = (e) => {
      const { name, value } = e.target;
      setLocation((prev) => ({ ...prev, [name]: value }));
   };

   const handleSubmit = (e) => {
      e.preventDefault();

      const formData = new FormData(e.target);
      const locationData = {};
      for (let [key, value] of formData.entries()) {
         locationData[key] = value;
      }

      // Filter out empty values if needed, or perform validation
      putUser({
         location: locationData,
      })
         .then(({ data }) => {
            setAuthenticationUser(data.user);
         })
         .catch((err) => {
            console.error("Error updating location:", err);
         });
   };

   return (
      <form onSubmit={handleSubmit} className="main">
         <div className="flex flex-col gap-4">
            <b>{title}</b>
            <label className="w-full flex flex-col gap-1">
               <span className="text-sm">Address</span>
               <input
                  name="full_address"
                  type="text"
                  className="w-full bg-transparent outline-none input"
                  placeholder="Enter your address"
                  value={location.full_address}
                  onChange={handleChange}
               />
            </label>
            <div className="grid grid-cols-2 gap-4">
               <label className="w-full flex flex-col gap-1">
                  <span className="text-sm">City</span>
                  <input
                     name="city"
                     type="text"
                     className="w-full bg-transparent outline-none input"
                     placeholder="City"
                     value={location.city}
                     onChange={handleChange}
                  />
               </label>
               <label className="w-full flex flex-col gap-1">
                  <span className="text-sm">State</span>
                  <input
                     name="district"
                     type="text"
                     className="w-full bg-transparent outline-none input"
                     placeholder="State"
                     value={location.district}
                     onChange={handleChange}
                  />
               </label>
               <label className="w-full flex flex-col gap-1">
                  <span className="text-sm">Country</span>
                  <input
                     name="country"
                     type="text"
                     className="w-full bg-transparent outline-none input"
                     placeholder="Country"
                     value={location.country}
                     onChange={handleChange}
                  />
               </label>
               <label className="w-full flex flex-col gap-1">
                  <span className="text-sm">Zip Code</span>
                  <input
                     name="zipCode"
                     type="text"
                     className="w-full bg-transparent outline-none input"
                     placeholder="Zip Code"
                     value={location.zipCode}
                     onChange={handleChange}
                  />
               </label>
            </div>
            <SecondaryBtn type="submit" className="w-min ml-auto">
               Kaydet
            </SecondaryBtn>
         </div>
      </form>
   );
}
