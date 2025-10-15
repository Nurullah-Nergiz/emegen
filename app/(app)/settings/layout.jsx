import { Header } from "@/components/header/index";
import { Nav } from "@/components/nav";

export const metadata = {
   title: "Ayarlar",
};

export default async function RootLayout({ children }) {
   console.clear();

   return <>{children}</>;
}
