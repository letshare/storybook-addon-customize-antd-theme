/* eslint-disable import/no-webpack-loader-syntax */
import React from 'react'
import { Button } from 'antd'
import { Helmet } from 'react-helmet'
import { addons } from '@storybook/addons'
import * as jsondiffpatch from 'jsondiffpatch'
import less from '!!file-loader?modules!../lib/less/less.min.js'
import theme from '!!file-loader?modules!../lib/theme/theme.less'
import { EVENT_CHANGE_LESS, EVENT_EXPORT_LESS, TRIGGER_EXPORT_LESS } from '../constants'

let preVars:{}
const modifies = {} // TODO 更新

export default function Theme ({ title } : {title:string}) {
  const bus = addons.getChannel()

  bus.on(EVENT_CHANGE_LESS, (args) => {
    const vars: {[key:string]: any} = {}
    for (const [key, value] of Object.entries(args[0])) {
      vars[`@${key}`] = value
    }
    // 性能优化防止重复调用 less比较慢
    if (!preVars || jsondiffpatch.diff(preVars, vars)) {
      window.less.modifyVars(vars)
      preVars = vars
      Object.assign(modifies, preVars)
    }
  })

  bus.on(TRIGGER_EXPORT_LESS, () => {
    bus.emit(EVENT_EXPORT_LESS, modifies)
  })

  return (
    <div>
      Antd组件
      <Helmet>
        <script type="text/javascript">{`
          less = {
            env: "development",
            async: false,
            fileAsync: false,
            poll: 1000,
            javascriptEnabled: true
          };
        `}</script>
        <script src={less} type="text/javascript" />
      </Helmet>
      <Button type="primary">Primary Button</Button>
      <Button>Default Button</Button>
      <Button type="dashed">Dashed Button</Button>
      <link rel="stylesheet/less" type="text/css" href={theme} />
    </div>
  )
}
