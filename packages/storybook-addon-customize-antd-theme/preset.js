const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');

// Addon entry point
function config(entry = []) {
  return [...entry, require.resolve('./dist/esm/preset/preview')];
}

function managerEntries(entry = []) {
  return [...entry, require.resolve('./dist/esm/preset/manager')];
}

module.exports = {
  managerEntries,
  config,
  webpackFinal: (config) => {
    // console.log('from antd', path.resolve(require.resolve('antd'), '../'));
    config.plugins.push(
      new CopyPlugin({
        patterns: [
          {
            from: path.resolve(require.resolve('antd'), '../'),
            to: path.resolve(process.env.PWD, './node_modules/.cache/storybook/public/antd/lib/'),
          },
        ],
      })
    );
    return config;
  },
};
