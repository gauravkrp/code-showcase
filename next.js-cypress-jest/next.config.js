// next.config.js
// require('dotenv').config();

const isDev = process.env.NODE_ENV !== 'production';
// const version = require('./package.json').version;

module.exports = {
  trailingSlash: true,
  env: {
    SITE_BASE_URL: process.env.NEXT_PUBLIC_SITE_BASE_URL,
  },
  images: {
    domains: ['assets.cdn.com'],
  },
  generateBuildId: async () => {
    // We can, for example, get the latest git commit hash here
    return 'web-gauravkrp';
  },
  webpack(config, { isServer }) {
    // config.module.rules.push({
    //   test: /\.svg$/,
    //   issuer: /\.(js|ts)x?$/,
    //   use: ['@svgr/webpack'],
    // });
    if (isServer) {
      // require('./src/lib/genSiteMapXML');
    }
    return config;
  },
};
