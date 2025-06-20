"use client";
import { setPostLike, setPostUnlike } from "@/services/postLike";
import { useState } from "react";

/**
 *
 * @param {Object} props
 * @param {Boolean} props.isLiked
 * @param {String} props.id
 * @returns
 */
export default function BtnLiked({ children, isLiked, id }) {
   const [like, setLike] = useState(isLiked);
   const toggleLike = () => {
      if (like) {
         setPostUnlike(id)
            .then((data) => {
               console.log(data);
            })
            .catch((err) => {
               console.log("err:", err);
            });
      } else {
         setPostLike(id)
            .then(({ data, status }) => {
               console.log(data, status);
            })
            .catch(({ response, status }) => {
               if (status===409) {
                  setLike(true)
               }
               console.log("err:", response);
            });
      }
      setLike(!like);
   };

   return (
      <>
         <button
            className={`bx ${like ? "bxs" : "bx"}-heart ${
               like ? "text-primary" : ""
               } `}
         data-like-id={id}
            onClick={toggleLike}></button>
      </>
   );
}
