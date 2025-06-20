"use client";

import { PrimaryBtn } from "@/components/btn";
import AuthHeaderContext from "@/components/provider/authHeader";
import { registerServices } from "@/services/auth";
import Link from "next/link";
import { useContext, useEffect } from "react";

export default function RegisterPage({ children }) {
   const [authHeaderData, setAuthHeaderData] = useContext(AuthHeaderContext);

   useEffect(() => {
      setAuthHeaderData({
         title: "Register",
         description: "Please fill the your details",
      });
   }, []);

   const handleSubmit = (e) => {
      e.preventDefault();
      const router = useRouter();
      
      if (e.target[4].checked === true) {
         if (e.target[2].value === e.target[3].value) {
            registerServices({
               name: e.target[0].value,
               email: e.target[1].value,
               password: e.target[2].value,
               // confirmPassword: e.target[2].value,
            })
               .then((res) => {
                  console.log("file: page.jsx:24 => res", res);
                  dispatch(loginSuccess(res.data));
                  router.push("/settings/edit-profile");
                  // Handle successful registration
               })
               .catch((err) => {
                  console.error("file: page.jsx:26 => err", err);
                  // Handle registration error
               });
         } else {
            console.log("Passwords do not match");
            // Handle password mismatch error
         }
      } else {
         console.log(
            "You must accept the terms and conditions",
            e.target[4].checked
         );
         // Handle terms and conditions not accepted error
      }
   };

   return (
      <main className="flex-1 p-4 bg-white flex flex-col justify-between">
         <form onSubmit={handleSubmit} className="flex flex-col gap-4 relative">
            <label>
               <b className="mb-1 block">Kullanıcı Adı</b>
               <input
                  type="text"
                  className="w-full h-9 px-3 py-2 !bg-transparent border relative border-tertiary shadow shadow-tertiary rounded-2xl outline-none"
                  required
                  placeholder="Kullanıcı adınızı giriniz"
                  autoFocus
               />
            </label>
            <label className=" ">
               {/* <i className="bx bx-user"></i> */}
               <b className="mb-1 block">E -posta</b>
               <input
                  type="text"
                  className="w-full h-9 px-3 py-2 !bg-transparent border relative border-tertiary shadow shadow-tertiary rounded-2xl outline-none"
                  required
                  placeholder="example@emegen.com"
               />
            </label>
            <label className="mb-1 block">
               <b>Parola</b>
               <input
                  type="password"
                  className="w-full h-9 px-3 py-2 !bg-transparent border relative border-tertiary shadow shadow-tertiary rounded-2xl outline-none"
                  required
                  //   ref={password}
               />
            </label>
            <label className="mb-1 block">
               <b>Parola</b>
               <input
                  type="password"
                  className="w-full h-9 px-3 py-2 !bg-transparent border relative border-tertiary shadow shadow-tertiary rounded-2xl outline-none"
                  required
                  //   ref={password}
               />
            </label>
            <label className="flex items-center gap-2 text-xs select-none">
               <input type="checkbox" />
               <span className="whitespace-nowrap">
                  Kabul ediyorum{" "}
                  <Link
                     href="/terms"
                     className="text-primary underline underline-offset-4">
                     Şartlar ve koşullar
                  </Link>
               </span>
            </label>
            <PrimaryBtn type="submit" className="bg-primary">
               Kayıt ol
            </PrimaryBtn>
            {/* <br />  */}
         </form>
         <p className="text-sm text-center whitespace-nowrap select-none">
            Hesap Olma &nbsp;
            <Link href="login" className="text-primary">
               Giriş yap
            </Link>
         </p>
      </main>
   );
}
