import themeLess from '!!raw-loader!../src/theme/theme.less';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  customizeAntdTheme: {
    // modifyVars: require('../src/theme/antd-theme'),
    modifyVars: themeLess,
  },
};
