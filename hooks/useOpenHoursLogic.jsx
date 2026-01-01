import { putUser } from "@/services/user.js";
import { useState, useCallback } from "react";

export const DAYS = [
   { label: "Pazartesi", value: "Monday" },
   { label: "Salı", value: "Tuesday" },
   { label: "Çarşamba", value: "Wednesday" },
   { label: "Perşembe", value: "Thursday" },
   { label: "Cuma", value: "Friday" },
   { label: "Cumartesi", value: "Saturday" },
   { label: "Pazar", value: "Sunday" },
];

export function useOpenHoursLogic(
   initialWorkingHours = [
      {
         dayOfWeek: [],
         opens: "",
         closes: "",
      },
      {
         dayOfWeek: ["Sunday"],
         opens: "",
         closes: "",
      },
   ]
) {
   const [workingHours, setWorkingHours] = useState([...initialWorkingHours]);

   const handleTimeChange = useCallback((index, field, value) => {
      setWorkingHours((prev) => {
         const updated = [...prev];
         updated[index] = { ...updated[index], [field]: value };
         return updated;
      });
   }, []);

   const toggleDay = useCallback((index, dayValue) => {
      setWorkingHours((prev) => {
         const updated = [...prev];
         const currentDays = updated[index].dayOfWeek;

         if (currentDays.includes(dayValue)) {
            updated[index].dayOfWeek = currentDays.filter(
               (d) => d !== dayValue
            );
         } else {
            updated[index].dayOfWeek = [...currentDays, dayValue];
         }
         return updated;
      });
   }, []);

   const addSchedule = useCallback(() => {
      setWorkingHours((prev) => [
         ...prev,
         {
            dayOfWeek: [],
            opens: "09:00",
            closes: "18:00",
         },
      ]);
   }, []);

   const removeSchedule = useCallback((index) => {
      setWorkingHours((prev) => prev.filter((_, i) => i !== index));
   }, []);

   const handleSubmit = (e) => {
      e.preventDefault();
      console.log(workingHours);

      putUser({ workingHours })
         .then(() => {
            console.log("Çalışma saatleri başarıyla güncellendi.");
         })
         .catch(() => {
            console.log("Çalışma saatleri güncellenirken bir hata oluştu.");
         });
   };

   return {
      workingHours,
      handleTimeChange,
      toggleDay,
      addSchedule,
      removeSchedule,
      handleSubmit,
      days: DAYS,
   };
}
