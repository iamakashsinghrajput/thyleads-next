import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: [
    'mongodb', 'axios', 'bcryptjs',
    '@sparticuz/chromium', 'puppeteer-core', 'puppeteer', 'puppeteer-extra', 'puppeteer-extra-plugin-stealth',
  ],

  /**
   * /platform and /product described the same thing, so the pair was collapsed
   * onto /platform. The old route is kept as a permanent redirect rather than
   * deleted outright, because it is linked from elsewhere on the web.
   */
  async rewrites() {
    return {
      beforeFiles: [
        { source: '/dashboard', destination: 'https://origin.portal-thyleads.com/dashboard' },
        { source: '/dashboard/:path*', destination: 'https://origin.portal-thyleads.com/dashboard/:path*' },
      ],
      afterFiles: [],
      fallback: [],
    };
  },

  async redirects() {
    return [
      // /platform is hidden (app/_platform). Temporary, so it can come back.
      { source: '/platform', destination: '/', permanent: false },
      { source: '/product', destination: '/', permanent: false },
      // /outreach-and-engagement is hidden (app/_outreach-and-engagement). Temporary, so it can come back.
      { source: '/outreach-and-engagement', destination: '/', permanent: false },
      // the vertical pages shipped briefly under /services
      { source: '/services/:vertical', destination: '/solutions/:vertical', permanent: true },
    ];
  },
};

export default nextConfig;
