import { getUser } from "@/services/user";

export default async function AboutPage({ params }) {
   const { username } = (await params) || "";
   const normalizedUsername = username
      .replace(/%40/g, "")
      .replace(/^@/, "")
      .trim();

   const { status, data: user } = await getUser(normalizedUsername);

   const websiteItems = (() => {
      const value = user.website;
      if (!value) return null;
      const list = Array.isArray(value) ? value : [value];
      return list
         .map((w, i) => {
            if (typeof w === "string") {
               const href = /^https?:\/\//i.test(w) ? w : `https://${w}`;
               return (
                  <li key={`web-${i}`}>
                     <strong>Web:</strong>{" "}
                     <a href={href} target="_blank" rel="noopener noreferrer">
                        {w.replace(/^https?:\/\//i, "")}
                     </a>
                  </li>
               );
            }
            if (w && typeof w === "object") {
               const url = w.url || w.link || "";
               if (!url) return null;
               const label = w.label || url.replace(/^https?:\/\//i, "");
               const href = /^https?:\/\//i.test(url) ? url : `https://${url}`;
               return (
                  <li key={w._id || `web-${i}`}>
                     <strong>{w.label ? w.label : "Web"}:</strong>{" "}
                     <a href={href} target="_blank" rel="noopener noreferrer">
                        {label}
                     </a>
                  </li>
               );
            }
            return null;
         })
         .filter(Boolean);
   })();

   return (
      <section className="prose max-w-2xl">
         <h1>
            Hakkında:{" "}
            {user?.displayName || user?.username || normalizedUsername}
         </h1>
         {user?.bio && <p>{user.bio}</p>}
         <ul>
            {user?.location && (
               <li>
                  <strong>Konum:</strong> {user.location}
               </li>
            )}
            {websiteItems}
            {user?.joinedAt && (
               <li>
                  <strong>Katıldı:</strong>{" "}
                  {(() => {
                     try {
                        return new Date(user.joinedAt).toLocaleDateString(
                           "tr-TR"
                        );
                     } catch {
                        return "-";
                     }
                  })()}
               </li>
            )}
         </ul>
         <ul>
            {Object.entries(user?.websites).map(([key, url]) => {
               if (!url) return null;
               const href = /^https?:\/\//i.test(url) ? url : `https://${url}`;

               const boxİcons = {
                  website: "bx bx-globe",
                  linkedin: "bx bxl-linkedin",
                  youtube: "bx bxl-youtube",
                  twitter: "bx bxl-twitter",
                  x: "bx bxl-twitter",
                  facebook: "bx bxl-facebook",
                  instagram: "bx bxl-instagram",
                  github: "bx bxl-github",
                  gitlab: "bx bxl-gitlab",
                  bitbucket: "bx bxl-bitbucket",
                  medium: "bx bxl-medium",
                  devto: "bx bxl-dev-to",
                  stackoverflow: "bx bxl-stack-overflow",
                  reddit: "bx bxl-reddit",
                  pinterest: "bx bxl-pinterest",
                  tumblr: "bx bxl-tumblr",
                  flickr: "bx bxl-flickr",
                  whatsapp: "bx bxl-whatsapp",
                  telegram: "bx bxl-telegram",
                  tiktok: "bx bxl-tiktok",
                  snapchat: "bx bxl-snapchat",
                  discord: "bx bxl-discord",
                  spotify: "bx bxl-spotify",
                  soundcloud: "bx bxl-soundcloud",
                  twitch: "bx bxl-twitch",
                  steam: "bx bxl-steam",
                  dribbble: "bx bxl-dribbble",
                  behance: "bx bxl-behance",
                  codepen: "bx bxl-codepen",
                  jsfiddle: "bx bxl-jsfiddle",
                  hackerrank: "bx bxl-hackerrank",
                  leetcode: "bx bxl-leetcode",
                  codewars: "bx bxl-codewars",
                  kaggle: "bx bxl-kaggle",
                  deviantart: "bx bxl-deviantart",
                  goodreads: "bx bxl-goodreads",
                  lastfm: "bx bxl-lastfm",
                  quora: "bx bxl-quora",
                  skype: "bx bxl-skype",
                  vimeo: "bx bxl-vimeo",
                  wordpress: "bx bxl-wordpress",
                  wix: "bx bxl-wix",
                  weebly: "bx bxl-weebly",
                  yelp: "bx bxl-yelp",
                  zillow: "bx bxl-zillow",
                  etsy: "bx bxl-etsy",
               };

               return (
                  <li
                  className="flex items-center gap-2"
                     key={`web-${key}`}>
                     {boxİcons[key] ? <i className={boxİcons[key]}></i> : key+" : "}
                     <a href={href} target="_blank" rel="noopener noreferrer">
                        {url.replace(/^https?:\/\//i, "")}
                     </a>
                  </li>
               );
            })}
         </ul>
      </section>
   );
}

export async function generateMetadata({ params }) {
   const { username } = (await params) || "";
   const normalizedUsername = username
      .replace(/%40/g, "")
      .replace(/^@/, "")
      .trim();
   return {
      title: `Hakkında: ${normalizedUsername}`,
      description: `${normalizedUsername} hakkında bilgiler.`,
      alternates: {
         canonical: `https://emegen.com.tr/${username.replace(
            "%40",
            "@"
         )}/about`,
      },
      openGraph: {
         title: `Hakkında: ${normalizedUsername}`,
         description: `${normalizedUsername} hakkında bilgiler.`,
         images: [
            {
               url: "https://cdn.emegen.com.tr/emegen-logo.png",
               width: 800,
               height: 600,
               alt: "Emegen Logo",
            },
         ],
      },
      twitter: {
         card: "summary_large_image",
         title: `Hakkında: ${normalizedUsername}`,
         description: `${normalizedUsername} hakkında bilgiler.`,
         images: ["https://cdn.emegen.com.tr/emegen-logo.png"],
      },
   };
}
