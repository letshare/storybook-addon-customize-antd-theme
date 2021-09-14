declare module 'global';
declare module 'react-helmet';
declare module '!!file-loader?modules!../assets/js/less.min.js';
declare module '!!file-loader?modules!../assets/less/custom.less';
// eslint-disable-next-line no-unused-vars
interface Window {
  less: any;
}
declare module 'trie-search';
