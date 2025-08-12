import { ItemLink } from "@/components/nav/itemLink";

export default function TendersLayout({ children }) {
   return (
      <section className="w-full flex flex-col gap-4">
         <h1 className="text-2xl font-bold ">İhaleler</h1>
         <nav className=" flex gap-4 border-b border-tertiary">
            {[
               {
                  label: "Tekliflerim",
                  value: "",
                  link: "/tenders",
               },
               {
                  label: "Gelen Teklifler",
                  link: "/tenders/incoming",
               },
               {
                  label: "Yeni İhale Oluştur",
                  link: "/tenders/new",
               },
            ].map(({ label, link }, i) => (
               <ItemLink
                  className="py-2"
                  activeClass="!border-b border-primary"
                  text={label}
                  link={link}
                  key={`${label.replaceAll(" ", "-")}-${i}`}></ItemLink>
            ))}
         </nav>
         <section className="h-full flex flex-col lg:flex-row gap-10">
            {children}
         </section>
      </section>
   );
}

export const metadata = {
   title: "İhaleler - Emegen",
   description: "İhale yönetim paneli",
};
