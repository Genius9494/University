import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "media.rawg.io",  // تحديد نطاق موثوق به
        pathname: "/**", // يسمح بالتحميل من جميع المسارات
      },
      {
        protocol: "https",
        hostname: "example.com",  // إضافة نطاقات أخرى حسب الحاجة
        pathname: "/**",
      },
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  unoptimized: true,
};
module.exports = {
  env: {
    MONGO_URI: process.env.MONGO_URI,
  },
};


export default nextConfig;

