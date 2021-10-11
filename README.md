<div align="center">

[![npm version](https://badge.fury.io/js/storybook-addon-customize-antd-theme.svg)](https://badge.fury.io/js/storybook-addon-customize-antd-theme)
[![GitHub license](https://img.shields.io/github/license/letshare/storybook-addon-customize-antd-theme.svg)](https://github.com/letshare/storybook-addon-customize-antd-theme/blob/master/LICENSE)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

</div>

<hr/>

## storybook-addon-customize-antd-theme

A [Storybook](https://github.com/storybooks/storybook) addon that help you visually customize an ant design theme in the addon panel for better UI-development workflow.

- [Docs & Demo](https://letshare.github.io/storybook-addon-customize-antd-theme)

## Requirements

- Storybook@>=6.0.0

## Getting started

### 1. Install

```sh
npm install -D storybook-addon-customize-antd-theme
# yarn add -D storybook-addon-customize-antd-theme
```

### 2. Register the addon in `main.js`

```js
module.exports = {
  stories: ['storybook-addon-customize-antd-theme/dist/esm/stories/index.js'],
  addons: ['storybook-addon-customize-antd-theme'],
};
```

### 3. Setting default story states

You can initial setup ant design theme, by setting the `customizeAntdTheme` property on `parameters`:

```js
// .storybook/preview.js

export const parameters = {
  customizeAntdTheme: {
    modifyVars: {
      'primary-color': '#ff1771',
      'border-radius-base': '20px',
    },
  },
};
```

`modifyVars` can also be less string, you can import a less file by `raw-loader`, for example:

```js
// .storybook/preview.js
import themeLess from '!!raw-loader!../src/theme/theme.less';
export const parameters = {
  customizeAntdTheme: {
    modifyVars: themeLess,
  },
};
```
