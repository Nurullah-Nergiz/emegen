
import AuthHeader from "@/components/AuthLayout/header";
import  {AuthHeaderProvider} from "@/components/provider/authHeader";

export default function RootLayout({ children }) {
   
   return (
      <AuthHeaderProvider>
         <section className="h-screen w-full flex items-center justify-center overflow-auto">
            <div className="max-w-sm w-full main !p-0 flex flex-col  rounded-2xl ">
            <AuthHeader />
               {children}
               {/* <main className="px-4 py-6 flex flex-col gap-4"></main> */}
            </div>
         </section>
      </AuthHeaderProvider>
   );
}
