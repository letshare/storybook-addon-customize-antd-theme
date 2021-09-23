import React, { useCallback, useState, useEffect } from 'react';
import {
  BooleanControl,
  ColorControl,
  DateControl,
  FilesControl,
  NumberControl,
  ObjectControl,
  RangeControl,
} from '@storybook/components';
import TextControl from './TextControl';
import { Args } from '../interface';
import { uniqueId } from 'lodash';
export interface ArgControlProps {
  control?: Args;
  arg?: any;
  updateArgs?: (args: Args) => void;
}

const NoControl = () => <>-</>;

export default function ArgControl({ control, arg, updateArgs }: ArgControlProps) {
  const [isFocused, setFocused] = useState(false);
  const { key, disable } = control;
  const [id, setId] = useState(() => uniqueId()); // ColorControl在arg更新的时候不会重渲染，所以这里使用了key
  // box because arg can be a fn (e.g. actions) and useState calls fn's
  const [boxedValue, setBoxedValue] = useState({ value: arg });

  useEffect(() => {
    if (!isFocused)
      setBoxedValue((old) => {
        if (old.value !== arg) {
          setId(uniqueId());
        }
        return { value: arg };
      });
  }, [isFocused, arg]);

  const onChange = useCallback(
    (argVal: any) => {
      updateArgs({ [key]: argVal });
      setBoxedValue({ value: argVal });
      return argVal;
    },
    [updateArgs, key]
  );

  const noUpdateArgChange = useCallback((argVal: any) => {
    setBoxedValue({ value: argVal });
    return argVal;
  }, []);

  const handleSave = useCallback(
    (value) => {
      updateArgs({ [key]: value });
    },
    [updateArgs, key]
  );

  const onBlur = useCallback(() => {
    setFocused(false);
  }, []);
  const onFocus = useCallback(() => setFocused(true), []);

  if (!control || disable) return <NoControl />;
  // row.name is a display name and not a suitable DOM input id or name - i might contain whitespace etc.
  // row.key is a hash key and therefore a much safer choice
  const props = { name: key, value: boxedValue.value, onChange, onBlur, onFocus } as any;
  // 实现blur或enter才updateArgs
  const textProps = {
    name: key,
    value: boxedValue.value,
    onChange: noUpdateArgChange,
    onBlur,
    onFocus,
    onSave: handleSave,
  } as any;

  // console.log('ArgControl', arg);
  switch (control.type) {
    case 'array':
    case 'object':
      return <ObjectControl {...props} {...control} />;
    case 'boolean':
      return <BooleanControl {...props} {...control} />;
    case 'color':
      return <ColorControl {...props} {...control} key={id} />;
    case 'date':
      return <DateControl {...props} {...control} />;
    case 'number':
      return <NumberControl {...props} {...control} />;
    case 'check':
    case 'inline-check':
    case 'radio':
    case 'inline-radio':
    case 'select':
    case 'range':
      return <RangeControl {...props} {...control} />;
    case 'text':
      return <TextControl {...textProps} {...control} />;
    case 'file':
      return <FilesControl {...props} {...control} />;
    default:
      return <NoControl />;
  }
}
