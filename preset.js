const CopyPlugin = require('copy-webpack-plugin')
const path = require('path')

// Addon entry point
function config (entry = []) {
  return [...entry, require.resolve('./dist/esm/preset/preview')]
}

function managerEntries (entry = []) {
  return [...entry, require.resolve('./dist/esm/preset/manager')]
}

module.exports = {
  managerEntries,
  config,
  webpackFinal: (config) => {
    config.plugins.push(new CopyPlugin({
      patterns: [
        { from: path.resolve(process.env.PWD, './node_modules/antd/lib/'), to: path.resolve(process.env.PWD, './node_modules/.cache/storybook/public/antd/lib/') }
      ]
    }))
    // console.log(process.env)
    return config
  }
}
