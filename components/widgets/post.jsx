"use client";
import { useState, useEffect } from "react"; // Added missing imports
import Post from "@/components/post/index";
import { getExplore } from "@/services/explore";
import { VList, WindowVirtualizer } from "virtua";

export default function Posts({
   posts = [],
   emptyStateText = "Henüz gönderi yok.",
   isLoading = false,
   hasMore = true,
}) {
   return (
      <>
         {!posts || (posts.length === 0 && !isLoading) ? (
            <>
               <div className="flex flex-col items-center justify-center py-12 text-center text-sm text-muted-foreground">
                  <p>{emptyStateText}</p>
               </div>
            </>
         ) : (
            <>
               {Array.isArray(posts) ? (
                  posts?.map((post, index) => (
                     // Render each post with a stable key (prefer _id, fallback to index)
                     <Post key={`post-${index}-${post?._id}`} post={post} />
                  ))
               ) : (
                  <Post post={posts} />
               )}

               {isLoading && (
                  <div className="py-4 text-center text-sm text-muted-foreground">
                     Loading...
                  </div>
               )}

               {!hasMore && posts.length > 0 && (
                  <div className="py-4 text-center text-sm text-muted-foreground">
                     Daha fazla post yok
                  </div>
               )}
            </>
         )}
      </>
   );
}

export const ExportedPostsWidget = ({
   initialPosts = [],
   emptyStateText = "Henüz gönderi yok.",
}) => {
   const [posts, setPosts] = useState([...initialPosts]);
   const [page, setPage] = useState(1);
   const [loading, setLoading] = useState(false);
   const [hasMore, setHasMore] = useState(true);

   const loadMorePosts = async () => {
      if (loading || !hasMore) return;
      setLoading(true);
      try {
         const newPosts = await getExplore(page + 1);
         if (newPosts && newPosts.length > 0) {
            setPosts((prev) => [...prev, ...newPosts]);
            setPage((prev) => prev + 1);
         } else {
            setHasMore(false);
         }
      } catch (error) {
         console.error("Failed to load more posts:", error);
      } finally {
         setLoading(false);
      }
   };

   useEffect(() => {
      const handleScroll = () => {
         if (
            window.innerHeight + document.documentElement.scrollTop >=
            document.documentElement.offsetHeight - 100
         ) {
            loadMorePosts();
         }
      };

      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
   }, [page, loading, hasMore]); // Dependencies for scroll handler

   return (
      <Posts
         posts={posts}
         emptyStateText={emptyStateText}
         isLoading={loading}
         hasMore={hasMore}
      />
   );
};
