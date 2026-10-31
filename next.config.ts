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
      { source: '/product', destination: '/platform', permanent: true },
      // the vertical pages shipped briefly under /services
      { source: '/services/:vertical', destination: '/solutions/:vertical', permanent: true },
    ];
  },
};

export default nextConfig;
