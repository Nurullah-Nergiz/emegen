"use client";
import { logout } from "@/store/authStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function LogoutPage({ children }) {
   const dispatch = useDispatch();
   const router = useRouter();
   useEffect(() => {
      dispatch(logout());
      router.push("/auth/login");
   },[]);
   return <>logout page</>;
}
