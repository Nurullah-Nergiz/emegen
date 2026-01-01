"use client";

import { SecondaryBtn } from "@/components/btn";
import { putUser } from "@/services/user";
import { useState, useEffect } from "react";

const BUSINESS_TYPES = [
   {
      value: "LocalBusiness",
      label: "Yerel İşletme",
   },
   {
      value: "Restaurant",
      label: "Restoran",
   },
   {
      value: "ConstructionBusiness",
      label: "İnşaat İşletmesi",
   },
   {
      value: "HomeAndConstructionBusiness",
      label: "Ev ve İnşaat İşletmesi",
   },
   {
      value: "ProfessionalService",
      label: "Profesyonel Hizmet",
   },
   {
      value: "CafeOrCoffeeShop",
      label: "Kafe veya Kahve Dükkanı",
   },
   {
      value: "Bakery",
      label: "Fırın",
   },
   {
      value: "FoodEstablishment",
      label: "Yiyecek İşletmesi",
   },
   {
      value: "LegalService",
      label: "Hukuk Hizmeti",
   },
   {
      value: "AccountingService",
      label: "Muhasebe Hizmeti",
   },
   {
      value: "RealEstateAgent",
      label: "Emlakçı",
   },
   {
      value: "AutoRepair",
      label: "Oto Tamir",
   },
   {
      value: "AutoDealer",
      label: "Oto Galeri",
   },
   {
      value: "GasStation",
      label: "Benzin İstasyonu",
   },
   {
      value: "Store",
      label: "Mağaza",
   },
   {
      value: "ClothingStore",
      label: "Giyim Mağazası",
   },
   {
      value: "ElectronicsStore",
      label: "Elektronik Mağazası",
   },
   {
      value: "GroceryStore",
      label: "Market",
   },
   {
      value: "GeneralContractor",
      label: "Genel Müteahhit",
   },
   {
      value: "Electrician",
      label: "Elektrikçi",
   },
   {
      value: "Plumber",
      label: "Tesisatçı",
   },
   {
      value: "HVACBusiness",
      label: "Isıtma ve Soğutma (HVAC)",
   },
   {
      value: "Locksmith",
      label: "Çilingir",
   },
   {
      value: "CleaningService",
      label: "Temizlik Hizmeti",
   },
   {
      value: "MovingCompany",
      label: "Nakliye Şirketi",
   },
   {
      value: "LandscapeService",
      label: "Peyzaj Hizmeti",
   },
   {
      value: "HairSalon",
      label: "Kuaför",
   },
   {
      value: "BeautySalon",
      label: "Güzellik Salonu",
   },
   {
      value: "NailSalon",
      label: "Tırnak Salonu",
   },
   {
      value: "DaySpa",
      label: "Gündüz Spası",
   },
   {
      value: "HealthClub",
      label: "Sağlık Kulübü",
   },
   {
      value: "MedicalBusiness",
      label: "Tıbbi İşletme",
   },
   {
      value: "Dentist",
      label: "Diş Hekimi",
   },
   {
      value: "BarOrPub",
      label: "Bar veya Pub",
   },
   {
      value: "FastFoodRestaurant",
      label: "Fast Food Restoranı",
   },
   {
      value: "Attorney",
      label: "Avukat",
   },
   {
      value: "InsuranceAgency",
      label: "Sigorta Acentesi",
   },
   {
      value: "School",
      label: "Okul",
   },
   {
      value: "ChildCare",
      label: "Çocuk Bakımı",
   },
   {
      value: "TravelAgency",
      label: "Seyahat Acentesi",
   },
   {
      value: "PetStore",
      label: "Evcil Hayvan Mağazası",
   },
   {
      value: "DryCleaningOrLaundry",
      label: "Kuru Temizleme veya Çamaşırhane",
   },
];

export default function FormsBusinessType({ user, setUser }) {
   const [businessType, setBusinessType] = useState(user?.businessType || "");
   const [loading, setLoading] = useState(false);

   useEffect(() => {
      if (user?.businessType) {
         setBusinessType(user.businessType);
      }
   }, [user]);

   const handleSave = async () => {
      if (!businessType) return;

      setLoading(true);
      try {
         const res = await putUser({ businessType });
         setUser(res.data.user);
      } catch (error) {
         console.error("Failed to update business type:", error);
      } finally {
         setLoading(false);
      }
   };

   return (
      <section className="main rounded-lg shadow-sm border border-gray-100 ">
         <header className="mb-6">
            <h2 className="text-lg font-semibold text-gray-800">
               İşletme Ayarları
            </h2>
            <p className="text-sm text-gray-500 mt-1">
               İşletmenizin kategorisini belirleyin.
            </p>
         </header>

         <div className="">
            <div className="flex flex-col gap-2">
               <label
                  htmlFor="businessType"
                  className="text-sm font-medium text-gray-700">
                  İşletme Türü
               </label>
               <div className="relative">
                  <select
                     id="businessType"
                     name="businessType"
                     value={businessType}
                     onChange={(e) => setBusinessType(e.target.value)}
                     className="w-full appearance-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 transition-colors duration-200 hover:bg-gray-100 cursor-pointer"
                     aria-label="İşletme türü seçimi">
                     <option value="" disabled>
                        Seçiniz...
                     </option>
                     {BUSINESS_TYPES.map((type, i) => (
                        <option key={`${type}-${i}`} value={type.value}>
                           {type.label}
                        </option>
                     ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                     <svg
                        className="fill-current h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20">
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                     </svg>
                  </div>
               </div>
            </div>

            <div className="flex justify-end pt-2">
               <SecondaryBtn
                  onClick={handleSave}
                  disabled={loading}
                  className={`w-full sm:w-auto transition-opacity ${
                     loading ? "opacity-70 cursor-not-allowed" : ""
                  }`}>
                  {loading ? "Kaydediliyor..." : "Değişiklikleri Kaydet"}
               </SecondaryBtn>
            </div>
         </div>
      </section>
   );
}
