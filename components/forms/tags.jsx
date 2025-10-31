"use client";
import { SecondaryBtn } from "@/components/btn";
import { putUser } from "@/services/user";
import { use, useEffect, useState } from "react";
import userContext from "../provider/userContext";

export default function TagsInput({ tags: initialTags = [] }) {
   const [user, setUser] = use(userContext);
   const [tags, setTags] = useState(initialTags);
   const [inputValue, setInputValue] = useState("");

   useEffect(() => {
      if (user?.tags) {
         // Ensure tags are a flat array of strings
         const userTags = Array.isArray(user.tags[0])
            ? user.tags[0]
            : user.tags;
         setTags(userTags.filter((tag) => typeof tag === "string"));
      } else {
         setTags([]);
      }
   }, [user]);

   const handleInputChange = (e) => {
      if (e.key === " " || e.key === "Enter") {
         e.preventDefault();
         const newTag = inputValue.trim();
         if (newTag && tags.length < 5 && !tags.includes(newTag)) {
            setTags([...tags, newTag]);
         }
         setInputValue("");
      } else if (e.key === "Backspace" && inputValue === "") {
         e.preventDefault();
         setInputValue(tags[tags.length - 1] || "");
         setTags(tags.slice(0, -1));
      } else if (e.key === "Escape") {
         setInputValue("");
      } else if (e.key === "Delete") {
         setTags([]);
      }
   };

   const handleTag = () => {
      putUser({
         tags: tags,
      })
         .then((res) => {
            if (res.status === 200) {
               setUser((prevUser) => ({ ...prevUser, tags: tags }));
            } else {
               console.error("Failed to update tags");
            }
         })
         .catch((error) => {
            console.error("Error updating tags:", error);
         });
   };

   return (
      <div className="main">
         <b className="py-2 inline-block">Etiketler</b>
         <div className="flex flex-col  gap-4 ">
            <div className="flex items-center gap-2 w-full">
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
            <div className="flex">
               <label className="w-full !h-auto flex items-centers gap-4  input">
                  <span className="bx bx-tag h-min"></span>
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
         </div>
      </div>
   );
}
