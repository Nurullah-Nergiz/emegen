import { userInstance } from "./index";

/**
 *
 * @param {String} userName
 */
export const getUser = (userName) => userInstance("users/" + userName);

export const getUsers = () => userInstance("users/");

export const getUserPosts = (userName) =>
   userInstance(`users/${userName}/posts`);

export const getUserTenders = (userName) =>
   userInstance(`users/${userName}/tenders`);

export const putUser = (data) => userInstance.put(`users/me`, data);

export const putUserAvatar = (formData, mode = "avatar") =>
   userInstance.put(
      mode === "avatar" ? `users/me/avatar/` : `users/me/cover-pictures/`,
      formData,
      {
         headers: {
            "Content-Type": "multipart/form-data",
         },
      }
   );
