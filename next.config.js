const withPlugins = require('next-compose-plugins');

const plugins = [];

const config = {
  publicRuntimeConfig: {
    serverUrl: process.env.NEXT_PUBLIC_SERVER_URL,
  },
};

module.exports = withPlugins(plugins, config);
