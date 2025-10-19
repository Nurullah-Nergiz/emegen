"use client";

import userContext from "@/components/provider/userContext";
import { AvatarImg, CoverImage } from "@/components/widgets/avatar";
import { putUserAvatar, putUserCoverPicture } from "@/services/user";
import { setAuthenticationUser } from "@/utils/auth";
import { use, useState } from "react";

export default function ProfilePicturePage() {
   const [user, setUser] = use(userContext);
   const [uploadingProfile, setUploadingProfile] = useState(false);
   const [uploadingCover, setUploadingCover] = useState(false);

   const handleFileUpload = async (e, type = "profilePicture") => {
      const file = e.target.files && e.target.files[0];
      if (!file) return;

      const fileSizeInMB = file.size / (1024 * 1024);
      if (fileSizeInMB > 5) {
         console.log("Dosya boyutu 5MB sınırını aşıyor.");
         e.target.value = "";
         return;
      }

      const formData = new FormData();
      formData.append("file", file);

      try {
         type === "profilePicture"
            ? setUploadingProfile(true)
            : setUploadingCover(true);
         const apiCall =
            type === "profilePicture" ? putUserAvatar : putUserCoverPicture;
         const response = await apiCall(formData);
         setUser({ ...response.data.user });
         setAuthenticationUser(response.data.user);
         e.target.value = "";
      } catch (error) {
         console.error("Güncelleme sırasında hata oluştu:", error);
      } finally {
         type === "profilePicture"
            ? setUploadingProfile(false)
            : setUploadingCover(false);
         e.target.value = "";
      }
   };

   return (
      <>
         <div className="space-y-8">
            {/* Kapak fotoğrafı kartı */}
            <div className="main !p-0 relative  overflow-hidden ">
               <div className="h-48 md:h-60 w-full bg-gray-100 dark:bg-zinc-800">
                  <CoverImage src={user?.coverPicture} alt="Kapak Fotoğrafı" />
               </div>
               <label className="absolute top-3 right-3 inline-flex items-center gap-2 rounded-md bg-black/60 text-white px-3 py-1.5 text-sm hover:bg-black/70 cursor-pointer backdrop-blur">
                  <input
                     type="file"
                     className="sr-only"
                     accept="image/*"
                     onChange={(e) => handleFileUpload(e, "coverPicture")}
                  />
                  {uploadingCover
                     ? "Yükleniyor..."
                     : "Kapak fotoğrafını değiştir"}
               </label>
            </div>

            {/* Profil fotoğrafı kartı */}
            <div className="main">
               <div className="flex items-center gap-4">
                  <div className="shrink-0">
                     <AvatarImg
                        src={user?.profilePicture || ""}
                        alt="Profil Fotoğrafı"
                     />
                  </div>
                  <div className="flex flex-col">
                     <span className="font-medium">Profil fotoğrafı</span>
                     <span className="text-sm text-gray-500 dark:text-gray-400">
                        En fazla 5MB, jpg/png
                     </span>
                     <div className="mt-2">
                        <label className="inline-flex items-center gap-2 rounded-md border px-3 py-1.5 text-sm cursor-pointer hover:bg-gray-50 dark:hover:bg-zinc-800">
                           <input
                              type="file"
                              className="sr-only"
                              accept="image/*"
                              onChange={(e) =>
                                 handleFileUpload(e, "profilePicture")
                              }
                           />
                           {uploadingProfile
                              ? "Yükleniyor..."
                              : "Yeni fotoğraf yükle"}
                        </label>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </>
   );
}
