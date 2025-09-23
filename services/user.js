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
