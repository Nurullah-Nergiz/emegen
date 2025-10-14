import { cache } from "react";
import { userInstance } from "./index";

/**
 *
 * @param {String} userName
 */
export const getUser = cache((userName) => userInstance("users/" + userName));

export const getUsers = () => userInstance("users/");

/**
 * 
 * @param {String} userName 
 * @returns {Promise<{status: number, data: {tenders: Array, limit: number, page: number, totalPages: number, totalTenders: number}}>}
 */
export const getUserPosts = (userName) =>
   userInstance(`users/${userName}/posts`);

export const getUserTenders = (userName) =>
   userInstance(`users/${userName}/tenders`);

export const putUser = (data) => userInstance.put(`users/me`, data);

export const putUserAvatar = (data) =>
   userInstance.put(`users/me/avatar`, data, {
      headers: {
         "Content-Type": "multipart/form-data",
      },
   });
