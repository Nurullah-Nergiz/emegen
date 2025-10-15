"use client";
import { PrimaryBtn } from "@/components/btn/";
import Cookies from "js-cookie";
import { useState } from "react";
// import useTheme from "@/hooks/useTheme";

export default function ThemePage({ children }) {
   const themes = [
      {
         name: "System Theme",
         description: "bu,SisteminizinKullandığıTema",
         image: "/images/system-theme.svg",
         value: "system",
      },
      {
         name: "Ligth Theme",
         description:
            "Bu tema, sisteminiz bir ışık modu kullanırken etkinleştirilecektir",
         image: "/images/light-theme.svg",
         value: "light",
      },
      {
         name: "Dark Theme",
         description:
            "Bu tema, sisteminiz karanlık mod olarak ayarlandığında etkinleştirilecektir",
         image: "/images/dark-theme.svg",
         value: "dark",
      },
   ];

   const [currentTheme, setCurrentTheme] = useState(Cookies.get("theme"));

   const handleThemeChange = () => {
      Cookies.set("theme", currentTheme, { expires: 365 });

      document.documentElement.classList.remove("system", "light", "dark");
      document.documentElement.classList.add(currentTheme);
   };

   return (
      <>
         <main>
            <h1>Tercihler</h1>
            <p className="py-4">
               Arayüzünüzün nasıl görünmesini istediğinizi seçin.Bir Tema Seçin
               veya sisteminizle senkronize edin ve otomatik tema değiştirme.
            </p>
            <section className="p-4 bg-main rounded-xl">
               <ul className="flex flex-col md:flex-row gap-4 rounded-2xl">
                  {themes.map((theme) => (
                     <li
                        className="min-w-80 flex-1 bg-main rounded-xl shadow-lg transition-transform transform hover:scale-105"
                        key={theme.name}>
                        <label className="theme-switch w-full h-full p-4 !flex flex-col justify-between gap-4 cursor-pointer">
                           <input
                              type="radio"
                              name="theme"
                              className="w-4 h-4 appearance-none rounded-full border-2 border-gray-300 checked:bg-blue-500 checked:border-transparent focus:outline-none transition-colors duration-200"
                              checked={currentTheme === theme.value}
                              onChange={() => setCurrentTheme(theme.value)}
                           />
                           <b>{theme.name}</b>
                           <p className="">{theme.description}</p>
                           <img
                              src={theme.image}
                              alt={theme.name}
                              className="flex-1"
                           />
                        </label>
                     </li>
                  ))}
               </ul>
               <div className="my-4 text-right">
                  <PrimaryBtn onClick={() => handleThemeChange()}>
                     Save changes
                  </PrimaryBtn>
               </div>
            </section>
         </main>
      </>
   );
}
