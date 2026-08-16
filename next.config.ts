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
  async redirects() {
    return [
      { source: '/product', destination: '/platform', permanent: true },
      // the vertical pages shipped briefly under /services
      { source: '/services/:vertical', destination: '/solutions/:vertical', permanent: true },
    ];
  },
};

export default nextConfig;
