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

  async redirects() {
    return [
      // Old client-side pagination (/blog?page=N) -> prerendered pages; must precede the rule below
      {
        source: "/blog",
        has: [{ type: "query", key: "page", value: "(?<page>[1-9][0-9]*)" }],
        destination: "/blog/strona/:page",
        permanent: true,
      },
      // The list itself lives at /blog/strona/<n>; temporary, so /blog stays free for a future landing page
      { source: "/blog", destination: "/blog/strona/1", permanent: false },
    ];
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
