import { PrimaryBtn } from "@/components/btn/";

export default function ChangePasswordPage({ children }) {
   return (
      <>
         <main>
            <h1>Change Password</h1>
            <p>Please enter your current password to change your password</p>
            <form action="" className="my-4 p-4 bg-main rounded-2xl">
               <div className="my-4">
                  <label className="">
                     <p className="">Current Password</p>
                     <input
                        type="password"
                        className="py-2 px-3 border border-tertiary shadow shadow-tertiary rounded-2xl"
                     />
                  </label>
               </div>
               <div className="my-4">
                  <label className="">
                     <p className="">New Password</p>
                     <input
                        type="password"
                        className="py-2 px-3 border border-tertiary shadow shadow-tertiary rounded-2xl"
                     />
                  </label>
               </div>
               <div className="my-4">
                  <label className="">
                     <p className="">Confirm Password</p>
                     <input
                        type="password"
                        className="py-2 px-3 border border-tertiary shadow shadow-tertiary rounded-2xl"
                     />
                  </label>
               </div>
               <div className="text-right">
                  <PrimaryBtn>Change Password</PrimaryBtn>
               </div>
            </form>
         </main>
         <aside></aside>
      </>
   );
}
