"use client";

import Link from "next/link";
import { Avatar } from "@/components/widgets/avatar";
import { CommentEditor } from "@/components/comment/editor";
import { useState } from "react";
import { CommentView } from "@/components/comment";
import BtnLiked from "@/components/btn/Liked";
import BtnBookmarked from "@/components/btn/Bookmarked";

/**
 *
 * @param {Object} post
 * @returns React.Component
 */
export default function Post({ post = {} }) {
   const author = post?.author?.[0] || {};
   
   // const w = Math.floor(Math.random() * 10);
   const [commentVisible, setCommentVisible] = useState(false);
   
   
   const handleDoubleClick = () => {
   document.querySelector(`[data-like-id="${post._id}"]`)?.click();
   }

   return (
      <div className="mb-4 main overflow-hidden ">
         <header className="flex flex-col gap-4">
            <Avatar
               userAvatar={author?.profilePicture}
               name={author?.name}
               userName={author?.userName}
               fallowViable={true}>
               <details>
                  <summary className="bx bx-dots-vertical-rounded"></summary>
                  <div className="">a</div>
               </details>
            </Avatar>
         </header>
         <main className=" my-4 flex flex-col gap-2" onDoubleClick={handleDoubleClick}>
            {post?.content}
            {/* <img
               src={`https://picsum.photos/72${w}/40${w}`}
               alt="title"
               loading="lazy"
               className=""
            /> */}
            {/* src="https://miro.medium.com/v2/resize:fit:720/format:webp/1*DUigJ7aQ_CFSOuKCklMOow.gif" */}
         </main>
         <footer className="flex items-baseline gap-4 text-2xl">
            <BtnLiked isLiked={post.isLiked ?? false} id={post._id} />
            <button
               className="bx bx-message-rounded"
               onClick={() => setCommentVisible(!commentVisible)}></button>
            <button className="bx bx-send"></button>
            <BtnBookmarked
               className="ml-auto"
               isBookmarked={post.isBookmarked ?? false}
               id={post._id}
            />
            {/* <button className="bx bx-bookmark ml-auto"></button> */}
         </footer>
         <details open={commentVisible} className="">
            <summary className="!hidden">a</summary>
            <CommentEditor postId={post._id} />
            <CommentView comments={post.comments} />
         </details>
         {/* <button className="bx bxs-bookmark-minus p-0"></button> */}
      </div>
   );
}
