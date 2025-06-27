import { getUserPosts } from "@/services/user";
import Posts from "@/components/widgets/post";

export default async function Page({ params }) {
   const { username } = await params;
   const { status, data: posts } = await getUserPosts(username);
   console.clear();
   // console.log("file: page.jsx:7 => posts=>", posts);

   return (
      <section className="">
         <h1 className="py-2">Posts</h1>
         <Posts posts={posts} />
         {/* {posts?.map((post) => {
            return <Post key={post._id} post={post} />;
         })} */}
         {/* <Post /> */}
      </section>
   );
}
