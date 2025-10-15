import { AvatarImg } from "@/components/widgets/avatar";
import { putUserAvatar } from "@/services/user";
import { setAuthenticationUser } from "@/utils/auth";

export default function ProfilePicturePage() {
   const user = {};

   return (
      <>
         <div className="main flex flex-col gap-4">
            <b>Yeni Fotoğraf Yükle</b>
            <AvatarImg
               src={user?.profilePicture || ""}
               alt="Profil Fotoğrafı"
            />
            <label className="relative inline-block cursor-pointer hover:underline">
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
                                 return setAuthenticationUser(
                                    response.data.user
                                 );
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
      </>
   );
}


