import { BreadcrumbSchema } from "@/components/schema";
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
   const { username = "" } = await params;
   const normalizedUsername = cleanUserName(username);
   
   

   const { data: user } = await getUser(normalizedUsername);

   const hasSocialLinks = user?.websites && Object.keys(user.websites).length > 0;
   const hasAddress = !!user?.address;
   const hasPhoneNumbers = user?.phoneNumbers?.length > 0;

   return (
      <section className="flex flex-col gap-8 max-w-3xl">
         {/* Bio Section */}
         <article className="space-y-3">
            <h3 className="text-2xl font-bold text-foreground tracking-tight">
               Hakkında
            </h3>
            <p className="text-lg leading-relaxed text-muted-foreground whitespace-pre-wrap">
               {user?.bio || "Bu kullanıcı kendisi hakkında herhangi bir bilgi sağlamamıştır."}
            </p>
         </article>

         {/* Social Links Section */}
         <article className="space-y-4">
            <h4 className="text-xl font-semibold text-foreground">
               Sosyal Bağlantılar
            </h4>
            {hasSocialLinks ? (
               <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {Object.entries(user.websites).map(([platform, link]) => (
                     <SocialLinkItem 
                        key={platform} 
                        platform={platform} 
                        link={link} 
                     />
                  ))}
               </ul>
            ) : (
               <p className="text-muted-foreground">Bu kullanıcı sosyal bağlantılar sağlamamıştır.</p>
            )}
         </article>

         {/* Contact & Location Section */}
         <article className="p-6 rounded-xl bg-accent/50 border border-border space-y-4">
            <h5 className="text-xl font-semibold text-foreground mb-4">
               Konum ve İletişim
            </h5>
            
            <div className="space-y-3 text-muted-foreground">
               {hasAddress ? (
                  <ContactItem icon="bx-map">
                     {`${user.address?.streetAddress} ${user.address?.zipCode}, ${user.address?.district}, ${user.address?.city}, ${user.address?.country}`}
                  </ContactItem>
               ) : (
                  <p className="text-sm italic">Konum bilgisi mevcut değil.</p>
               )}

               {user?.publicEmail && (
                  <ContactItem icon="bx-envelope">
                     <a 
                        href={`mailto:${user.email}`} 
                        className="hover:text-primary transition-colors hover:underline decoration-primary/50"
                     >
                        {user.email}
                     </a>
                  </ContactItem>
               )}

               {hasPhoneNumbers && user.phoneNumbers.map((phone, index) => (
                  <ContactItem key={index} icon="bx-phone">
                     <a 
                        href={`tel:${phone}`} 
                        className="hover:text-primary transition-colors hover:underline decoration-primary/50"
                     >
                        {phone}
                     </a>
                  </ContactItem>
               ))}
            </div>
         </article>

         <BreadcrumbSchema
            items={[
               {
                  name: `${normalizedUsername}` || "Profile",
                  url: `/@${normalizedUsername}`,
               },
               {
                  name: "About",
                  url: `/@${normalizedUsername}/about`,
               },
            ]}
         />
      </section>
   );
}

// Sub-components for cleaner separation of concerns

function SocialLinkItem({ platform, link }) {
   const iconClass = socialMediaIcons[platform] || "bx bx-link";
   const label = platform.charAt(0).toUpperCase() + platform.slice(1);

   return (
      <li>
         <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-3 rounded-lg bg-card hover:bg-accent border border-transparent hover:border-border transition-all duration-200 group"
         >
            <i className={`${iconClass} text-xl text-muted-foreground group-hover:text-primary transition-colors`}></i>
            <span className="font-medium text-foreground group-hover:text-primary transition-colors">
               {label}
            </span>
         </a>
      </li>
   );
}

function ContactItem({ icon, children }) {
   return (
      <div className="flex items-start gap-3">
         <i className={`bx ${icon} text-xl mt-0.5 text-primary`}></i>
         <span className="text-base leading-snug break-words">
            {children}
         </span>
      </div>
   );
}
