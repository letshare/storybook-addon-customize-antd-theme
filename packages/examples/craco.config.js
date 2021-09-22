const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: require('./src/theme/antd-theme'),
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
