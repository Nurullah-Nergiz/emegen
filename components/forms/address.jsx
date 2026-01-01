"use client";
import { useState } from "react";
import { SecondaryBtn } from "@/components/btn";
import { putUser } from "@/services/user";
import { setAuthenticationUser } from "@/utils/auth";

const defaultLocation = {
   streetAddress: "",
   city: "",
   district: "",
   country: "",
   zipCode: "",
};

const useAddressForm = (defaultValue) => {
   const [location, setLocation] = useState({
      ...defaultLocation,
      ...defaultValue,
   });
   const [loading, setLoading] = useState(false);

   const handleChange = (e) => {
      const { name, value } = e.target;
      setLocation((prev) => ({ ...prev, [name]: value }));
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);

      try {
         const { data } = await putUser({ address: location });
         setAuthenticationUser(data.user);
         // Optional: Add success toast/notification here
      } catch (err) {
         console.error("Error updating location:", err);
         // Optional: Add error toast/notification here
      } finally {
         setLoading(false);
      }
   };

   return { location, loading, handleChange, handleSubmit };
};

const InputField = ({
   label,
   name,
   type = "text",
   value,
   onChange,
   placeholder,
   ...props
}) => (
   <label className="flex flex-col gap-1.5 w-full">
      <span className="text-sm font-medium ">{label}</span>
      <input
         name={name}
         type={type}
         className="w-full px-3 py-2 bg-white text-black border border-gray-300 dark:border-gray-700 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
         placeholder={placeholder}
         value={value || ""}
         onChange={onChange}
         {...props}
      />
   </label>
);

const SelectField = ({ label, name, value, onChange, options }) => (
   <label className="flex flex-col gap-1.5 w-full">
      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
         {label}
      </span>
      <div className="relative">
         <select
            name={name}
            className="w-full px-3 py-2 bg-white text-black border border-gray-300 dark:border-gray-700 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none transition-all duration-200 cursor-pointer"
            value={value || ""}
            onChange={onChange}>
            <option value="" disabled>
               Select {label}
            </option>
            {options.map((opt) => (
               <option key={opt} value={opt}>
                  {opt}
               </option>
            ))}
         </select>
         <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none text-gray-500">
            <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
               <path
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                  fillRule="evenodd"
               />
            </svg>
         </div>
      </div>
   </label>
);

export default function AddressForm({
   defaultValue,
   title = "Konum Bilgileri",
}) {
   const { location, loading, handleChange, handleSubmit } =
      useAddressForm(defaultValue);

   const countries = [
      "Turkey",
      "United States",
      "United Kingdom",
      "Germany",
      "France",
   ];

   return (
      <section className="main rounded-xl shadow-sm border border-gray-100 dark:border-gray-800">
         <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <header className="border-b border-gray-100 dark:border-gray-800 pb-4">
               <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {title}
               </h2>
               <p className="text-sm text-gray-500 mt-1">
                  Lütfen adres bilgilerinizi eksiksiz giriniz.
               </p>
            </header>

            <div className="space-y-4">
               <InputField
                  label="Adres"
                  name="streetAddress"
                  placeholder="Cadde, sokak, bina no..."
                  value={location.streetAddress}
                  onChange={handleChange}
               />

               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InputField
                     label="Şehir"
                     name="city"
                     placeholder="İstanbul"
                     value={location.city}
                     onChange={handleChange}
                  />
                  <InputField
                     label="İlçe / Eyalet"
                     name="district"
                     placeholder="Kadıköy"
                     value={location.district}
                     onChange={handleChange}
                  />
                  <SelectField
                     label="Ülke"
                     name="country"
                     value={location.country}
                     onChange={handleChange}
                     options={countries}
                  />
                  <InputField
                     label="Posta Kodu"
                     name="zipCode"
                     type="text"
                     placeholder="34000"
                     value={location.zipCode}
                     onChange={handleChange}
                  />
               </div>
            </div>

            <footer className="flex justify-end pt-2">
               <SecondaryBtn
                  type="submit"
                  disabled={loading}
                  className={`px-6 py-2 transition-opacity ${
                     loading ? "opacity-70 cursor-not-allowed" : ""
                  }`}>
                  {loading ? "Kaydediliyor..." : "Değişiklikleri Kaydet"}
               </SecondaryBtn>
            </footer>
         </form>
      </section>
   );
}
