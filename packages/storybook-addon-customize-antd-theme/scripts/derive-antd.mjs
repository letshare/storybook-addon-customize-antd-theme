#!/usr/bin/env zx
const path = require('path');
const less = require('less');
const VariablesOutput = require('less-plugin-variables-output');
const stripComments = require('strip-json-comments');
const prettier = require('prettier');

const lessPath = require.resolve('antd/lib/style/themes/default.less');
const variablePath = path.resolve(__dirname, '../src/lib/antd-helper/variable.json'); // 全部变量值
const jsonPath = path.resolve(__dirname, '../src/lib/antd-helper/antdLessValue.ts'); // 主题定制值
const antdPath = path.resolve(__dirname, '../src/lib/antd-helper/antd.less'); // copy过来便于查看
const descPath = path.resolve(__dirname, '../src/lib/antd-helper/lessValueDesc.ts'); //

const antdLess = await fs.readFile(lessPath, 'utf8');

async function copyFile(src, dist) {
  await fs.writeFile(dist, await fs.readFile(src));
}
// 过滤取得主题less中的变量
async function writeJson(sheet, variablePath, dist) {
  const lessVars = {};
  const varReg = /^[@$]/;
  const matches = stripComments(sheet).match(/[@$](.*:[^;]*)/g) || [];

  const transformKey = (key) => key.replace(varReg, '');

  const str = await fs.readFile(variablePath, 'utf8');
  const obj = JSON.parse(str);

  matches.forEach((variable) => {
    const definition = variable.split(/:\s*/);
    const key = transformKey(definition[0].replace(/['"]+/g, '').trim());
    lessVars[key] = obj[key];
  });

  await fs.writeFile(
    dist,
    prettier.format(`export default ${JSON.stringify(lessVars, null, 2)}`, {
      semi: false,
      singleQuote: true,
      parser: 'babel',
    })
  );
}

async function writeDesc(src, dist) {
  const desc = {};
  const descReg = /[@$](.*:[^;]*);[^/\r\n]*\/\/\s*(.*)/g;

  const str = await fs.readFile(src, 'utf8');

  const matches = [...str.matchAll(descReg)];

  matches.forEach((line) => {
    const definition = line[1].split(/:\s*/);
    const key = definition[0].replace(/['"]+/g, '').trim();
    desc[key] = line[2];
  });

  await fs.writeFile(
    dist,
    prettier.format(`export default ${JSON.stringify(desc, null, 2)}`, {
      semi: false,
      singleQuote: true,
      parser: 'babel',
    })
  );
}

await copyFile(lessPath, antdPath);

// 读取变量值
less
  .render(antdLess, {
    filename: lessPath,
    javascriptEnabled: true,
    plugins: [
      new VariablesOutput({
        filename: variablePath,
      }),
    ],
  })
  .then(async () => {
    await writeJson(antdLess, variablePath, jsonPath);
    await writeDesc(antdPath, descPath);
  });
