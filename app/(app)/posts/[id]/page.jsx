import Posts from "@/components/widgets/post";
import useAuthUser from "@/hooks/auth";
import { getPost } from "@/services/post";
import { notFound } from "next/navigation";
import { RecommendedPeopleWidget } from "@/components/widgets/RecommendedPeople";

export default async function PostsPage({ params }) {
   console.clear();
   const [{ id }] = await Promise.all([params]);
   const { status, data } = await getPost(id);

   if (status !== 200) return notFound();

   // console.log(data);


   return (
      <>
         <main className="w-full lg:w-2/3">
            <Posts posts={data} />
         </main>
         <aside className="min-w-96 lg:w-1/3">
            <RecommendedPeopleWidget />
         </aside>
      </>
   );
}
