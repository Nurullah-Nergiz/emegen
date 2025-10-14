export default function RootLayout({ children }) {
   return <>{children}</>;
}

export const metadata = {
   title: "Giriş Yap",
   description:
      "Emegen kullanıcı girişi: Hesabınıza güvenle erişin, işlemlerinizi kolayca yönetin.",
   keywords:
      "Emegen giriş, kullanıcı girişi, üye girişi, hesap girişi, giriş yap",
   alternates: {
      canonical: "https://emegen.com.tr/auth/login",   
   },
};
