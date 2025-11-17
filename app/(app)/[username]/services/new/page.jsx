"use client";
import { PrimaryBtn } from "@/components/btn";
import { createUserService } from "@/services/services";

export default function NewPage({ children }) {
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

      createUserService({
         title: e.target.title.value,
         icon: {
            type: "boxicons",
            url: e.target.icon.value,
         },
         description: e.target.description.value,
         price: pricePayload,
         currency: e.target.currency.value,
      })
         .then((response) => {
            console.log("Hizmet oluşturuldu:", response.data);
         })
         .catch((error) => {
            console.error("Hizmet oluşturulamadı:", error);
         });
   };

   const iconList = [
      { name: "Code", value: "bx-code-alt" },
      { name: "Brush", value: "bx-brush" },
      { name: "Camera", value: "bx-camera" },
      { name: "Video", value: "bx-video" },
      { name: "Microphone", value: "bx-microphone" },
      { name: "Music", value: "bx-music" },
      { name: "Briefcase", value: "bx-briefcase-alt-2" },
      { name: "Store", value: "bx-store" },
      { name: "Wrench", value: "bx-wrench" },
      { name: "Chart", value: "bx-bar-chart-alt-2" },
      { name: "Globe", value: "bx-globe" },
      { name: "Server", value: "bx-server" },
      { name: "Database", value: "bx-data" },
      { name: "Cloud", value: "bx-cloud" },
      { name: "Bolt", value: "bx-bolt-circle" },
      { name: "Sun", value: "bx-sun" },
      { name: "Moon", value: "bx-moon" },
      { name: "Pen", value: "bx-pen" },
      { name: "Edit", value: "bx-edit" },
      { name: "Mobile", value: "bx-mobile-alt" },
      { name: "Laptop", value: "bx-laptop" },
      { name: "Palette", value: "bx-palette" },
      { name: "Dollar", value: "bx-dollar-circle" },
      { name: "Rocket", value: "bx-rocket" },
      { name: "Shield", value: "bx-shield" },
      { name: "Heart", value: "bx-heart" },
      { name: "Star", value: "bx-star" },
      { name: "Cog", value: "bx-cog" },
      { name: "Book", value: "bx-book" },
      { name: "Gift", value: "bx-gift" },
      { name: "Trophy", value: "bx-trophy" },
      { name: "Bulb", value: "bx-bulb" },
      { name: "Cube", value: "bx-cube" },
      { name: "Diamond", value: "bx-diamond" },
      { name: "Fingerprint", value: "bx-fingerprint" },
      { name: "Flag", value: "bx-flag" },
      { name: "Headphone", value: "bx-headphone" },
      { name: "Image", value: "bx-image" },
      { name: "Key", value: "bx-key" },
      { name: "Link", value: "bx-link" },
      { name: "Lock", value: "bx-lock-alt" },
      { name: "Map", value: "bx-map" },
      { name: "Message", value: "bx-message-rounded-dots" },
      { name: "Paperclip", value: "bx-paperclip" },
      { name: "ShoppingBag", value: "bx-shopping-bag" },
      { name: "Tag", value: "bx-tag" },
      { name: "User", value: "bx-user" },
      { name: "Wallet", value: "bx-wallet" },
      { name: "World", value: "bx-world" },
      { name: "ZoomIn", value: "bx-zoom-in" },
      { name: "ZoomOut", value: "bx-zoom-out" },
      { name: "Spa", value: "bx-spa" },
   ];

   return (
      <div className="container mx-auto py-10">
         <h1 className="text-3xl font-bold mb-6">Yeni Bir Hizmet Oluştur</h1>
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
                     defaultValue="TRY"
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
                     Hizmeti Oluştur
                  </PrimaryBtn>
               </div>
            </div>
         </form>
      </div>
   );
}
