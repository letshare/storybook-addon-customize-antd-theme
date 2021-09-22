/* eslint-disable import/no-webpack-loader-syntax */
import React from 'react';
import LessModify from './LessModify';
import Components from './Components';

export default function AntdBoard() {
  return (
    <div>
      <LessModify />
      <Components filter="" />
    </div>
  );
}
