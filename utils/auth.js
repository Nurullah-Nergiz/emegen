import Cookies from "js-cookie";

export const getAuthenticationToken = () => {
   const token = Cookies.get("user");
   console.log();
   return token ? JSON.parse(token)?.authorization : "";
};

export const getAuthenticationUser = () => {
   const user = Cookies.get("user");
   return user ? JSON.parse(user) : {};
};

export const setAuthenticationUser = (user) => {
   const authInfo = { user, authorization: getAuthenticationToken() };
   Cookies.set("user", JSON.stringify(authInfo), {
      expires: 364,
   });
};
