import { Avatar } from "@/components/widgets/avatar";
import { getUserFollowing } from "@/services/userFallow";
import FollowBtn from "@/components/btn/Follow";

export default async function FollowingPage({ params }) {
   const { username } = await params;

   const res = await getUserFollowing(username.replace("%40", ""));
   const followers = res.data.followers;

   return (
      <>
         <div className="flex flex-col gap-4">
            {followers.map((follower, i) => (
               <div
                  key={`following-${follower._id}-${i}`}
                  className="flex items-center gap-4 p-4 border border-gray-300 rounded-lg">
                  <Avatar
                     src={follower?.profilePicture}
                     name={follower.name}
                     userName={follower.userName}
                  />
                  <FollowBtn userId={follower._id} />
               </div>
            ))}
         </div>
      </>
   );
}
