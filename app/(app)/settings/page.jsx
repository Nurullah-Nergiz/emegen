import Link from "next/link";

export default function SettingsPage({}) {
   const settingsMenu = {
      Kullanıcı: [
         {
            name: "Profil Bilgileri",
            path: "/settings/profile",
            description: "Profil bilgilerinizi görüntüleyin ve düzenleyin.",
         },
         {
            name: "Hesap Bilgileri",
            path: "/settings/account",
            description: "E-posta, kullanıcı adı ve hesap detaylarını yönetin.",
         },
         {
            name: "Sosyal Hesaplar",
            path: "/settings/connections",
            description:
               "Sosyal hesaplarınızı bağlayın veya bağlantıyı kaldırın.",
         },
         {
            name: "Dil & Tema",
            path: "/settings/preferences",
            description: "Dil ve tema tercihlerinizi ayarlayın.",
         },
         {
            name: "Sosyal Bağlantılar",
            path: "/settings/social-links",
            description: "Sosyal medya bağlantılarınızı yönetin.",
         },
      ],
      Güvenlik: [
         {
            name: "Şifre & Güvenlik",
            path: "/settings/security",
            description:
               "Şifrenizi değiştirin, 2FA ve oturum ayarlarını yönetin.",
         },
         {
            name: "Gizlilik",
            path: "/settings/privacy",
            description: "Görünürlük ve veri paylaşımı tercihlerini ayarlayın.",
         },
         {
            name: "Engellenenler",
            path: "/settings/blocked",
            description:
               "Engellediğiniz kullanıcıları görüntüleyin ve yönetin.",
         },
      ],
      // Bildirimler: [
      //   {
      //     name: "Bildirim Ayarları",
      //     path: "/settings/notifications",
      //     description: "Uygulama içi bildirim tercihlerinizi düzenleyin.",
      //   },
      //   {
      //     name: "E-posta Ayarları",
      //     path: "/settings/email",
      //     description: "E-posta bildirim sıklığı ve türlerini yönetin.",
      //   },
      // ],
      // Teklif: [
      //   {
      //     name: "Teklif Ayarları",
      //     path: "/settings/tenders",
      //     description: "Tekliflerle ilgili tercihleri ve kuralları yapılandırın.",
      //   },
      //   {
      //     name: "Takım",
      //     path: "/settings/team",
      //     description: "Takım üyelerini ve izinleri yönetin.",
      //   },
      // ],
      // Geliştirici: [
      //   {
      //     name: "API Ayarları",
      //     path: "/settings/api",
      //     description: "API anahtarları ve erişim ayarlarını yönetin.",
      //   },
      //   {
      //     name: "Uygulama İzinleri",
      //     path: "/settings/permissions",
      //     description: "Üçüncü parti uygulama erişimlerini denetleyin.",
      //   },
      // ],
      Yardım: [
         {
            name: "Destek",
            path: "/settings/support",
            description: "Yardım merkezine gidin veya destek talebi oluşturun.",
         },
      ],
   };

   return (
      <main className="w-full px-4 py-6">
         <h1 className="mb-8 text-3xl font-bold tracking-tight">Ayarlar</h1>
         {/* Hesap Yönetimi */}
         <section aria-labelledby="account-management" className="mb-10">
            {Object.entries(settingsMenu).map(([sectionTitle, items]) => (
               <div key={sectionTitle} className="mb-8">
                  <h2
                     id={sectionTitle.toLowerCase().replace(" ", "-")}
                     className="mb-3 text-xl font-semibold">
                     {sectionTitle}
                  </h2>
                  <ul role="list" className="main">
                     {items.map((item) => (
                        <li key={item.path}>
                           <Link
                              href={item.path}
                              className=" flex items-start justify-between gap-6 px-4 py-4 ">
                              <div>
                                 <p className="font-medium text-main">
                                    {item.name}
                                 </p>
                                 <p className="text-sm text-accent">
                                    {item.description}
                                 </p>
                              </div>
                              <i
                                 className="bx bx-chevron-right text-xl flex-none"
                                 aria-hidden="true"
                              />
                           </Link>
                        </li>
                     ))}
                  </ul>
               </div>
            ))}
         </section>
         <section aria-labelledby="account-deletion" className="mb-10">
            <h2
               id="account-deletion"
               className="mb-3 text-xl font-semibold text-red-600">
               Hesabı Sil
            </h2>
            <ul role="list" className="main">
               <li>
                  <Link
                     href="/settings/delete-account"
                     className="group flex items-start justify-between gap-6 px-4 py-4 ">
                     <div>
                        <p className="font-medium text-red-600 ">
                           Hesabı Kalıcı Olarak Sil
                        </p>
                        <p className="text-sm text-main">
                           Hesabınızı ve tüm verilerinizi kalıcı olarak silin.
                           Bu işlem geri alınamaz.
                        </p>
                     </div>
                     <i
                        className="bx bx-chevron-right text-xl flex-none"
                        aria-hidden="true"
                     />
                  </Link>
               </li>
            </ul>
         </section>
      </main>
   );
}
