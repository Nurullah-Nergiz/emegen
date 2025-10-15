"use client";
import Post from "@/components/post/index";
import { VList, WindowVirtualizer } from "virtua";

export default function Posts({ posts = [] }) {
   return (
      <>
         {!posts || posts.length === 0 ? (
            <>
               <div className="flex flex-col items-center justify-center py-12 text-center text-sm text-muted-foreground">
                  <p>No posts yet.</p>
               </div>
            </>
         ) : (
            posts.map((post, index) => (
               // Render each post with a stable key (prefer _id, fallback to index)
               <Post key={`post-${index}-${post?._id}`} post={post} />
            ))
         )}
      </>
   );
}
