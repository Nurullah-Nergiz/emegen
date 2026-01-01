"use client";
import { PrimaryBtn } from "@/components/btn";
import { usePhoneNumberLogic } from "@/hooks/usePhoneNumberLogic";

export default function FormsPhoneNumber({ defaultValue = "" }) {
   const { phone, loading, handleChange, handleSubmit } = usePhoneNumberLogic(defaultValue);

   return (
      <form onSubmit={handleSubmit} className="flex items-center gap-3">
         <div className="relative flex items-center">
            <span className="absolute left-3 text-muted-foreground select-none pointer-events-none">
               +90
            </span>
            <input
               type="tel"
               className="pl-12 pr-4 py-2 h-10 w-full md:w-64 bg-transparent border border-input rounded-lg shadow-sm outline-none focus:ring-2 focus:ring-primary/50 transition-all placeholder:text-muted-foreground/50"
               value={phone}
               onChange={handleChange}
               maxLength={12} // 3 + 3 + 4 + 2 spaces
               placeholder="5xx xxx xxxx"
               aria-label="Telefon Numarası"
            />
         </div>
         <PrimaryBtn type="submit" disabled={loading}>
            {loading ? "..." : "Kaydet"}
         </PrimaryBtn>
      </form>
   );
}
