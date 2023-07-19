/** @type {import('next').NextConfig} */
const nextConfig = {}

// next.config.js
module.exports = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'sk'],
  },
  images: {
    domains: ['localhost'],
  },
};
