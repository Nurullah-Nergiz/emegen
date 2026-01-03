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
export default function PostItem({ post = {} }) {
   const [isOwner, setIsOwner] = useState(false);
   const [isContentExpanded, setIsContentExpanded] = useState(false);
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

   const [commentVisible, setCommentVisible] = useState(false);

   const handleDoubleClick = () => {
      document.querySelector(`[data-like-id="${post._id}"]`)?.click();
   };

   const handleShare = async () => {
      try {
         const url =
            window.location.protocol +
            "//" +
            window.location.host +
            `/posts/${post._id}`;

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

   const content = post?.content || "";
   const canBeTruncated = content.length > 250;

   const renderContentWithHashtags = (text) => {
      const parts = text.split(/(#\w+)/g);
      return parts.map((part, index) => {
         if (part.startsWith("#")) {
            const tag = part.substring(1);
            return (
               <Link
                  key={index}
                  href={`/hashtags/${tag}`}
                  className="text-blue-600 hover:text-blue-800 hover:underline font-medium">
                  {part}
               </Link>
            );
         }
         return part;
      });
   };

   return (
      <article className="bg-main rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 p-5 sm:p-6 mb-6">
         <header className="flex items-start justify-between mb-4 shadow-sm pb-4 px-1">
            <div className="flex-1">
               <Avatar
                  src={author?.profilePicture}
                  name={author?.name}
                  userName={author?.userName}
                  fallowViable={true}>
                  {/* Options Menu */}
                  <details className="relative ml-auto">
                     <summary className="bx bx-dots-horizontal-rounded text-xl text-gray-400 hover:text-gray-600 cursor-pointer list-none p-1"></summary>
                     <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-100 z-10 overflow-hidden">
                        <SecondaryBtn
                           className="w-full text-left px-4 py-3 hover:bg-gray-50 text-sm text-gray-700 transition-colors"
                           onClick={handleShare}>
                           Paylaş
                        </SecondaryBtn>
                        {isOwner ? (
                           <Link
                              href={`/posts/${post._id}/edit`}
                              className="block w-full text-left px-4 py-3 hover:bg-gray-50 text-sm text-gray-700 transition-colors">
                              Gönderiyi Düzenle
                           </Link>
                        ) : (
                           <SecondaryBtn className="w-full text-left px-4 py-3 hover:bg-gray-50 text-sm text-red-600 transition-colors">
                              Gönderiyi Bildir
                           </SecondaryBtn>
                        )}
                     </div>
                  </details>
               </Avatar>
            </div>
         </header>

         <main className="mb-4" onDoubleClick={handleDoubleClick}>
            <div className="text-gray-800 text-base leading-relaxed whitespace-pre-wrap mb-3">
               {renderContentWithHashtags(
                  canBeTruncated && !isContentExpanded
                     ? `${content.substring(0, 250)}...`
                     : content
               )}
               {canBeTruncated && !isContentExpanded && (
                  <button
                     onClick={() => setIsContentExpanded(true)}
                     className="text-gray-500 hover:text-gray-700 font-medium ml-1 text-sm hover:underline">
                     daha fazla göster
                  </button>
               )}
            </div>

            <div className="rounded-xl overflow-hidden shadow-sm border border-gray-100">
               <PostSlider items={post.media ?? []} aspectRatio="16/9" />
            </div>
         </main>

         <footer className="flex items-center justify-between pt-4 mt-2 border-t border-gray-50">
            <div className="flex items-center space-x-6 text-2xl text-gray-400">
               <div className="hover:text-red-500 transition-colors duration-200 flex items-center">
                  <BtnLiked isLiked={post.isLiked ?? false} id={post._id} />
               </div>

               <button
                  className="bx bx-message-rounded hover:text-blue-500 transition-colors duration-200"
                  onClick={() => setCommentVisible(!commentVisible)}
                  aria-label="Yorum yap"></button>

               <button
                  className="bx bx-share-alt hover:text-green-500 transition-colors duration-200"
                  onClick={handleShare}
                  aria-label="Paylaş"></button>
            </div>

            <div className="text-2xl text-gray-400 hover:text-yellow-500 transition-colors duration-200">
               <BtnBookmarked
                  isBookmarked={post.isBookmarked ?? false}
                  id={post._id}
               />
            </div>
         </footer>

         <details open={commentVisible} className="group">
            <summary className="hidden">Comments</summary>
            <div className="mt-4 pt-4 border-t border-gray-100 animate-in fade-in slide-in-from-top-2 duration-300">
               <CommentEditor postId={post._id} />
               <div className="mt-4">
                  <CommentView comments={post.comments} />
               </div>
            </div>
         </details>
      </article>
   );
}
