import { AvatarImg, CoverImage } from "@/components/widgets/avatar";
import Link from "next/link";
import { PrimaryBtn, SecondaryBtn } from "@/components/btn";
import { RecommendedPeopleWidget } from "../../../components/widgets/RecommendedPeople";
import FollowBtn from "@/components/btn/Follow";
import { getUser } from "@/services/user";
import { notFound } from "next/navigation";
import useAuthUser from "@/hooks/auth";
import { Ad } from "@/components/Ad";
import Image from "next/image";

export default async function Layout({ children, params }) {
   // console.clear();

   /**
    * @type {String}
    */
   const { username = "" } = await params;
   if (!username.startsWith("%40")) notFound();

   const { status, data: user } = await getUser(
      username.replace(/%40/g, "").trim()
   );
   console.log("user:", user);

   // console.log(await useAuthUser());
   const isAuthenticatedUser = (await useAuthUser())?._id === user?._id;

   if (status !== 200 || user.length == 0) notFound();

   return (
      <>
         <section className="flex-1">
            <header className="">
               <CoverImage src={user?.coverPicture} />

               <section className="py-4 flex flex-wrap items-stretch  gap-4 overflow-hidden">
                  <AvatarImg
                     src={user?.profilePicture}
                     className="w-auto h-full max-w-40 max-h-80 p-1 "
                     width={240}
                  />
                  {/* <div className="px-4 flex items-end justify-between ">
                  </div> */}
                  <section className="flex-1 flex flex-wrap gap-4">
                     <div className="flex flex-col gap-2">
                        <div className="flex items-center">
                           <div className="whitespace-nowrap">
                              <h1 className="inline-flex items-center gap-2 text-2xl font-bolds ">
                                 {user?.name}
                                 <i className="bx bxs-check-circle text-blue-500"></i>
                              </h1>
                           </div>
                        </div>
                        <p className=" text-base">@{user?.userName}</p>
                        {/* <p className="max-h-10 text-sm overflow-hidden text-ellipsis">
                           {user?.bio} Lorem ipsum, dolor sit amet consectetur
                           adipisicing elit. Ex impedit nihil doloremque
                           voluptas itaque laboriosam nesciunt, quam error quo
                           cum dolores perferendis in quisquam? Consequatur sit
                           recusandae sed praesentium non!
                        </p> */}
                        {/* </div>
                     <div className="flex flex-col gap-4"> */}
                        <div className="flex items-center gap-4">
                           <span>
                              <b>{user?.followingCount}</b> following
                           </span>
                           <span>
                              <b>{user?.followersCount}</b> followers
                           </span>
                        </div>
                        <div className="flex items-center gap-4">
                           {user?.location && (
                              <p className="bx bx-map px-1 border-b border-tertiary whitespace-nowrap">
                                 {user?.location}
                              </p>
                           )}
                           {user?.website && (
                              <a
                                 className="bx bx-link px-1 border-b border-tertiary whitespace-nowrap hover:underline"
                                 href={user?.website}
                                 target="_blank"
                                 rel="noopener noreferrer"
                                 title="Website">
                                 Website
                              </a>
                           )}
                           <p className="px-1 border-b border-tertiary whitespace-nowrap">
                              <i className="bx bx-phone"></i>
                              {user?.phoneNumber}
                              Phone
                           </p>
                           {/* <p className="whitespace-nowrap">
                              <i className="bx bx-calendar"></i>
                              {new Date(user?.createdAt).toLocaleDateString()} Joined
                           </p> */}
                        </div>
                        <div className="flex items-center gap-2">
                           {(typeof user?.tags[0] === "object"
                              ? user.tags[0]
                              : user.tags
                           )?.map((tag) => (
                              <span
                                 key={tag}
                                 className="text-xs px-2 py-1 bg-secondary text-white rounded-lg underline">
                                 #{tag}
                              </span>
                           ))}
                        </div>
                        <div className="justify-items-end flex gap-4"></div>
                     </div>
                  </section>
                  <div className="mb-5 flex items-center gap-4">
                     {isAuthenticatedUser ? (
                        <>
                           <Link href="/settings/edit-profile" className="bx bx-edit">
                              <PrimaryBtn >
                                 Profili Düzenle
                              </PrimaryBtn>
                           </Link>
                           <SecondaryBtn>
                              
                           </SecondaryBtn>
                        </>
                     ) : (
                        <>
                           <FollowBtn type="secondary" />
                           <PrimaryBtn className="">Teklif Al</PrimaryBtn>
                        </>
                     )}
                  </div>
               </section>
               <div className="">
                  <h2 className="text-xl font-semibold mb-2">Hakkında </h2>
                  <p className="text-sm text-secondary">
                     {user?.bio ||
                        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus, doloremque."}
                  </p>
               </div>
            </header>

            <nav className="py-1 flex gap-4 border-b border-secondary">
               {[
                  { name: "Home", href: "" },
                  { name: "Posts", href: "posts" },
                  { name: "About", href: "about" },
               ].map(({ name, href }) => (
                  <Link
                     href={`/@${user?.userName}/${href}`}
                     className="hover:underline"
                     key={"profil-navbar-" + name}>
                     {name}
                  </Link>
               ))}
            </nav>
            {children}
         </section>
         <aside className="min-w-96 w-1/3 hidden lg:flex flex-col gap-4">
            <Ad />

            <RecommendedPeopleWidget />
         </aside>
      </>
   );
}

export async function generateMetadata({ params }) {
   const { username } = await params;
   if (username[0] !== "@") {
      const { status, data: user } = await getUser(
         username.replace(/%40/g, "").trim()
      );
      if (status == 200 || user.length !== 0)
         return {
            title: `${user?.name} (@${user?.userName}) - Emegen`,
         };
   }
}
