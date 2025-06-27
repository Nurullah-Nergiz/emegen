"use client";
import { Avatar } from "@/components/widgets/avatar";
import { getTenders } from "@/services/tender.js";
import { useState } from "react";

export default function OffersPage({ children }) {
   const [tenders, setTenders] = useState([
      {
         _id: "685306cf710bf0c0d6a349e3",
         type: "public",
         author: [
            {
               _id: "65b2543de059ab865c0eb763",
               name: "Nurullah Nergiz",
               userName: "nurullah-nergiz",
               bio: "Full Stack Developer || Frontend Developer (reactjs, vuejs) And Backend (nodejs, expressjs)",
               email: "nurullah@nergiz.me",
               active: true,
               createdAt: "2024-01-25T12:29:49.631Z",
               updatedAt: "2025-06-21T15:54:39.586Z",
               tags: [["nodejs", "developer"]],
               location: "Çumra, Konya, Türkiye",
               coverPicture: "coverPictures/65b2543de059ab865c0eb763.jpg",
               profilePicture: "avatars/65b2543de059ab865c0eb763.png",
               phoneNumbers: ["+90547241456"],
               website: "https://nurullahnergiz.vercel.app/",
            },
         ],
         title: "100",
         description: "6840749238d4584c803c7d97",
         status: "open",
         skillsRequired: [],
         tags: [],
         invitedUsers: [],
         proposalsCount: 0,
      },
      {
         _id: "685306cf710bf0c0d6a349e4",
         type: "private",
         title: "Project Alpha",
         description: "This is a private project for selected users.",
         status: "closed",
         author: [
            {
               _id: "65b2543de059ab865c0eb763",
               name: "Nurullah Nergiz",
               userName: "nurullah-nergiz",
               bio: "Full Stack Developer || Frontend Developer (reactjs, vuejs) And Backend (nodejs, expressjs)",
               email: "nurullah@nergiz.me",
               active: true,
               createdAt: "2024-01-25T12:29:49.631Z",
               updatedAt: "2025-06-21T15:54:39.586Z",
               tags: [["nodejs", "developer"]],
               location: "Çumra, Konya, Türkiye",
               coverPicture: "coverPictures/65b2543de059ab865c0eb763.jpg",
               profilePicture: "avatars/65b2543de059ab865c0eb763.png",
               phoneNumbers: ["+90547241456"],
               website: "https://nurullahnergiz.vercel.app/",
            },
         ],
      },
   ]);

   getTenders()
      .then((response) => {
         console.log(response.data);
      })
      .catch((error) => {
         console.error("Error fetching tenders:", error);
      });

   return (
      <>
         <main className="flex-1">
            <h1 className="mb-2">Tenders</h1>
            <nav className="py-2">All Active Closed</nav>
            <hr />
            <section className="flex flex-wrap gap-4 ">
               {[...tenders, ...tenders].map((tender, i) => {
                  const user = tender?.author[0];
                  return (
                     <ul
                        key={tender._id + "-" + i}
                        className="main w-full max-w-96">
                        <li className="flex flex-col">
                           <h3 className="text-2xl">{tender.title}</h3>
                           <p>{tender.description}</p>
                           <p>Status: {tender.status}</p>
                           <Avatar
                              userAvatar={user?.avatar}
                              name={`${user?.name} `}
                              userName={user?.userName}
                              src={user?.profilePicture}
                              className="sm:flex hidden"
                           />
                        </li>
                     </ul>
                  );
               })}
            </section>
         </main>
      </>
   );
}
