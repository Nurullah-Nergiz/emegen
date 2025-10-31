"use client";

import { useState } from "react";
import { SecondaryBtn } from "./index";
import { setUserFallowing, setUserUnFallowing } from "@/services/userFallow";

export default function FollowBtn({
   id = "",
   isFollowing = false,
   className = "",
   ...props
}) {
   const [userFollow, setUserFollow] = useState(isFollowing);

   return (
      <SecondaryBtn
         className={`${className} whitespace-nowrap`}
         onClick={() => {
            if (!userFollow) {
               setUserFallowing(id)
                  .then((res) => {
                     if (res.status === 201) {
                        console.log("User followed successfully");
                        setUserFollow(true);
                     } else {
                        console.error("Failed to follow user");
                     }
                  })
                  .catch((err) => {
                     console.error("Error following user:", err);
                  });
            } else {
               setUserUnFallowing(id)
                  .then((res) => {
                     if (res.status === 200) {
                        console.log("User unfollowed successfully");
                        setUserFollow(false);
                     } else {
                        console.error("Failed to unfollow user");
                     }
                  })
                  .catch((err) => {
                     console.error("Error unfollowing user:", err);
                  });
            }
         }}
         {...props}>
         {userFollow ? "Takip bırak" : "Takip et"}
      </SecondaryBtn>
   );
}
