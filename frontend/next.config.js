/** @type {import('next').NextConfig} */

const withTM = require("next-transpile-modules")(["@huddle01/huddle01-client"]);

module.exports = withTM({
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['gateway.pinata.cloud', 'ipfs.io'],
  },
});