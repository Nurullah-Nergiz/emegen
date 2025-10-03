import { getUserPosts } from "@/services/user";
import Posts from "@/components/widgets/post";

export async function generateMetadata({ params }) {
   const { username } = await params;
   return {
      alternates: {
         canonical: `https://emegen.com.tr/@${username.trim()}/posts`,
      },
   };
}

export default async function Page({ params }) {
   const { username } = await params;
   const { status, data: fetchedPosts } = await getUserPosts(username);
   console.clear();
   // console.log("file: page.jsx:7 => posts=>", posts);

   return (
      <section className="">
         <h1 className="py-2">Posts</h1>
         <Posts posts={fetchedPosts.posts} />
         {/* {posts?.map((post) => {
            return <Post key={post._id} post={post} />;
         })} */}
         {/* <Post /> */}
      </section>
   );
}

