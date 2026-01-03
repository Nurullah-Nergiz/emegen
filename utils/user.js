import Cookies from "js-cookie";

export const getAuthenticationUser = () => {
   const user = Cookies.get("user");
   console.log("user:", user);
};

export const cleanUserName = (username) => {
   return username.replaceAll(/@|%40/g, "").trim();
};
