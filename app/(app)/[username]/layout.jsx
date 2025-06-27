import { AvatarImg, CoverImage } from "@/components/widgets/avatar";
import Link from "next/link";
import { PrimaryBtn, SecondaryBtn } from "@/components/btn";
import { RecommendedPeopleWidget } from "../../../components/widgets/RecommendedPeople";
import FollowBtn from "@/components/btn/Follow";
import { getUser } from "@/services/user";
import { notFound } from "next/navigation";
import useAuthUser from "@/hooks/auth";
import { Ad } from "@/components/AdBanner";

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

               <div className="py-4 flex flex-wrap items-stretch gap-4 overflow-hidden">
                  <section className="flex-1 flex gap-4">
                     <AvatarImg
                        src={user?.profilePicture}
                        className="w-auto h-full max-w-40 max-h-80 p-1 "
                        width={384}
                     />
                     <section className="flex-1 flex flex-wrap gap-4">
                        <div className="flex flex-col justify-center gap-2">
                           <div className="flex flex-wrap gap-2">
                              <h1 className="inline-flex items-center gap-2 text-2xl font-bolds whitespace-nowrap">
                                 {user?.name}
                                 {user?.isVerified && (
                                    <i className="bx bxs-check-circle text-blue-500"></i>
                                 )}
                              </h1>
                           </div>
                              <p className="text-base">@{user?.userName}</p>
                           <div className="flex items-center gap-4">
                              <span>
                                 <b>{user?.followersCount + " "}</b>
                                 takipçiler
                              </span>
                              <span>
                                 <b>{user?.followingCount + " "}</b>
                                 takip
                              </span>
                              <span>
                                 <b>{(user?.postCount || 0) + " "}</b>
                                 gönderi
                              </span>
                           </div>
                           <div className="flex flex-wrap items-center gap-2">
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
                              <a
                                 className="px-1 border-b border-tertiary whitespace-nowrap bx bx-phone"
                                 href={`tel:${user?.phoneNumbers[0]}`}>
                                 Telefon
                              </a>
                              {user?.location && (
                                 <p className="bx bx-map px-1 border-b border-tertiary whitespace-nowrap">
                                    {user?.location}
                                 </p>
                              )}
                           </div>
                           {/* <p className="whitespace-nowrap">
                              <i className="bx bx-calendar"></i>
                              {new Date(user?.createdAt).toLocaleDateString()} Joined
                           </p> */}
                        </div>
                     </section>
                  </section>
                  <div className="w-full sm:w-min flex items-center justify-stretch gap-4d">
                     {isAuthenticatedUser ? (
                        <>
                           <SecondaryBtn className="bx bx-share-alt !w-full py-2 px-4">
                              Paylaş
                           </SecondaryBtn>
                           <Link href="/settings/edit-profile" className="!w-full">
                              <PrimaryBtn className="bx bx-edit !w-full py-2 px-4">
                                 Profili Düzenle
                              </PrimaryBtn>
                           </Link>
                        </>
                     ) : (
                        <>
                           <FollowBtn type="secondary" className="!w-full" />
                           <PrimaryBtn className="!w-full">Teklif Al</PrimaryBtn>
                        </>
                     )}
                  </div>
               </div>
            </header>
            <div className="flex flex-col gap-2">
               <h2 className="text-xl font-semi bold">Hakkında </h2>
               <p className="text-sm text-secondary">
                  {user?.bio ||
                     "Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus, doloremque."}
               </p>
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
            </div>
            <div className="justify-items-end flex gap-4"></div>

            <nav className="main my-4 flex gap-4 border-b border-secondary">
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
         <aside className="min-w-96 w-full sm:w-1/3 flex flex-col gap-4">
            <Ad />
            <div className="main">
               Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti
               commodi incidunt architecto fuga, aperiam est rem obcaecati
               officia eveniet ut hic temporibus, nam, consequatur ipsam
               doloremque a vel officiis provident.
            </div>
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
