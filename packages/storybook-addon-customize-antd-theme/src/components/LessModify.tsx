/* eslint-disable import/no-webpack-loader-syntax */
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { addons } from '@storybook/addons';
import less from '!!file-loader?modules!../assets/js/less.min.js';
import theme from '!!file-loader?modules!../assets/less/custom.less';
import {
  EVENT_CHANGE_LESS,
  EVENT_RESET_LESS,
  EVENT_EXPORT_LESS,
  TRIGGER_EXPORT_LESS,
  EVENT_EXPORT_JS,
  TRIGGER_EXPORT_JS,
} from '../constants';

const modifies = {};

export default function LessModify() {
  useEffect(() => {
    const bus = addons.getChannel();
    bus.on(EVENT_CHANGE_LESS, (args) => {
      const vars: { [key: string]: any } = {};
      for (const [key, value] of Object.entries(args)) {
        vars[`@${key}`] = value;
      }
      Object.assign(modifies, vars);
      // console.log('modifies', modifies);
      window.less.modifyVars(modifies);
    });

    bus.on(EVENT_RESET_LESS, (args) => {
      const vars: { [key: string]: any } = {};
      const allKeys = Object.keys(modifies);
      for (const [key, value] of Object.entries(args)) {
        if (allKeys.includes(`@${key}`)) {
          vars[`@${key}`] = value;
        }
      }
      Object.assign(modifies, vars);
      window.less.modifyVars(modifies);
    });

    bus.on(TRIGGER_EXPORT_JS, () => {
      const prefix = /^@/;
      bus.emit(
        EVENT_EXPORT_JS,
        Object.fromEntries(Object.entries(modifies).map(([key, val]) => [key.replace(prefix, ''), val]))
      );
    });

    bus.on(TRIGGER_EXPORT_LESS, () => {
      bus.emit(EVENT_EXPORT_LESS, modifies);
    });
  }, []);

  console.log('modifies', modifies);

  return (
    <Helmet>
      <script type="text/javascript">{`
          less = {
            env: "development",
            async: false,
            fileAsync: false,
            poll: 1000,
            javascriptEnabled: true,
            modifyVars: ${JSON.stringify(modifies)}
          };
        `}</script>
      <script src={less} type="text/javascript" />
      <link rel="stylesheet/less" type="text/css" href={theme} />
    </Helmet>
  );
}
