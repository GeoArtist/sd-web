import type { NextConfig } from "next";

const cspHeader = `
              default-src 'self';
              script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com https://www.googlesyndication.com;
              style-src 'self' 'unsafe-inline';
              img-src 'self' blob: data: *.tile.openstreetmap.org https://www.google-analytics.com https://www.googletagmanager.com https://www.google.pl https://www.google.com https://www.googlesyndication.com https://www.gstatic.com https://stats.g.doubleclick.net;
              font-src 'self';
              connect-src 'self' https://www.google-analytics.com https://region1.analytics.google.com https://www.googletagmanager.com https://analytics.google.com https://stats.g.doubleclick.net;
              object-src 'none';
              base-uri 'self';
              form-action 'self';
              frame-ancestors 'none';
              upgrade-insecure-requests;
            `.replace(/\s{2,}/g, " "); // remove newlines and extra spaces




const nextConfig: NextConfig = {
  reactStrictMode: false,
  webpack: (config) => {
    config.cache = false;
    return config;
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: cspHeader.replace(/\n/g, ""),
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
