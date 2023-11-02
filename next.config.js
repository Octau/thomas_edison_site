// const { withSentryConfig } = require('@sentry/nextjs');
const { createVanillaExtractPlugin } = require('@vanilla-extract/next-plugin');
const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');
const withTranslation = require('next-translate-plugin');
// const withNextCircularDeps = require('next-circular-dependency');

const { defaultLocale, locales } = require('./i18n');

const withVanillaExtract = createVanillaExtractPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  i18n: { locales, defaultLocale },
  experimental: {
    appDir: false,
  },
  basePath: '/admin',
  modularizeImports: {
    '@phosphor-icons/react': {
      transform: '@phosphor-icons/react/{{member}}',
    },
  },
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
module.exports = async (phase, { defaultConfig }) => {
  const isDev = phase === PHASE_DEVELOPMENT_SERVER;
  const plugins = [withTranslation, withVanillaExtract];
  if (!isDev) {
    // plugins.push(withSentryConfig);
  }
  return plugins.reduce((acc, plugin) => plugin(acc), { ...nextConfig });
};
