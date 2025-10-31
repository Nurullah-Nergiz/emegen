/** @type {import('next').NextConfig} */
const nextConfig = {
   images: {
      remotePatterns: [
         {
            protocol: "http",
            hostname: "cdn.emegen.com.tr",
            port: "",
            pathname: "/**",
         },
         {
            protocol: "https",
            hostname: "cdn.emegen.com.tr",
            port: "",
            pathname: "/**",
         },
         {
            protocol: "https",
            hostname: "images.unsplash.com",
            port: "",
            pathname: "/**",
         },
         {
            protocol: "https",
            hostname: "picsum.photos",
            port: "",
            pathname: "/**",
         },
      ],
   },
   // SEO default title (requires next-seo or similar library in your pages)
   // Example for next-seo:
   // nextSeo: {
   //   title: "Default Title",
   // },
};

export default nextConfig;
