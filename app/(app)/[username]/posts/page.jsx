import { getUserPosts } from "@/services/user";
import Posts from "@/components/widgets/post";
import { cleanUserName } from "@/utils/user";

export async function generateMetadata({ params }) {
   const { username } = await params;
   return {
      alternates: {
         canonical: `https://emegen.com.tr/@${cleanUserName(username)}/posts`,
      },
   };
}

/**
 * Next.js server component for the dynamic route /[username]/posts.
 * Fetches the specified user's posts and renders the Posts list.
 *
 * @async
 * @param {{ params: { username: string } }} props - Route params supplied by Next.js.
 * @returns {Promise<import('react').JSX.Element>} The rendered posts page.
 */
export default async function Page({ params }) {
   console.clear();
   const { username } = await params;
   /**
    * @type {object {status: number, data: {posts: Array,limit: number,page: number,totalPages: number,totalPosts: number}}}
    */
   const { status, data: fetchedPosts } = await getUserPosts(
      username.replace("%40", "").trim()
   );
   console.clear();
   // console.log("file: page.jsx:7 => posts=>", fetchedPosts);

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
