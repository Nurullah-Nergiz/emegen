"use client";
import { PrimaryBtn } from "@/components/btn";
import {
   createUserService,
   getServiceById,
   updateUserService,
} from "@/services/services";
import { useEffect, useState } from "react";
import { iconList } from "@/utils/iconList";
import { useRouter } from "next/navigation";

export default function NewPage({ params }) {
   const [serviceData, setServiceData] = useState({});
   const router = useRouter();

   useEffect(() => {
      params.then(({ username, id = "" }) => {
         // console.log({ username, id });

         getServiceById(id).then((res) => {
            setServiceData({ ...res.data });
         });
      });
   }, []);

   const handleSubmit = (e) => {
      e.preventDefault();

      const priceValue = e.target.price.value;
      const isRange = priceValue.includes("-");
      const priceParts = priceValue.split("-").map(Number);

      const pricePayload = {
         type: isRange ? "range" : "fixed",
         min: priceParts[0],
         max: isRange ? priceParts[1] : priceParts[0],
         value: isRange ? null : priceParts[0],
      };

      updateUserService(serviceData._id, {
         title: e.target.title.value,
         icon: {
            type: "boxicons",
            url: e.target.icon.value,
         },
         description: e.target.description.value,
         price: pricePayload,
         currency: e.target.currency.value,
      })
         .then(async (response) => {
            const { username } = await params;
            router.push(`/${username}/services`);
         })
         .catch((error) => {
            console.error("Hizmet oluşturulamadı:", error);
         });
   };

   return (
      <div className="container mx-auto py-10">
         <h1 className="text-3xl font-bold mb-6">Hizmet Bilgilerini Düzenle</h1>
         <form className="space-y-8" onSubmit={handleSubmit}>
            <div className="space-y-2">
               <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700">
                  Hizmet Başlığı
               </label>
               <input
                  type="text"
                  name="title"
                  id="title"
                  className="w-full h-10 px-3 py-2 !bg-transparent border border-tertiary shadow shadow-tertiary rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="örn., Full-Stack Web Geliştirme"
                  defaultValue={serviceData.title || ""}
               />
            </div>

            <div className="space-y-2">
               <label
                  htmlFor="icon"
                  className="block text-sm font-medium text-gray-700">
                  İkon Anahtarı
               </label>
               <input
                  type="text"
                  name="icon"
                  id="icon"
                  list="icon-list"
                  className="w-full h-10 px-3 py-2 !bg-transparent border border-tertiary shadow shadow-tertiary rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="örn., bx-code-alt"
                  defaultValue={serviceData.icon?.url || ""}
               />
               <datalist id="icon-list">
                  {iconList.map((icon) => (
                     <option key={icon.value} value={icon.value}>
                        {icon.name}
                     </option>
                  ))}
               </datalist>
            </div>

            <div className="space-y-2">
               <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700">
                  Açıklama
               </label>
               <textarea
                  id="description"
                  name="description"
                  rows={4}
                  className="block w-full px-3 py-2 !bg-transparent border border-tertiary shadow shadow-tertiary rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm"
                  placeholder="Sunduğunuz hizmeti ayrıntılı olarak açıklayın."
                  defaultValue={serviceData.description || ""}
               />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
               <div className="space-y-2">
                  <label
                     htmlFor="currency"
                     className="block text-sm font-medium text-gray-700">
                     Fiyat Para Birimi
                  </label>
                  <select
                     id="currency"
                     name="currency"
                     defaultValue={serviceData.currency || "TRY"}
                     className="block w-full h-10 px-3 !bg-transparent border border-tertiary shadow shadow-tertiary rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm">
                     <option value="TRY">TRY - Türk Lirası</option>
                     <option value="USD">USD - ABD Doları</option>
                     <option value="EUR">EUR - Euro</option>
                     <option value="GBP">GBP - İngiliz Sterlini</option>
                     <option value="JPY">JPY - Japon Yeni</option>
                  </select>
               </div>

               <div className="space-y-2">
                  <label
                     htmlFor="price"
                     className="block text-sm font-medium text-gray-700">
                     Fiyat
                  </label>
                  <input
                     type="text"
                     name="price"
                     id="price"
                     className="block w-full h-10 px-3 !bg-transparent border border-tertiary shadow shadow-tertiary rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm"
                     placeholder="100 veya 100-200"
                     defaultValue={serviceData.price?.value || ""}
                  />
               </div>
            </div>

            <div className="pt-5">
               <div className="flex justify-end">
                  <button
                     type="button"
                     className="rounded-2xl border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                     İptal
                  </button>
                  <PrimaryBtn type="submit" className="ml-3">
                     Kaydet
                  </PrimaryBtn>
               </div>
            </div>
         </form>
      </div>
   );
}
