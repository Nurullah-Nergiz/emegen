import Cookies from "js-cookie";

export const getAuthenticationToken = () => {
   const token = Cookies.get("auth-token");
   return token ? JSON.parse(token) : "";
};

export const getAuthenticationUser = () => {
   const user = Cookies.get("user");
   return user ? JSON.parse(user) : {};
};

export const setAuthenticationUser = (user, token) => {
   const authInfo = { user, authorization: getAuthenticationToken() };
   Cookies.set("user", JSON.stringify(authInfo), {
      expires: 364,
   });
   if (token) {
      setAuthToken(token);
   }
};

export const setAuthToken = (token) => {
   Cookies.set("auth-token", JSON.stringify(token), {
      expires: 364,
   });
};

export const removeAuthenticationUser = () => {
   Cookies.remove("user");
   removeToken();
};

export const removeToken = () => {
   Cookies.remove("user");
};

export const isAuthenticated = () => {
   return !!getAuthenticationToken();
};
