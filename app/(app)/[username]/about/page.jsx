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
      </section>
   );
}
