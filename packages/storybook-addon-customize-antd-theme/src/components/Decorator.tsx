import React from 'react';
import LessModify from './LessModify';
import { PARAM_KEY } from '../constants';

export default function decorator(Story: any, context: any) {
  const isActive = typeof context.globals[PARAM_KEY] === 'undefined' ? true : context.globals[PARAM_KEY];
  return (
    <div>
      <LessModify active={isActive} />
      <Story />
    </div>
  );
}
