"use client";

import { useState } from "react";
import { SecondaryBtn } from "@/components/btn";

export default function PrimaryFormButton({
   type: initialType = "none",
   text: initialText = "",
   url: initialUrl = "",
}) {
   const {
      formState,
      handlers: { handleTypeChange, handleTextChange, handleUrlChange, handleSubmit },
   } = usePrimaryFormLogic({ initialType, initialText, initialUrl });

   return (
      <form
         onSubmit={handleSubmit}
         className="main p-6 rounded-lg shadow-sm border border-gray-200 flex flex-col gap-6"
         aria-labelledby="form-title"
      >
         <header>
            <h2 id="form-title" className="text-xl font-semibold text-gray-800">
               Birincil Buton Ayarları
            </h2>
            <p className="text-sm text-gray-500 mt-1">
               Sayfanızda görünecek ana aksiyon butonunu yapılandırın.
            </p>
         </header>

         <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormSelect
               label="Buton Türü"
               value={formState.type}
               onChange={handleTypeChange}
               options={[
                  { value: "none", label: "Görüntüleme (Yok)" },
                  { value: "price", label: "Fiyat Teklifi Al" },
                  { value: "custom", label: "Özel Bağlantı" },
               ]}
            />

            {formState.type === "custom" && (
               <>
                  <FormInput
                     label="Buton Metni"
                     value={formState.text}
                     onChange={handleTextChange}
                     placeholder="Örn: Hemen Başvur"
                     type="text"
                  />
                  <FormInput
                     label="Yönlendirilecek URL"
                     value={formState.url}
                     onChange={handleUrlChange}
                     placeholder="https://..."
                     type="url"
                  />
               </>
            )}
         </section>

         <footer className="flex justify-end pt-4 border-t border-gray-100">
            <SecondaryBtn type="submit">Değişiklikleri Kaydet</SecondaryBtn>
         </footer>
      </form>
   );
}

// --- Sub-Components ---

function FormSelect({ label, value, onChange, options }) {
   return (
      <label className="flex flex-col gap-2 w-full">
         <span className="text-sm font-medium text-gray-700">{label}</span>
         <select
            value={value}
            onChange={onChange}
            className="h-10 px-3 rounded-md border border-gray-300 bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200"
         >
            {options.map((opt) => (
               <option key={opt.value} value={opt.value}>
                  {opt.label}
               </option>
            ))}
         </select>
      </label>
   );
}

function FormInput({ label, value, onChange, placeholder, type = "text" }) {
   return (
      <label className="flex flex-col gap-2 w-full">
         <span className="text-sm font-medium text-gray-700">{label}</span>
         <input
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className="h-10 px-3 rounded-md border border-gray-300 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200"
         />
      </label>
   );
}

// --- Custom Hook (Logic) ---

function usePrimaryFormLogic({ initialType, initialText, initialUrl }) {
   const [type, setType] = useState(initialType);
   const [text, setText] = useState(initialText);
   const [url, setUrl] = useState(initialUrl);

   const handleTypeChange = (e) => setType(e.target.value);
   const handleTextChange = (e) => setText(e.target.value);
   const handleUrlChange = (e) => setUrl(e.target.value);

   const handleSubmit = (e) => {
      e.preventDefault();
      // Form submission logic here (e.g., API call)
      console.log("Form Submitted:", { type, text, url });
   };

   return {
      formState: { type, text, url },
      handlers: {
         handleTypeChange,
         handleTextChange,
         handleUrlChange,
         handleSubmit,
      },
   };
}
