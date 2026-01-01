import { userInstance } from "./index";

/**
 *
 * @param {String} userName
 */
export const getUser = (userName) => userInstance("users/" + userName);

export const getUsers = () => userInstance("users/");

export const getMe = () => userInstance("users/me");

/**
 * 
 * @param {String} userName 
 * @returns {Promise<{status: number, data: {tenders: Array, limit: number, page: number, totalPages: number, totalTenders: number}}>}
 */
export const getUserPosts = (userName) =>
   userInstance(`users/${userName}/posts`);

export const getUserTenders = (userName) =>
   userInstance(`users/${userName}/tenders`);



export const putUser = (data={}) => userInstance.put(`users/me`, data);

export const putUserAvatar = (data) =>
   userInstance.put(`users/me/avatar`, data, {
      headers: {
         "Content-Type": "multipart/form-data",
      },
   });

export const putUserCoverPicture = (data) =>
   userInstance.put(`users/me/cover-pictures`, data, {
      headers: {
         "Content-Type": "multipart/form-data",
      },
   });