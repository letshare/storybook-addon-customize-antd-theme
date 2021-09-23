/* eslint-disable import/no-webpack-loader-syntax */
import React, { useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet';
import { addons } from '@storybook/addons';
import lessScript from '!!file-loader?modules!../assets/js/less.min.js';
import antdLess from '!!file-loader?modules!../assets/less/antd.less';
import {
  EVENT_CHANGE_LESS,
  EVENT_RESET_LESS,
  EVENT_EXPORT_LESS,
  TRIGGER_EXPORT_LESS,
  EVENT_EXPORT_JS,
  TRIGGER_EXPORT_JS,
  EVENT_LESS_LOADED,
} from '../constants';

const modifies = {};
let scriptLoaded = false;

interface LessModifyProps {
  active: boolean;
}

export default function LessModify({ active }: LessModifyProps) {
  const activeRef = useRef(active);
  if (activeRef.current !== active) {
    activeRef.current = active;
  }
  useEffect(() => {
    const sheetId = `less:${antdLess.replace(/\.less$/, '')}`;
    if (!active) {
      const dom = document.getElementById(sheetId);
      dom && dom.remove();
    } else if (scriptLoaded) {
      window.less.modifyVars(modifies);
    }
  }, [active]);

  useEffect(() => {
    const bus = addons.getChannel();
    bus.on(EVENT_CHANGE_LESS, (args) => {
      const vars: { [key: string]: any } = {};
      for (const [key, value] of Object.entries(args)) {
        vars[`@${key}`] = value;
      }
      Object.assign(modifies, vars);
      activeRef.current && window.less.modifyVars(modifies);
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
      activeRef.current && window.less.modifyVars(modifies);
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

    window.onLessScriptLoaded = function () {
      setTimeout(() => {
        bus.emit(EVENT_LESS_LOADED);
      }, 5000);
    };

    scriptLoaded = true;
  }, []);

  // console.log('LessModify', modifies, antdLess);

  // 实现less自动挂载和检测是否挂载，及手动挂载

  if (scriptLoaded) return null;
  return (
    <Helmet>
      <script type="text/javascript">{`
          less = {
            env: "development",
            async: false,
            fileAsync: false,
            poll: 1000,
            javascriptEnabled: true,
            modifyVars: ${JSON.stringify(modifies)},
          };
        `}</script>
      <script src={lessScript} type="text/javascript" />
      <link rel="stylesheet/less" type="text/css" href={antdLess} />
      <script type="text/javascript">{`
          onLessScriptLoaded();
        `}</script>
    </Helmet>
  );
}
