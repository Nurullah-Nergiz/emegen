import { getUserPosts } from "@/services/user";

export default async function Page({ params }) {
   const { username } = await params;

   return (
      <>
         <section className="flex flex-col gap-4">
            <p className="text-2xl font-semibold">
               Posts by {username.replace(/%40/g, "").trim()}
            </p>
         </section>
      </>
   );
}
