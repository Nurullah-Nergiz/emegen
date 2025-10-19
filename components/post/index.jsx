"use client";

import Link from "next/link";
import { Avatar } from "@/components/widgets/avatar";
import { CommentEditor } from "@/components/comment/editor";
import { useState, useEffect } from "react";
import { CommentView } from "@/components/comment";
import BtnLiked from "@/components/btn/Liked";
import BtnBookmarked from "@/components/btn/Bookmarked";
import PostSlider from "./slider";
import { useAuthUserId } from "@/hooks/auth";
import { SecondaryBtn } from "@/components/btn";

/**
 *
 * @param {Object} post
 * @returns React.Component
 */
export default function Post({ post = {} }) {
   const [isOwner, setIsOwner] = useState(false);
   const author =
      typeof post?._id !== "string" ? post?.author?.[0] : post?.author;

   useEffect(() => {
      let isMounted = true;
      useAuthUserId().then((id) => {
         console.log("user in post:", id);

         if (isMounted) {
            setIsOwner(id === (author?._id ?? author));
         }
      });
      return () => {
         isMounted = false;
      };
   }, [author]);

   // const isOwner =
   // (await useAuthUserId())?._id === (author?._id ?? author);

   // const w = Math.floor(Math.random() * 10);
   const [commentVisible, setCommentVisible] = useState(false);

   const handleDoubleClick = () => {
      document.querySelector(`[data-like-id="${post._id}"]`)?.click();
   };

   const handleShare = async () => {
      try {
         const url = window.location.protocol + '//' + window.location.host + `/posts/${post._id}`;

         if (navigator.clipboard && window.isSecureContext) {
         await navigator.clipboard.writeText(url);
         console.log("URL copied to clipboard");
         } else {
         const textarea = document.createElement("textarea");
         textarea.value = url;
         textarea.style.position = "fixed";
         textarea.style.left = "-9999px";
         document.body.appendChild(textarea);
         textarea.focus();
         textarea.select();
         const successful = document.execCommand("copy");
         document.body.removeChild(textarea);
         if (successful) {
            console.log("URL copied to clipboard");
         } else {
            console.warn("Copy command was unsuccessful");
         }
         }
      } catch (error) {
         console.error("Failed to copy URL:", error);
      }
   };

   return (
      <div className="mb-4 main overflow-hidden ">
         <header className="flex flex-col gap-4">
            <Avatar
               src={author?.profilePicture}
               name={author?.name}
               userName={author?.userName}
               fallowViable={true}>
               <details className="relative">
                  <summary className="bx bx-dots-vertical-rounded"></summary>
                  <div className="p-4 bg-main absolute top-0 right-0">
                     <SecondaryBtn
                        className="w-full text-left px-4 py-2 whitespace-nowrap"
                        onClick={handleShare}>
                        Paylaş
                     </SecondaryBtn>
                     {isOwner ? (
                        <Link
                           href={`/posts/${post._id}/edit`}
                           className="block px-4 py-2 whitespace-nowrap">
                           Gönderiyi Düzenle
                        </Link>
                     ) : (
                        <SecondaryBtn className="w-full text-left px-4 py-2 whitespace-nowrap">
                           Gönderiyi Bildir
                        </SecondaryBtn>
                     )}
                  </div>
               </details>
            </Avatar>
         </header>
         <main
            className=" my-4 flex flex-col gap-2"
            onDoubleClick={handleDoubleClick}>
            <p className="">{post?.content}</p>
            <div className="">
               <PostSlider items={post.media ?? []} aspectRatio="16/9" />
            </div>
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
