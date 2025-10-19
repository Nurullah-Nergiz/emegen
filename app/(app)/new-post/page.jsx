"use client";

import { setPost } from "@/services/post";
import { useRouter } from "next/navigation";
import { useRef, useState, useEffect } from "react";

export default function NewPostPage() {
   const router = useRouter();
   
   const [content, setContent] = useState("");
   const [imageFile, setImageFile] = useState(null);
   const [imagePreview, setImagePreview] = useState(null);
   const [audience, setAudience] = useState("Herkes");
   const [audienceOpen, setAudienceOpen] = useState(false);
   const contentRef = useRef(null);
   const fileInputRef = useRef(null);

   useEffect(() => {
      if (!contentRef.current) return;
      contentRef.current.style.height = "auto";
      contentRef.current.style.height = `${contentRef.current.scrollHeight}px`;
   }, [content]);

   const canPublish = content.trim().length >= 10;

   const handleImageChange = (e) => {
      const file = e.target.files?.[0];
      if (!file) return;
      if (!file.type.startsWith("image/")) return;
      if (file.size > 5 * 1024 * 1024) return;
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
   };
   const clearImage = () => {
      setImageFile(null);
      setImagePreview(null);
   };

   const onPublish = () => {
      if (!canPublish) return;
      const formData = new FormData();
      formData.append("content", content);
      formData.append("audience", audience);

      // Add the image file to the form data if it exists
      if (imageFile) formData.append("images", imageFile);

      setPost(formData)
         .then((res) => {
            console.table(
               { ...res.data },
               
            );
            // Temizle
            setContent("");
            clearImage();
            // route post page 
            
            router.push( "/posts/" + res.data?._id );
            
         })
         .catch((err) => {
            console.error("Paylaşım hatası:", err);
         });
   };

   return (
      <div className="">
         <div className="">
            {/* Header */}
            {/* <header className="p-4 flex items-start gap-3">
               <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-semibold">
                  S
               </div>
               <div className="flex-1">
                  <div className="text-sm font-semibold">Sen</div>
                  <div className="relative inline-block">
                     <button
                        type="button"
                        className="mt-1 inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full border hover:bg-gray-50"
                        onClick={() => setAudienceOpen((v) => !v)}
                        aria-haspopup="listbox"
                        aria-expanded={audienceOpen}>
                        {audience} ▾
                     </button>
                     {audienceOpen && (
                        <ul
                           className="absolute z-10 mt-1 w-40 bg-white border rounded-md shadow-lg overflow-hidden text-sm"
                           role="listbox"
                           tabIndex={-1}>
                           {["Herkes", "Bağlantılar", "Yalnızca ben"].map(
                              (opt) => (
                                 <li
                                    key={opt}
                                    role="option"
                                    aria-selected={audience === opt}
                                    className={`px-3 py-2 cursor-pointer hover:bg-gray-50 ${
                                       audience === opt
                                          ? "text-blue-600 font-medium"
                                          : ""
                                    }`}
                                    onClick={() => {
                                       setAudience(opt);
                                       setAudienceOpen(false);
                                    }}>
                                    {opt}
                                 </li>
                              )
                           )}
                        </ul>
                     )}
                  </div>
               </div>
            </header> */}

            {/* Body */}
            <form
               onSubmit={(e) => {
                  e.preventDefault();
                  onPublish();
               }}>
               <div className="px-4">
                  <textarea
                     ref={contentRef}
                     className="w-full text-[15px] md:text-base leading-6 min-h-[120px] outline-none resize-none placeholder:text-gray-500 bg-transparent"
                     placeholder="Bir şey yazın..."
                     value={content}
                     onChange={(e) => setContent(e.target.value)}
                     
                  />
               </div>

               {/* Media preview */}
               {imagePreview && (
                  <div className="px-4 pb-2">
                     <div className="relative w-full overflow-hidden rounded-lg border">
                        <img
                           src={imagePreview}
                           alt="Önizleme"
                           className="w-full max-h-80 object-cover"
                        />
                        <button
                           type="button"
                           onClick={clearImage}
                           className="absolute top-2 right-2 bg-black/60 text-white rounded-full w-8 h-8 grid place-items-center hover:bg-black/70"
                           aria-label="Görseli kaldır">
                           ×
                        </button>
                     </div>
                     <div className="mt-1 text-[11px] text-gray-500">
                        {imageFile?.name} ·{" "}
                        {Math.round((imageFile?.size || 0) / 1024)} KB
                     </div>
                  </div>
               )}

               {/* Toolbar */}
               <div className="px-4 py-2 flex items-center justify-between">
                  <div className="flex items-center gap-1">
                     <button
                        type="button"
                        className="p-2 rounded-full hover:bg-gray-100"
                        onClick={() => fileInputRef.current?.click()}
                        title="Görsel ekle"
                        aria-label="Görsel ekle">
                        <svg
                           width="20"
                           height="20"
                           viewBox="0 0 24 24"
                           fill="none">
                           <path
                              d="M4 5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v11l-3.5-3.5a2 2 0 0 0-2.8 0L10 16l-1.7-1.7a2 2 0 0 0-2.8 0L4 15V5Z"
                              stroke="#0a66c2"
                              strokeWidth="1.5"
                           />
                           <circle cx="9" cy="7.5" r="1.5" fill="#0a66c2" />
                        </svg>
                     </button>
                     <button
                        type="button"
                        className="p-2 rounded-full hover:bg-gray-100"
                        title="Video ekle"
                        aria-label="Video ekle"
                        disabled>
                        <svg
                           width="20"
                           height="20"
                           viewBox="0 0 24 24"
                           fill="none"
                           className="opacity-40">
                           <path
                              d="M15 10V7a2 2 0 0 0-2-2H5v14h8a2 2 0 0 0-2-2v-3l4 3v-9l-4 3Z"
                              stroke="currentColor"
                              strokeWidth="1.5"
                           />
                        </svg>
                     </button>
                     <button
                        type="button"
                        className="p-2 rounded-full hover:bg-gray-100"
                        title="Hashtag ekle"
                        aria-label="Hashtag ekle"
                        onClick={() =>
                           setContent((c) =>
                              c.endsWith(" ") || c.length === 0
                                 ? c + "#"
                                 : c + " #"
                           )
                        }>
                        <span className="text-[#0a66c2] text-lg font-semibold">
                           #
                        </span>
                     </button>
                     <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                     />
                  </div>
                  <div className="text-xs text-gray-500">
                     {content.trim().length} karakter
                  </div>
               </div>

               {/* Footer */}
               <div className="px-4 py-3 border-t flex items-center justify-end gap-2">
                  <button
                     type="submit"
                     disabled={!canPublish}
                     className={`px-4 py-2 rounded-full text-white text-sm font-medium ${
                        canPublish
                           ? "bg-[#0a66c2] hover:bg-[#004182]"
                           : "bg-blue-300 cursor-not-allowed"
                     }`}>
                     Paylaş
                  </button>
               </div>
            </form>
         </div>
      </div>
   );
}
