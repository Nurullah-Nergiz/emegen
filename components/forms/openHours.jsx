"use client";

import { useOpenHoursLogic } from "@/hooks/useOpenHoursLogic";
import { SecondaryBtn } from "@/components/btn";
import { useState } from "react";

// Sub-component: Handles the list of selectable days
const DaySelector = ({ selectedDays, onToggle, days }) => (
   <div
      className="flex flex-wrap gap-2"
      role="group"
      aria-label="Select working days">
      {days.map((day) => {
         const isSelected = selectedDays.includes(day.value);
         return (
            <label
               key={day.value}
               className={`
                  cursor-pointer px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 border
                  ${
                     isSelected
                        ? "bg-primary text-primary-foreground border-primary shadow-sm"
                        : "bg-accent/50 text-muted-foreground border-transparent hover:bg-accent hover:text-accent-foreground"
                  }
                  focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2
               `}>
               {day.label}
               <input
                  type="checkbox"
                  className="sr-only"
                  checked={isSelected}
                  onChange={() => onToggle(day.value)}
               />
            </label>
         );
      })}
   </div>
);

// Sub-component: Handles time inputs
const TimeInputs = ({ opens, closes, onTimeChange }) => (
   <div className="flex items-center gap-4 text-sm">
      <div className="flex flex-col gap-1.5">
         <label className="font-medium text-muted-foreground">Açılış</label>
         <input
            type="time"
            value={opens}
            onChange={(e) => onTimeChange("opens", e.target.value)}
            className="px-3 py-2 border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow"
         />
      </div>
      <span className="mt-6 text-muted-foreground">-</span>
      <div className="flex flex-col gap-1.5">
         <label className="font-medium text-muted-foreground">Kapanış</label>
         <input
            type="time"
            value={closes ?? "00:00"}
            onChange={(e) => onTimeChange("closes", e.target.value)}
            className="px-3 py-2 border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow"
         />
      </div>
   </div>
);

export default function FormsOpenHours({ user }) {
   const {
      workingHours,
      handleTimeChange,
      toggleDay,
      handleSubmit,
      days,
      addSchedule,
      removeSchedule,
   } = useOpenHoursLogic(user?.workingHours);

   return (
      <form
         onSubmit={handleSubmit}
         className="main border rounded-xl shadow-sm bg-card text-card-foreground">
         <header className="border-b pb-4">
            <h2 className="text-2xl font-bold tracking-tight">
               Çalışma Saatleri
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
               İşletmenizin açık olduğu gün ve saatleri düzenleyin.
            </p>
         </header>

         <div className="space-y-8">
            {workingHours.map((schedule, index) => (
               <fieldset
                  key={index}
                  className="p-4 rounded-lg border bg-muted/10 space-y-4">
                  <div className="flex items-center justify-between">
                     <legend className="px-2 text-sm font-semibold text-primary">
                        Zaman Çizelgesi #{index + 1}
                     </legend>
                     <button
                        type="button"
                        onClick={() => removeSchedule(index)}
                        className="text-xs text-red-600 hover:text-red-800 font-medium px-2 py-1 hover:bg-red-50 rounded transition-colors">
                        Sil
                     </button>
                  </div>

                  <DaySelector
                     days={days}
                     selectedDays={schedule.dayOfWeek}
                     onToggle={(dayValue) => toggleDay(index, dayValue)}
                  />

                  <div className="pt-2 border-t">
                     <TimeInputs
                        opens={schedule.opens}
                        closes={schedule.closes}
                        onTimeChange={(field, value) =>
                           handleTimeChange(index, field, value)
                        }
                     />
                  </div>
               </fieldset>
            ))}
         </div>

         <div className="pt-4 px-1">
            <button
               type="button"
               onClick={addSchedule}
               className="text-sm font-medium text-primary hover:underline flex items-center gap-1">
               <span>+</span> Yeni Zaman Çizelgesi Ekle
            </button>
         </div>

         <div className="flex justify-end pt-4">
            <SecondaryBtn type="submit" className="px-6 py-2 text-sm">
               Değişiklikleri Kaydet
            </SecondaryBtn>
         </div>
      </form>
   );
}
