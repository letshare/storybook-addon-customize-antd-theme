declare module 'global';
declare module 'react-helmet';
// eslint-disable-next-line no-unused-vars
interface Window {
  less: any;
}
declare module 'trie-search';

declare module '!!file-loader*' {
  const path: string;
  export default path;
}
