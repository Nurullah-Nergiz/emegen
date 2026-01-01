import { useState, useEffect, useCallback } from "react";
import { putUser } from "@/services/user";

export const useWebsiteLogic = (initialWebsites = {}, onUpdated) => {
   const DEFAULT_KEYS = { website: "" };
   const [values, setValues] = useState({ ...DEFAULT_KEYS, ...initialWebsites });
   const [submitting, setSubmitting] = useState(false);

   useEffect(() => {
      setValues({ ...DEFAULT_KEYS, ...initialWebsites });
   }, [initialWebsites]);

   const handleValueChange = useCallback((key, newValue) => {
      setValues((prev) => ({ ...prev, [key]: newValue }));
   }, []);

   const handleKeyChange = useCallback((oldKey, newKey) => {
      const trimmedKey = newKey.trim();
      if (!trimmedKey || trimmedKey === oldKey) return;

      setValues((prev) => {
         const { [oldKey]: val, ...rest } = prev;
         if (Object.prototype.hasOwnProperty.call(rest, trimmedKey)) {
            return prev;
         }
         return { ...rest, [trimmedKey]: val };
      });
   }, []);

   const handleRemove = useCallback((key) => {
      setValues((prev) => {
         const { [key]: _, ...rest } = prev;
         return rest;
      });
   }, []);

   const handleAdd = useCallback(() => {
      setValues((prev) => {
         let idx = 1;
         let newKey = `custom${idx}`;
         while (Object.prototype.hasOwnProperty.call(prev, newKey)) {
            idx += 1;
            newKey = `custom${idx}`;
         }
         return { ...prev, [newKey]: "" };
      });
   }, []);

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

   return {
      values,
      submitting,
      handleValueChange,
      handleKeyChange,
      handleRemove,
      handleAdd,
      handleSubmit,
   };
};
