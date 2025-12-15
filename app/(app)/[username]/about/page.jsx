import { getUser } from "@/services/user";
import { socialMediaIcons } from "@/utils/iconList";
import { cleanUserName } from "@/utils/user";

export async function generateMetadata({ params }) {
   const { username } = await params;

   if (!username) {
      return {
         title: "Kullanıcı Bulunamadı",
      };
   } else {
      const normalizedUsername = cleanUserName(username);

      return {
         // title: `Hakkında - @${normalizedUsername}`,
         alternates: {
            canonical: `https://emegen.com.tr/@${normalizedUsername}/about`,
         },
      };
   }
}

export default async function AboutPage({ params }) {
   const { username } = (await params) || "";
   const normalizedUsername = username
      .replace(/%40/g, "")
      .replace(/^@/, "")
      .trim();

   const { data: user } = await getUser(normalizedUsername);

   return (
      <section className="flex flex-col gap-6">
         <div className="">
            <h3 className="text-2xl font-bold mb-4">Hakkında </h3>
            <p className="text-lg whitespace-pre-wrap">
               {user?.bio ||
                  "Bu kullanıcı kendisi hakkında herhangi bir bilgi sağlamamıştır."}
            </p>
         </div>
         <div className="">
            <h4 className="text-xl font-semibold mt-6 mb-2">
               Sosyal Bağlantılar
            </h4>
            {user?.websites && Object.keys(user.websites).length > 0 ? (
               <ul className="">
                  {Object.entries(user.websites).map(([platform, link]) => (
                     <li key={platform}>
                        <a
                           href={link}
                           target="_blank"
                           rel="noopener noreferrer"
                           className="flex items-center gap-2 hover:underline">
                           <i
                              className={`${
                                 socialMediaIcons[platform] || "bx bx-link"
                              }  `}></i>
                           {platform.charAt(0).toUpperCase() +
                              platform.slice(1)}
                        </a>
                     </li>
                  ))}
               </ul>
            ) : (
               <p>Bu kullanıcı sosyal bağlantılar sağlamamıştır.</p>
            )}
         </div>

         <div className="main !bg-accent">
            <h5 className="text-xl font-semibold ">Konum Ve İletişim</h5>
            {user?.address ? (
               <p className="flex items-center gap-2">
                  <i className="bx bx-map"></i>
                  {`${user.address?.streetAddress} ${user.address?.zipCode}, ${user.address?.district}, ${user.address?.city}, ${user.address?.country}`}
               </p>
            ) : (
               <p>Bu kullanıcı konum bilgisi sağlamamıştır.</p>
            )}
            {user?.publicEmail ? (
               <p className="flex items-center gap-2">
                  <i className="bx bx-envelope"></i>
                  <a href={`mailto:${user.email}`} className="hover:underline">
                     {user.email}
                  </a>
               </p>
            ) : (
               ""
            )}
            {user?.phoneNumbers?.length > 0
               ? user?.phoneNumbers.map((phone, index) => (
                    <p key={index} className="flex items-center gap-2">
                       <i className="bx bx-phone"></i>
                       <a href={`tel:${phone}`} className="hover:underline">
                          {phone}
                       </a>
                    </p>
                 ))
               : ""}
         </div>
      </section>
   );
}
