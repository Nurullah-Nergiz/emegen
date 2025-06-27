"use client";
import Post from "@/components/post/index";
import { VList, WindowVirtualizer } from "virtua";

export default function Posts({ posts = [] }) {
   return (
      <>
         {/* <WindowVirtualizer className="!h-full"> */}
         {posts.map((post, index) => (
            <>
               <Post key={`post-${post._id}-${index}`} post={post} />
               
            </>
         ))}
         {/* </WindowVirtualizer> */}
      </>
   );
}
