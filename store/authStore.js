import {
   getAuthenticationToken,
   getAuthenticationUser,
   removeAuthenticationUser,
} from "@/utils/auth";
import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const initialState = {
   user: getAuthenticationUser(),
   authToken: getAuthenticationToken(),
};

export const authSlice = createSlice({
   name: "auth",
   initialState,
   reducers: {
      loginSuccess: (state, action) => {
         state.isLoading = action.payload?.authentication;
         state.user = action.payload?.user;
      },
      logout: (state, action) => {
         removeAuthenticationUser();
         state.isLoading = null;
         state.user = null;
      },
   },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
