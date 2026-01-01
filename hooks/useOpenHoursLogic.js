const toggleDay = useCallback((index, dayValue) => {
   setWorkingHours((prev) => {
      const updated = [...prev];
      const currentDays = updated[index].dayOfWeek;

      if (currentDays.includes(dayValue)) {
         updated[index].dayOfWeek = currentDays.filter((d) => d !== dayValue);
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
   console.log("Submitted Working Hours:", workingHours);
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
