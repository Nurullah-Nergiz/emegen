const Footer = () => {
   return (
      <footer className="main mt-4 flex flex-col gap-2 text-xs">
         <div className="">
            <a
               href="/privacy-policy"
               className="text-white hover:text-gray-400 mx-2">
               Gizlilik Politikası
            </a>
            <a
               href="/terms-of-service"
               className="text-white hover:text-gray-400 mx-2">
               Kullanım Şartları
            </a>
            <a href="/contact" className="text-white hover:text-gray-400 mx-2">
               İletişim
            </a>
         </div>
         <div className="flex items-center gap-2">
            <a
               href="https://facebook.com"
               target="_blank"
               rel="noopener noreferrer"
               aria-label="Facebook"
               className="text-white hover:text-gray-400">
               <i className="bx bxl-facebook text-xs"></i>
            </a>
            <a
               href="https://www.youtube.com/@EmegenGroup"
               target="_blank"
               rel="noopener noreferrer"
               aria-label="YouTube"
               className="text-white hover:text-gray-400">
               <i className="bx bxl-youtube text-xs"></i>
            </a>
            <a
               href="https://x.com/EmegenGroup"
               target="_blank"
               rel="noopener noreferrer"
               aria-label="Twitter"
               className="text-white hover:text-gray-400">
               <i className="bx bxl-twitter text-xs"></i>
            </a>
            <a
               href="https://instagram.com/emegengroup/"
               target="_blank"
               rel="noopener noreferrer"
               aria-label="Instagram"
               className="text-white hover:text-gray-400">
               <i className="bx bxl-instagram text-xs"></i>
            </a>
            <a
               href="https://www.linkedin.com/company/emegen/"
               target="_blank"
               rel="noopener noreferrer"
               aria-label="LinkedIn"
               className="text-white hover:text-gray-400">
               <i className="bx bxl-linkedin text-xs"></i>
            </a>
            <a
               href="https://github.com/emegenGroup"
               target="_blank"
               rel="noopener noreferrer"
               aria-label="GitHub"
               className="text-white hover:text-gray-400">
               <i className="bx bxl-github text-xs"></i>
            </a>
         </div>
         <p className="text-sm ">
            © {new Date().getFullYear()} Şirketiniz. Tüm hakları saklıdır.
         </p>
      </footer>
   );
};

export default Footer;
