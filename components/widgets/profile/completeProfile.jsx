import ChartsDoughnut from "@/components/charts/doughnut";

export default function CompleteProfile({ children, user = {} }) {
   const userField =
      user &&
      Object.entries(user).filter(
         ([key]) =>
            ![
               "_id",
               "active",
               "createdAt",
               "updatedAt",
               "__v",
               "password",
               "email",
               "followersCount",
               "followingCount",
               "isFollowing",
            ].includes(key)
      );

   const userFieldCount = userField?.length;

   const validUserFieldCount =
      user &&
      Object.entries(user).filter(
         ([key, val]) =>
            ![
               "_id",
               "active",
               "createdAt",
               "updatedAt",
               "__v",
               "password",
               "email",
               "followersCount",
               "followingCount",
               "isFollowing",
            ].includes(key) && val
      ).length;

   return (
      <>
         <h2 className="text-xl text-center">Profilinizi tamamlayın</h2>

         <ChartsDoughnut
            datasets={[
               {
                  label: "",
                  data: [
                     0,
                     Math.round(
                        (100 / userField?.length) * validUserFieldCount
                     ) ?? 0,
                  ],
                  backgroundColor: ["rgba(0, 0, 0, .12)", "#d81f26"],
                  borderWidth: 1,
               },
            ]}
         />
         <ul className="">
            {userField &&
               userField.sort().map(([key, val]) => {
                  const isComplete =
                     val == null || val == undefined || val == ""
                        ? false
                        : true;
                  return (
                     <li key={key} className="py-2 flex items-center gap-2">
                        <i
                           className={`bx ${
                              isComplete ? "bx-check !text-green-500" : "bx-x"
                           } text-2xl`}></i>
                        <span className={`${isComplete ? "font-bold" : ""}`}>
                           {key.charAt(0).toUpperCase() +
                              key
                                 .replace(/([A-Z])/g, " $1")
                                 .replace(/^./, (str) => str.toUpperCase())
                                 .slice(1)}
                        </span>
                        {/* <span>{user[key]}</span> */}
                     </li>
                  );
               })}
         </ul>
      </>
   );
}
