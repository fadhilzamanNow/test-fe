import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images : {
    remotePatterns : [
      {
        protocol : "https",
        hostname : "s3.sellerpintar.com",
        port : '',
        pathname : "/articles/**"
      }
    ]
  }
};

export default nextConfig;
