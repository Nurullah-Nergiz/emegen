"use client";

import { SecondaryBtn } from "@/components/btn";
import { putUser } from "@/services/user";
import { useState } from "react";

export default function FormsBusinessType({ user, setUser }) {
   const [businessType, setBusinessType] = useState("");

   return (
      <>
         <div className="main">
            {/* buisiness type */}
            <div className="mb-4">
               <label htmlFor="businessType" className="block mb-2 font-medium">
                  İşletme Türü
               </label>
               <select
                  id="businessType"
                  name="businessType"
                  defaultValue={user?.businessType || ""}
                  className="w-full text-black border border-gray-300 rounded-md p-2"
                  onChange={(e) => setBusinessType(e.target.value)}>
                  {[
                     "LocalBusiness",
                     "ConstructionBusiness", //
                     "HomeAndConstructionBusiness",
                     "ProfessionalService",
                     "Restaurant",
                     "CafeOrCoffeeShop",
                     "Bakery",
                     "FoodEstablishment",
                     "LegalService",
                     "AccountingService",
                     "RealEstateAgent",
                     "AutoRepair",
                     "AutoDealer",
                     "GasStation",
                     "Store",
                     "ClothingStore",
                     "ElectronicsStore",
                     "GroceryStore",
                     "GeneralContractor",
                     "Electrician",
                     "Plumber",
                     "HVACBusiness",
                     "Locksmith",
                     "CleaningService",
                     "MovingCompany",
                     "LandscapeService",
                     "HairSalon",
                     "BeautySalon",
                     "NailSalon",
                     "DaySpa",
                     "HealthClub",
                     "MedicalBusiness",
                     "Dentist",
                     "CafeOrCoffeeShop",
                     "BarOrPub",
                     "FastFoodRestaurant",
                     "Attorney",
                     "AccountingService",
                     "InsuranceAgency",
                     "AutoDealer",
                     "School",
                     "ChildCare",
                     "TravelAgency",
                     "PetStore",
                     "DryCleaningOrLaundry",
                  ].map((type, i) => (
                     <option key={`buisiness-type${type}-${i}`} value={type}>
                        {type}
                     </option>
                  ))}
               </select>
            </div>
            <SecondaryBtn
               onClick={() =>
                  putUser({ businessType: businessType }).then((res) =>
                     setUser(res.data.user)
                  )
               }>
               Değişiklikleri Kaydet
            </SecondaryBtn>
         </div>
      </>
   );
}
