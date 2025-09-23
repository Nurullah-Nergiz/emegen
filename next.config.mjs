/** @type {import('next').NextConfig} */
const nextConfig = {
   images: {
      domains: ["picsum.photos"],
      remotePatterns: [
         {
            protocol: "http",
            hostname: "cdn.emegen.com.tr",
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
