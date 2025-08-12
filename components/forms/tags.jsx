"use client";
import { SecondaryBtn } from "@/components/btn";
import { putUser } from "@/services/user";
import { useEffect, useState } from "react";

export default function TagsInput({ children, tags: initialTags = [] }) {
   const [tags, setTags] = useState([]);
   const [inputValue, setInputValue] = useState("");

   useEffect(() => {
      if (initialTags?.length > 0) {
         setTags([
            ...(typeof initialTags === "object" ? initialTags[0] : initialTags),
         ]);
      }
   }, [initialTags]);

   const handleInputChange = (e) => {
      if (tags?.length > 5 && inputValue.trim() !== "") {
         // e.preventDefault();
         setInputValue("");
         return;
      } else if (e.key === " " || e.key === "Enter") {
         // e.preventDefault();
         if (
            inputValue.trim() !== "" &&
            (tags.length < 5 || tags.length === 0)
         ) {
            setTags([...tags, inputValue.trim()]);
            setInputValue("");
         } else if (tags.length >= 5) {
            setInputValue(""); // Clear input if trying to add more than 5 tags
         }
      } else if (e.key === "Backspace" && inputValue.trim() === "") {
         setInputValue(tags[tags.length - 1] || "");
         setTags(tags.slice(0, -1)); // Remove last tag on backspace if input is empty
      } else if (e.key === "Escape") {
         setInputValue(""); // Clear input on escape
      } else if (e.key === "Delete") {
         setTags([]); // Clear all tags on delete
      }
   };

   const handleTag = () => {
      putUser({
         tags: tags,
      })
         .then((res) => {
            if (res.status === 200) {
               // setInputValue("");
               // setTags(res.data.user.tags || []); // Update tags from response
            } else {
               console.error("Failed to update tags");
            }
         })
         .catch((error) => {
            console.error("Error updating tags:", error);
         });
   };

   return (
      <>
         <b className="py-2 inline-block">Etiketler</b>
         <div className="flex items-center gap-2 ">
            <label className="w-full p-4 flex items-center gap-4 input">
               <span className="bx bx-tag"></span>
               <div className="flex">
                  {tags?.map((tag, index) => (
                     <span
                        key={index}
                        className="bg-secondary text-white px-2 py-1 rounded-full text-sm flex items-center gap-2">
                        {tag}
                        <span
                           className="cursor-pointer text-red-500"
                           onClick={() => {
                              setTags(tags.filter((t) => t !== tag));
                           }}>
                           &times;
                        </span>
                     </span>
                  ))}
               </div>
               <input
                  type="text"
                  className="w-full bg-transparent outline-none"
                  placeholder="Etiket ekle"
                  value={inputValue}
                  onChange={(e) => {
                     setInputValue(e.target.value);
                  }}
                  onKeyDown={handleInputChange}
               />
            </label>
            <SecondaryBtn onClick={handleTag}>Kaydet</SecondaryBtn>
         </div>
      </>
   );
}
