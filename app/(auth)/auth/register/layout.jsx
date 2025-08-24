
export default function RootLayout({ children }) {
   return <>{children}</>;
}

export const metadata = {
   title: "Kayıt Ol",
   description: "Emegen\’e ücretsiz üye olun. Avantajlardan yararlanın, işlemlerinizi kolayca yönetin.",
   keywords:
      "Emegen kayıt, kullanıcı kaydı, üye kaydı, hesap kaydı, kayıt ol, ücretsiz kayıt",
   alternates: {
      canonical: "emegen.com.tr/auth/register",
   },
};
export const dynamic = "force-dynamic"; // Force dynamic rendering for this layout
export const revalidate = 0; // Disable revalidation for this layout
export const fetchCache = "force-no-store"; // Disable cache for this layout
export const runtime = "edge"; // Use Edge runtime for this layout
export const preferredRegion = "auto"; // Automatically select the preferred region for this layout
export const tags = ["auth", "login", "user"]; // Tags for this layout
export const cache = "no-store"; // Disable caching for this layout
export const tagsCache = "no-store"; // Disable caching for tags in this layout
export const fetchTags = "no-store"; // Disable fetching tags for this layout
export const fetchTagsCache = "no-store"; // Disable caching for fetched tags in this layout
