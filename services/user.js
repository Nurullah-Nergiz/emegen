import { userInstance } from "./index";

/**
 *
 * @param {String} userName
 */
export const getUser = (userName) => userInstance("users/" + userName);

export const getUserPosts = (userName) =>
   userInstance(`users/${userName}/posts`);

export const putUser = (data) => userInstance.put(`users/me`, data);
