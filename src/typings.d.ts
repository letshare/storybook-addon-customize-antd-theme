declare module 'global';
declare module 'react-helmet';
declare module '!!file-loader?modules!../lib/less/less.min.js';
declare module '!!file-loader?modules!../lib/theme/theme.less';
// eslint-disable-next-line no-unused-vars
interface Window {
  less: any;
}
