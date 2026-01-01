import { useState } from "react";
import { putUser } from "@/services/user";

export const usePhoneNumberLogic = (initialValue = "") => {
   const [phone, setPhone] = useState(initialValue);
   const [loading, setLoading] = useState(false);

   const formatPhoneNumber = (value) => {
      // Remove non-digits
      const cleaned = value.replace(/\D/g, "");
      // Format as 5xx xxx xxxx
      const match = cleaned.match(/^(\d{1,3})(\d{0,3})(\d{0,4}).*/);
      if (match) {
         return [match[1], match[2], match[3]].filter(Boolean).join(" ");
      }
      return value;
   };

   const handleChange = (e) => {
      const formatted = formatPhoneNumber(e.target.value);
      setPhone(formatted);
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      try {
         // Assuming the API expects a clean number or specific format
         await putUser({ phoneNumber: phone.replace(/\s/g, "") });
         console.log("Phone number updated");
      } catch (error) {
         console.error("Error updating phone:", error);
      } finally {
         setLoading(false);
      }
   };

   return {
      phone,
      loading,
      handleChange,
      handleSubmit,
   };
};
