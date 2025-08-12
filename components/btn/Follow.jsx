"use client";

import { useState } from "react";
import { PrimaryBtn, SecondaryBtn } from "./index";
import { setUserFallowing } from "@/services/userFallow";

export default function FollowBtn({ id = "", className = "", ...props }) {
   const [userFallow, setUserFallow] = useState(false);

   return (
      <SecondaryBtn
         className={`${className} whitespace-nowrap`}
         onClick={() => {
            console.log(`Following user with ID: ${id}`);
            setUserFallowing(id)
               .then((res) => {
                  if (res.status === 200) {
                     console.log("User followed successfully");
                     setUserFallow(true);
                  } else {
                     console.error("Failed to follow user");
                  }
               })
               .catch((err) => {
                  console.error("Error following user:", err);
               });
         }}
         {...props}>
         {userFallow ? "Takip bırak" : "Takip et"}
      </SecondaryBtn>
   );
}
