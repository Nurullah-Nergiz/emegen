"use client";
import { PrimaryBtn } from "@/components/btn";
import { putUser } from "@/services/user";
import { useState } from "react";

export default function TagsInput({ children, tags: initialTags = [] }) {
   // console.log("TagsInput component rendered with initial tags:", initialTags);
   
   const [tags, setTags] = useState(...initialTags);
   const [inputValue, setInputValue] = useState("");

   const handleInputChange = (e) => {
      if (tags?.length > 4 && inputValue.trim() !== "") {
         // e.preventDefault();
         setInputValue("");
         return;
      } else if (e.key === " " || e.key === "Enter") {
         // e.preventDefault();
         if (inputValue.trim() !== "" && tags.length < 5) {
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
               console.log("Tags updated successfully");
               console.log(res.data);
               
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
            <PrimaryBtn onClick={handleTag} >Kaydet</PrimaryBtn>
         </div>
      </>
   );
}
