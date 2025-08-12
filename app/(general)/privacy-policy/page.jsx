export default function PrivacyPolicyPage({ children }) {
   return (
      <main>
         <h1>Gizlilik Politikası</h1>
         <p>
            Bu gizlilik politikası, 6698 sayılı Kişisel Verilerin Korunması
            Kanunu (“KVKK”) ve ilgili mevzuat kapsamında hazırlanmıştır.
            emegen.com.tr, kullanıcıların kişisel verilerinin gizliliğine ve
            güvenliğine önem verir. Ayrıca, sitemizde üçüncü taraf reklam
            hizmetleri kullanılabilir. Bu reklam sağlayıcıları, kullanıcıların
            ilgi alanlarına yönelik reklamlar gösterebilmek için çerezler ve
            benzeri teknolojiler kullanabilir. Kişisel verileriniz, KVKK
            kapsamında yalnızca açık rızanız doğrultusunda veya kanunda
            öngörülen diğer hallerde işlenir ve korunur.
         </p>
         <p>
            emegen.com.tr olarak, ziyaretçilerimizin gizliliğini önemsiyoruz. Bu
            gizlilik politikası, hangi kişisel verilerin toplandığı, nasıl
            kullanıldığı ve korunduğu hakkında bilgi vermektedir.
         </p>
         <h2>Toplanan Bilgiler</h2>
         <ul>
            <li>
               Web sitemizi ziyaret ettiğinizde IP adresiniz, tarayıcı
               bilgileriniz ve ziyaret süreniz gibi teknik veriler otomatik
               olarak toplanabilir.
            </li>
            <li>
               İletişim formları veya kayıt işlemleri sırasında adınız, e-posta
               adresiniz gibi kişisel bilgiler talep edilebilir.
            </li>
         </ul>
         <h2>Bilgilerin Kullanımı</h2>
         <ul>
            <li>Hizmetlerimizi sunmak ve geliştirmek</li>
            <li>Kullanıcı desteği sağlamak</li>
            <li>Yasal yükümlülükleri yerine getirmek</li>
         </ul>
         <h2>Çerezler (Cookies)</h2>
         <p>
            Web sitemiz, kullanıcı deneyimini geliştirmek için çerezler
            kullanabilir. Tarayıcı ayarlarınızdan çerezleri reddedebilirsiniz.
         </p>
         <h2>Bilgi Paylaşımı</h2>
         <p>
            Kişisel verileriniz, yasal zorunluluklar dışında üçüncü kişilerle
            paylaşılmaz.
         </p>
         <h2>Haklarınız</h2>
         <p>
            Kişisel verilerinizle ilgili bilgi talep etme, düzeltme veya silme
            hakkına sahipsiniz. Bunun için bizimle iletişime geçebilirsiniz.
         </p>
         <h2>İletişim</h2>
         <p>
            Gizlilik politikamızla ilgili sorularınız için info@emegen.com.tr
            adresinden bize ulaşabilirsiniz.
         </p>
         {children}
      </main>
   );
}
