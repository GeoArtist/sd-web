import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  webpack: (config) => {
    config.cache = false;
    return config;
  },
};

export default nextConfig;
