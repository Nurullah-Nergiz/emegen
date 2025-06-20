"use client";
import { useRouter,usePathname } from "next/navigation";
import { PrimaryBtn, SecondaryBtn } from "@/components/btn";

export default function AuthHeader({ children }) {
   const router = useRouter();
   const pathname = usePathname();

   return (
      <>
         <SecondaryBtn
            className="whitespace-nowrap"
            onClick={() => {
               router.push(`/auth/register?redirect=${pathname}`);
            }}>
            Kayıt olmak
         </SecondaryBtn>
         <PrimaryBtn
         className="whitespace-nowrap"
         onClick={() =>
            router.push(`/auth/login?redirect=${pathname}`)
         }
         >
            Giriş yapmak
         </PrimaryBtn>
      </>
   );
}
