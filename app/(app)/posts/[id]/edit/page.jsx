import EditForm from "@/components/posts/edit-form";
import { getPost } from "@/services/post";
import { notFound } from "next/navigation";

export default async function EditPage({ params }) {
   const { id = "" } = await params;
   const post = await getPost(id);

   console.log(post);

   if (post.status === 404) {
      return notFound();
   }

   return (
      <div>
         <h1 className="text-2xl font-bold mb-4">Gönderiyi Düzenle</h1>
         {/* <EditForm post={post} /> */}
      </div>
   );
}
