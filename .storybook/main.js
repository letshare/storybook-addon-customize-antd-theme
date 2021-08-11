
const CopyPlugin = require("copy-webpack-plugin")
const path = require("path")

module.exports = {
  stories: [
    "../stories/**/*.stories.mdx",
    "../stories/**/*.stories.@(js|jsx|ts|tsx)",
  ],
  addons: ["../preset.js", "@storybook/addon-essentials"],
  webpackFinal: (config) => {
    config.plugins.push(new CopyPlugin({
      patterns: [
        { from: path.resolve(__dirname,'../node_modules/antd/lib/'), to: path.resolve(__dirname,'../node_modules/.cache/storybook/public/antd/lib/') },
      ],
    }));
    return config;
  },
  refs: {
    Design: {
      title: '',
      url: 'http://localhost:6007',
    },
  },
};
