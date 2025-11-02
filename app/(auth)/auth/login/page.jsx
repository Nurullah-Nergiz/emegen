"use client";
import { PrimaryBtn } from "@/components/btn";
import AuthHeaderContext from "@/components/provider/authHeader";
import { loginServices } from "@/services/auth";
import { setAuthenticationUser, setAuthToken } from "@/utils/auth";
import { loginSuccess } from "@/store/authStore";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useContext, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useSetAuthUser } from "@/hooks/auth";

export default function Page() {
   // const [userName, password, errorMessage] = [useRef(), useRef(), useRef()];
   const userName = useRef();
   const password = useRef();
   const errorMessage = useRef();

   const dispatch = useDispatch();
   const router = useRouter();
   const searchParams = useSearchParams();
   const redirect = searchParams.get("redirect");

   const [authHeaderData, setAuthHeaderData] = useContext(AuthHeaderContext);

   useEffect(() => {
      setAuthHeaderData({
         title: "Login",
         description: "Please log in to use the app",
      });
   }, []);

   const handleSubmit = (e) => {
      e.preventDefault();

      loginServices({
         email: userName.current.value,
         password: password.current.value,
      })
         .then(async (data) => {
            if (data.status === 200) {
               console.log("data:", data.data.user);
               await useSetAuthUser(data.data.user, data.data.authorization);
               debugger;
               // setAuthToken(data.data.authorization);
               dispatch(loginSuccess(data.data));
               window.location = redirect ? redirect : "/";
               // router.push(redirect ? redirect : "/");
            } else {
            }
         })
         .catch((err) => {
            console.log("err:", err);
            errorMessage.current.classList.add("block");
            errorMessage.current.classList.remove("hidden");
         });
   };

   return (
      <main className=" flex-1 flex flex-col gap-4 justify-between">
         <form
            onSubmit={handleSubmit}
            className="px-4 flex flex-col gap-4 relative">
            <p
               className="text-primary hidden transition-all absolute -top-8 z-50"
               ref={errorMessage}>
               You email or password is incorrect
            </p>
            <label className=" ">
               {/* <i className="bx bx-user"></i> */}
               <b className="p-1">Email</b>
               <input
                  type="email"
                  className="w-full h-9 px-3 py-2 !bg-transparent border relative border-tertiary shadow shadow-tertiary rounded-2xl outline-none"
                  required
                  placeholder="example@emegen.com"
                  autoFocus
                  ref={userName}
               />
            </label>
            <label className="">
               <b className="">Şifre</b>
               {/* <i className="bx bx-lock-alt"></i> */}
               <input
                  type="password"
                  className="w-full h-9 px-3 py-2 !bg-transparent border relative border-tertiary shadow shadow-tertiary rounded-2xl outline-none"
                  required
                  placeholder="********"
                  ref={password}
               />
            </label>
            <div className="flex justify-between items-center text-xs select-none">
               <label className=" flex items-center gap-2">
                  <input type="checkbox" />
                  <span className="whitespace-nowrap">Beni Hatırla</span>
               </label>
               <Link
                  href="forgot-password"
                  className="underline underline-offset-4">
                  Parolanızı mı unuttunuz?
               </Link>
            </div>
            <PrimaryBtn type="submit" className="h-9 bg-primary">
               Login
            </PrimaryBtn>
            {/* <br />  */}
         </form>
         <p className="text-sm text-center whitespace-nowrap select-none">
            Hesabınız yok mu? &nbsp;
            <Link href="register" className="text-primary">
               Kayıt ol
            </Link>
         </p>
      </main>
   );
}
