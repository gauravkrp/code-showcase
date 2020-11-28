// next.config.js
require('dotenv').config();

const withPWA = require('next-pwa');

const withFonts = require('nextjs-fonts');
const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/
});

const prod = process.env.NODE_ENV === 'production';
const isDev = process.env.NODE_ENV !== 'production';
const version = require('./package.json').version;

module.exports = withPWA(withFonts(withMDX({
  assetPrefix: isDev ? '' : `https://${process.env.AWS_S3_REGION}.amazonaws.com/${process.env.AWS_S3_BUCKET_NAME}/${version}`,
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  trailingSlash: true,
  //reactStrictMode: true,
  pwa: {
    dest: 'public',
    disable: isDev, //process.env.NODE_ENV === 'development',
  },
  env: {
    // Reference a variable that was defined in the .env file and make it available at Build Time
    API_BASE_URL: '#',
    SENTRY_DSN: isDev ? null : '#',
  },
  webpack(config, { isServer }) {
    config.module.rules.push({
      test: /\.svg$/,
      issuer: {
        test: /\.(js|ts)x?$/,
      },
      use: ['@svgr/webpack'],
    });
    if (isServer) {
      require('./src/lib/genSiteMapXML'); // dynamically generate sitemap on build
    }
    return config;
  }
})));