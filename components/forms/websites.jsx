"use client";
import { SecondaryBtn } from "@/components/btn";
import { socialMediaIcons } from "@/utils/iconList";
import { useWebsiteLogic } from "@/hooks/useWebsiteLogic";

const WebsiteItem = ({
   siteKey,
   url,
   onKeyChange,
   onUrlChange,
   onRemove,
   iconMap,
}) => {
   return (
      <li className="flex flex-col md:flex-row items-stretch gap-3 p-3 border rounded-lg bg-card/50 hover:bg-card transition-colors">
         <div className="flex flex-col gap-1.5 w-full md:w-48">
            <label
               className="text-xs font-medium text-muted-foreground flex items-center gap-1.5"
               htmlFor={`site-key-${siteKey}`}>
               <i className={`bx ${iconMap[siteKey] ?? "bx-globe"} text-base`}></i>
               Platform
            </label>
            <select
               id={`site-key-${siteKey}`}
               className="h-9 px-2 rounded-md border bg-background text-sm focus:ring-2 focus:ring-primary/20 outline-none"
               value={siteKey}
               onChange={(e) => onKeyChange(siteKey, e.target.value)}>
               <option disabled>Seçiniz</option>
               {Object.keys(iconMap).map((iconKey) => (
                  <option key={iconKey} value={iconKey}>
                     {iconKey}
                  </option>
               ))}
            </select>
         </div>

         <div className="flex-1 flex flex-col gap-1.5">
            <label
               className="text-xs font-medium text-muted-foreground"
               htmlFor={`site-url-${siteKey}`}>
               URL Adresi
            </label>
            <input
               id={`site-url-${siteKey}`}
               className="h-9 px-3 rounded-md border bg-background text-sm w-full focus:ring-2 focus:ring-primary/20 outline-none placeholder:text-muted-foreground/50"
               placeholder="https://..."
               inputMode="url"
               autoComplete="url"
               value={url || ""}
               onChange={(e) => onUrlChange(siteKey, e.target.value)}
            />
         </div>

         <div className="flex items-end pb-0.5">
            <button
               type="button"
               onClick={() => onRemove(siteKey)}
               className="p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-md transition-colors"
               aria-label="Kaldır">
               <i className="bx bx-trash text-xl"></i>
            </button>
         </div>
      </li>
   );
};

export default function FormsWebsite({
   websites = {},
   title = "Web Siteleri",
   onUpdated,
}) {
   const {
      values,
      submitting,
      handleValueChange,
      handleKeyChange,
      handleRemove,
      handleAdd,
      handleSubmit,
   } = useWebsiteLogic(websites || {}, onUpdated);

   return (
      <form onSubmit={handleSubmit} className="main w-full space-y-6">
         <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">{title}</h3>
            <button
               type="button"
               onClick={handleAdd}
               className="text-sm text-primary hover:underline flex items-center gap-1">
               <i className="bx bx-plus"></i> Yeni Ekle
            </button>
         </div>

         <ul className="space-y-3">
            {Object.entries(values).map(([key, value]) => (
               <WebsiteItem
                  key={key}
                  siteKey={key}
                  url={value}
                  iconMap={socialMediaIcons}
                  onKeyChange={handleKeyChange}
                  onUrlChange={handleValueChange}
                  onRemove={handleRemove}
               />
            ))}
         </ul>

         <div className="flex justify-end">
            <SecondaryBtn type="submit" disabled={submitting}>
               {submitting ? "Kaydediliyor..." : "Değişiklikleri Kaydet"}
            </SecondaryBtn>
         </div>
      </form>
   );
}
