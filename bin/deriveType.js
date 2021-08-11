#!/usr/bin/env node
const fs = require('fs')
const path = require('path')
const less = require('less')
const VariablesOutput = require('less-plugin-variables-output')
const stripComments = require('strip-json-comments')

const lessPath = require.resolve('antd/lib/style/themes/default.less')
const variablePath = path.resolve(__dirname, '../lib/theme/variable.json')
const jsonPath = path.resolve(__dirname, '../lib/theme/antd.json')
const antdPath = path.resolve(__dirname, '../lib/theme/antd.less')

const antdLess = fs.readFileSync(lessPath, 'utf8')

function copyFile (src, dist) {
  fs.writeFileSync(dist, fs.readFileSync(src))
}

copyFile(lessPath, antdPath)

// 读取变量值
less.render(antdLess, {
  filename: lessPath,
  javascriptEnabled: true,
  plugins: [
    new VariablesOutput({
      filename: variablePath
    })
  ]
}).then(() => {
  writeJson(antdLess, jsonPath)
})

// 过滤取得主题less中的变量
function writeJson (sheet, dist) {
  const lessVars = {}
  const varRgx = /^[@$]/
  const matches = stripComments(sheet).match(/[@$](.*:[^;]*)/g) || []

  const transformKey = key => key.replace(varRgx, '')

  const str = fs.readFileSync(variablePath, 'utf8')
  const obj = JSON.parse(str)

  matches.forEach(variable => {
    const definition = variable.split(/:\s*/)
    const key = transformKey(definition[0].replace(/['"]+/g, '').trim())
    lessVars[key] = obj[key]
  })

  fs.writeFileSync(dist, JSON.stringify(lessVars, null, 2))
}
