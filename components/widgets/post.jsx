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
               <>
                  {/* <WindowVirtualizer className="!h-full"> */}
                  <Post key={`post-${post._id}-${index}`} post={post} />
                  {/* </WindowVirtualizer> */}
               </>
            ))
         )}
      </>
   );
}
