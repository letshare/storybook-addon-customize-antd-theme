/* eslint-disable import/no-webpack-loader-syntax */
import React, { useEffect } from 'react'
import { Button } from 'antd'
import { Helmet } from 'react-helmet'
import { addons } from '@storybook/addons'
// import * as jsondiffpatch from 'jsondiffpatch'
import less from '!!file-loader?modules!../assets/js/less.min.js'
import theme from '!!file-loader?modules!../assets/less/custom.less'
import { EVENT_CHANGE_LESS, EVENT_EXPORT_LESS, TRIGGER_EXPORT_LESS } from '../constants'

export default function Theme ({ title } : {title:string}) {
  useEffect(() => {
    const bus = addons.getChannel()
    const modifies = {}
    bus.on(EVENT_CHANGE_LESS, (args) => {
      const vars: {[key:string]: any} = {}
      for (const [key, value] of Object.entries(args[0])) {
        vars[`@${key}`] = value
      }
      Object.assign(modifies, vars)
      window.less.modifyVars(modifies)
    })

    bus.on(TRIGGER_EXPORT_LESS, () => {
      bus.emit(EVENT_EXPORT_LESS, modifies)
    })
  }, [])

  return (
    <div>
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
        <link rel="stylesheet/less" type="text/css" href={theme} />
      </Helmet>
      <Button type="primary">Primary Button</Button>
      <Button>Default Button</Button>
      <Button type="dashed">Dashed Button</Button>
    </div>
  )
}
