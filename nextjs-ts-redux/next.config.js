// next.config.js
require('dotenv').config();

const withPlugins = require('next-compose-plugins');
const withPWA = require('next-pwa');
const { withSentryConfig } = require('@sentry/nextjs');

const isDev = process.env.NODE_ENV !== 'production';
// const version = require('./package.json').version;

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: false, //process.env.ANALYZE === 'true',
});

const DuplicatePackageCheckerPlugin = require('duplicate-package-checker-webpack-plugin');
const checkDuplicatePlugin = false;

const sentryWebpackPluginOptions = {
  // Additional config options for the Sentry Webpack plugin. Keep in mind that
  // the following options are set automatically, and overriding them is not
  // recommended:
  //   release, url, org, project, authToken, configFile, stripPrefix,
  //   urlPrefix, include, ignore

  silent: true, // Suppresses all logs
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options.
};

// @ts-check
/**
 * @type {import('next').NextConfig}
 **/
const moduleExports = withPlugins(
  [withBundleAnalyzer, withPWA], //withMDX
  {
    pageExtensions: ['js', 'jsx', 'ts', 'tsx'],
    reactStrictMode: true,
    pwa: {
      dest: 'public',
      disable: true, // isDev, //process.env.NODE_ENV === 'development',
    },
    env: {
      // Reference a variable that was defined in the .env file and make it available at Build Time
      API_BASE_URL: process.env.API_BASE_URL,
    },
    images: {
      domains: [
      ],
    },
    generateBuildId: async () => {
      // You can, for example, get the latest git commit hash here
      return 'admin-gkp-22';
    },
    webpack(config, { buildId, dev, isServer, defaultLoaders, webpack }) {
      config.module.rules.push({
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      });
      if (dev) {
        if (checkDuplicatePlugin) {
          config.plugins.push(new DuplicatePackageCheckerPlugin());
        }
      }
      return config;
    },
  },
);

// Make sure adding Sentry options is the last code to run before exporting, to
// ensure that your source maps include changes from all other Webpack plugins
module.exports = withSentryConfig(moduleExports, sentryWebpackPluginOptions);
