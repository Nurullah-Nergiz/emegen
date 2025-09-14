import PhotoGallery from "@/components/widgets/PhotoGallery";
import { getUserPosts } from "@/services/user";

export default async function Page({ params }) {
   console.clear();
   const { username } = await params;
   // const userPosts = await getUserPosts(username);

   return (
      <>
         <section className="flex flex-col gap-4">
            <PhotoGallery
               photos={[
                  "https://picsum.photos/320/180",
                  "https://picsum.photos/321/181",
                  "https://picsum.photos/322/182",
                  "https://picsum.photos/323/183",
                  "https://picsum.photos/324/184",
                  "https://picsum.photos/325/185",
                  "https://picsum.photos/326/186",

               ]}
            />

            {/* <div className="bg-gray-100 p-4 rounded shadow">
               <h2 className="text-xl font-semibold">Your Posts</h2>
               <ul className="list-disc pl-5">
                  {userPosts.length > 0 ? (
                     userPosts.map((post, index) => (
                        <li key={index} className="mt-2">
                           {post.title}
                        </li>
                     ))
                  ) : (
                     <li>No posts available.</li>
                  )}
               </ul>
            </div>
            <div className="bg-gray-100 p-4 rounded shadow">
               <h2 className="text-xl font-semibold">Gallery</h2>
               <div className="grid grid-cols-3 gap-4">
                  <div className="bg-gray-300 h-24 rounded"></div>
                  <div className="bg-gray-300 h-24 rounded"></div>
                  <div className="bg-gray-300 h-24 rounded"></div>
               </div>
            </div>
            <div className="bg-gray-100 p-4 rounded shadow">
               <h2 className="text-xl font-semibold">Widgets</h2>
               <div className="flex gap-4">
                  <div className="bg-gray-300 p-4 rounded w-1/2">
                     <p>Widget 1</p>
                  </div>
                  <div className="bg-gray-300 p-4 rounded w-1/2">
                     <p>Widget 2</p>
                  </div>
               </div>
            </div> */}
         </section>
      </>
   );
}
