import { userFallowInstance } from "./index";

export const setUserFallowing = (id) =>
   userFallowInstance(`users/${id}/follow`, {
      method: "POST",
   });

export const setUserUnFallowing = (id) =>
   userFallowInstance(`users/${id}/unfollow`, {
      method: "POST",
   });

export const getUserFollowing = (userName) =>
   userFallowInstance(`users/${userName}/following`, {
      method: "GET",
   });

export const getUserFollowers = (userName) =>
   userFallowInstance(`users/${userName}/followers`, {
      method: "GET",
   });
