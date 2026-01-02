"use client";
import { useEffect, useState } from "react";

export default function HeaderWorkingHours({ workingHours = [] }) {
   return (
      <>{workingHours.length > 0 && <StatusIndicator data={workingHours} />}</>
   );
}

const StatusIndicator = ({ data }) => {
   const [mounted, setMounted] = useState(false);

   useEffect(() => {
      setMounted(true);
   }, []);

   const formatFullSchedule = () => {
      const dayMapping = {
         Monday: "Pzt",
         Tuesday: "Sal",
         Wednesday: "Çar",
         Thursday: "Per",
         Friday: "Cum",
         Saturday: "Cmt",
         Sunday: "Paz",
      };

      return data
         .map((item) => {
            const days = item.dayOfWeek
               .map((d) => dayMapping[d] || d)
               .join(", ");
            return `${days}: ${item.opens} - ${item.closes}`;
         })
         .join("\n");
   };

   const checkIsOpen = () => {
      const now = new Date();
      const dayNames = [
         "Sunday",
         "Monday",
         "Tuesday",
         "Wednesday",
         "Thursday",
         "Friday",
         "Saturday",
      ];
      const todayName = dayNames[now.getDay()];
      const currentTime =
         now.getHours().toString().padStart(2, "0") +
         ":" +
         now.getMinutes().toString().padStart(2, "0");

      const todaySchedule = data.find((d) => d.dayOfWeek.includes(todayName));

      if (!todaySchedule) return { label: "Kapalı", color: "text-red-500" };

      const formattedHours = `${todaySchedule.opens} - ${todaySchedule.closes}`;

      if (
         currentTime >= todaySchedule.opens &&
         currentTime <= todaySchedule.closes
      ) {
         return {
            label: "Şu An Açık",
            color: "text-green-600",
            desc: formattedHours,
         };
      }
      return {
         label: "Mesai Dışı",
         color: "text-orange-500",
         desc: formattedHours,
      };
   };

   if (!mounted) return null;

   const status = checkIsOpen();

   return (
      <div
         className={`flex items-center gap-2 font-bold ${status.color} cursor-help`}
         title={formatFullSchedule()}
      >
         <span className="relative flex h-3 w-3">
            <span
               className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 bg-current`}></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-current"></span>
         </span>
         {status.label}
         {status.desc && (
            <span className="text-xs font-medium opacity-80">
               ({status.desc})
            </span>
         )}
      </div>
   );
};
