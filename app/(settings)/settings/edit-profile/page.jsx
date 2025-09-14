"use client";

import { AvatarImg } from "@/components/widgets/avatar";
import { PrimaryBtn, SecondaryBtn } from "@/components/btn";
import useAuthUser from "@/hooks/auth";
import WidgetsPopup from "@/components/widgets/popup";
import Input from "@/components/forms/input";
import FormsPhoneNumber from "@/components/forms/phoneNumber";
import LocationInput from "@/components/forms/location";
import TagsInput from "@/components/forms/tags";
import { getUser, putUserAvatar } from "@/services/user";
import { useEffect, useState } from "react";
import CompleteProfile from "@/components/widgets/profile/completeProfile";
import FormsWebsite from "@/components/forms/website";
import BiographyEditor from "@/components/forms/bio";
import { setAuthenticationUser } from "@/utils/auth";

export default function EditProfilePage() {
   const [user, setUser] = useState();

   useEffect(() => {
      useAuthUser().then((authUser) => {
         if (!authUser?.userName) return;
         getUser(authUser.userName).then((userData) => {
            setUser(userData.data || {});
         });
      });
   }, []);

   return (
      <>
         <main className="flex-1">
            <h1 className="mb-4">Profili Düzenle</h1>
            <section className="main flex flex-col gap-8">
               {/* Profil Fotoğrafı Bölümü */}
               <div className="main flex flex-col gap-4">
                  <b>Yeni Fotoğraf Yükle</b>
                  <AvatarImg
                     src={user?.profilePicture || ""}
                     alt="Profil Fotoğrafı"
                  />
                  <label>
                     <input
                        type="file"
                        className="absolute -top-96 -left-96"
                        accept="image/*"
                        onChange={(e) => {
                           if (e.target.files && e.target.files[0]) {
                              const file = e.target.files[0];
                              const fileSizeInMB = file.size / (1024 * 1024);
                              if (fileSizeInMB > 5) {
                                 console.log("Dosya boyutu 5MB sınırını aşıyor.");
                                 return;
                              } else {
                                 const formData = new FormData();
                                 formData.append("file", file);
                                 putUserAvatar(formData)
                                    .then((response) => {
                                       setUser((prevUser) => ({
                                          ...prevUser,
                                          avatar: response.data.avatar,
                                       }));
                                       setAuthenticationUser(response.data);
                                    })
                                    .catch((error) => {
                                       console.error(
                                          "Avatar güncellenirken hata oluştu:",
                                          error
                                       );
                                    });
                              }
                           }
                        }}
                     />
                     Yeni fotoğraf yükle
                  </label>
               </div>

               {/* Kişisel Bilgiler Bölümü */}
               <div className="main flex flex-col gap-4">
                  <b>Kişisel Bilgiler</b>
                  <div className="flex gap-4">
                     <Input
                        label="Ad Soyad"
                        defaultValue={user?.name || ""}
                        placeholder="Adınızı ve soyadınızı girin"
                     />
                     <Input
                        label="E-posta"
                        defaultValue={user?.email || ""}
                        placeholder="E-posta adresinizi girin"
                     />
                     <FormsPhoneNumber
                        label="Telefon"
                        defaultValue={user?.phone || ""}
                     />
                  </div>
                  <SecondaryBtn className="ml-auto">Güncelle</SecondaryBtn>
               </div>

               {/* Konum Bölümü */}
               <div className="main">
                  <b>Konum</b>
                  <LocationInput
                     defaultValue={user?.location || ""}
                     placeholder="Konumunuzu girin"
                     onChange={(e) => console.log("Konum değiştirildi:", e)}
                  />
               </div>

               {/* Biyografi Bölümü */}
               <div className="main">
                  <b>Biyografi</b>
                  <BiographyEditor defaultValue={user?.bio || ""} />
               </div>

               {/* Web Sitesi Bölümü */}
               <div className="main">
                  <FormsWebsite
                     name="website"
                     value={user?.website || ""}
                     placeholder="Web sitenizi girin"
                  />
                  <FormsWebsite
                     name="linkedin"
                     value={user?.linkedin || ""}
                     placeholder="LinkedIn profilinizi girin"
                  />
               </div>
            </section>
         </main>

         {/* Profil Tamamlama Kenar Çubuğu */}
         <aside className="min-w-80 h-min main">
            <CompleteProfile user={user} />
         </aside>
      </>
   );
}
