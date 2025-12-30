"use client";
import { SecondaryBtn } from "@/components/btn";
import { putUser } from "@/services/user";
import { socialMediaIcons } from "@/utils/iconList";
import { useEffect, useState } from "react";

/**
 *
 * @param {Object} props
 * @param {Object} props.websites
 * @param {String} props.title
 * @param {(updatedWebsites: Object) => void} [props.onUpdated]
 * @description A form component for entering websites URLs (dynamic keys).
 * @returns React.Component
 */
export default function FormsWebsite({
   websites = {},
   title = "Web Siteleri",
   onUpdated,
}) {
   const DEFAULT_KEYS = {
      website: "",
   };

   // local state mirrors whatever keys are in `websites` (fall back to defaults)
   const [values, setValues] = useState({
      ...DEFAULT_KEYS,
      ...websites,
   });
   const [submitting, setSubmitting] = useState(false);

   // keep in sync if parent `websites` prop changes
   useEffect(() => {
      setValues({
         ...DEFAULT_KEYS,
         ...websites,
      });
   }, [websites]);

   const handleValueChange = (key) => (e) => {
      const v = e.target.value;
      // avoid throwing on invalid URL while typing
      try {
         // simple parse to normalize if needed
         // eslint-disable-next-line no-new
         new URL(v);
      } catch {
         // ignore parsing errors during input
      }

      setValues((prev) => ({ ...prev, [key]: v }));
   };

   const handleKeyChange = (oldKey) => (e) => {
      const newKey = e.target.value.trim();
      if (!newKey || newKey === oldKey) return;
      setValues((prev) => {
         const { [oldKey]: val, ...rest } = prev;
         // avoid overwriting if key already exists
         if (Object.prototype.hasOwnProperty.call(rest, newKey)) {
            return prev;
         }
         return { ...rest, [newKey]: val };
      });
   };

   const handleRemove = (key) => {
      setValues((prev) => {
         const { [key]: _, ...rest } = prev;
         return rest;
      });
   };

   const handleAdd = () => {
      // find a unique default key like "custom1", "custom2", ...
      let idx = 1;
      let newKey = `custom${idx}`;
      while (Object.prototype.hasOwnProperty.call(values, newKey)) {
         idx += 1;
         newKey = `custom${idx}`;
      }
      setValues((prev) => ({ ...prev, [newKey]: "" }));
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      setSubmitting(true);
      try {
         const res = await putUser({ websites: { ...values } });
         if (onUpdated && res?.data?.user?.websites) {
            onUpdated(res.data.user.websites);
         }
         console.log("Websites updated successfully");
      } catch (error) {
         console.error("Error updating websites:", error);
      } finally {
         setSubmitting(false);
      }
   };

   const entries = Object.entries(values);

   return (
      <form onSubmit={handleSubmit} className="main flex flex-col gap-4">
         <span className="font-medium">Web Siteleri</span>

         <ul className="flex flex-col gap-4 mt-2">
            {entries.map(([key, value]) => (
               <li key={key} className="flex items-stretch gap-2">
                  <div className="flex items-center gap-2">
                     <i
                        className={`bx ${
                           socialMediaIcons[key] ?? "bx-globe"
                        }`}></i>

                     <label className="">
                        Site Türü
                        <select
                           id={`site-key-${key}`}
                           className="input w-40 md:w-48"
                           value={key}
                           onChange={handleKeyChange(key)}>
                           <option disabled>Bir site seçin</option>
                           {Object.entries(socialMediaIcons).map(
                              ([iconKey]) => (
                                 <option key={iconKey} value={iconKey}>
                                    {iconKey}
                                 </option>
                              )
                           )}
                        </select>
                     </label>
                  </div>
                  <div className="flex flex-1 flex-col gap-1">
                     <label className="" htmlFor={`site-url-${key}`}>
                        Site URL'si
                     </label>
                     <input
                        id={`site-url-${key}`}
                        className="input w-full"
                        placeholder="https://ornek.com/profil"
                        inputMode="url"
                        autoComplete="url"
                        value={value || ""}
                        onChange={handleValueChange(key)}
                     />
                  </div>

                  <div className="flex items-end gap-2">
                     <button
                        className="bx bx-plus-circle text-2xl "
                        type="button"
                        onClick={handleAdd}></button>
                     <button
                        type="button"
                        onClick={() => handleRemove(key)}
                        className="bx bx-minus-circle text-2xl "></button>
                  </div>
               </li>
            ))}
         </ul>
         <div className="justify-self-end ml-auto">
            <SecondaryBtn type="submit" disabled={submitting}>
               {submitting ? "Kaydediliyor..." : "Değişiklikleri Kaydet"}
            </SecondaryBtn>
         </div>
      </form>
   );
}
