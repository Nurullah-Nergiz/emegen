/** @type {import('next').NextConfig} */
const nextConfig = {
   swcMinify: false,
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
};

export default nextConfig;
