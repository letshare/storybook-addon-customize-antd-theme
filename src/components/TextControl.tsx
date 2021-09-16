/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import React, { ChangeEvent, forwardRef, useRef } from 'react';
import { styled, Theme, CSSObject } from '@storybook/theming';

import TextareaAutoResize, { TextareaAutosizeProps } from 'react-textarea-autosize';

const styleResets: CSSObject = {
  // resets
  appearance: 'none',
  border: '0 none',
  boxSizing: 'inherit',
  display: ' block',
  margin: ' 0',
  background: 'transparent',
  padding: 0,
  fontSize: 'inherit',
  position: 'relative',
};

const styles = ({ theme }: { theme: Theme }): CSSObject => ({
  ...styleResets,

  transition: 'box-shadow 200ms ease-out, opacity 200ms ease-out',
  color: theme.input.color || 'inherit',
  background: theme.input.background,
  boxShadow: `${theme.input.border} 0 0 0 1px inset`,
  borderRadius: theme.input.borderRadius,
  fontSize: theme.typography.size.s2 - 1,
  lineHeight: '20px',
  padding: '6px 10px', // 32

  '&:focus': {
    boxShadow: `${theme.color.secondary} 0 0 0 1px inset`,
    outline: 'none',
  },
  '&[disabled]': {
    cursor: 'not-allowed',
    opacity: 0.5,
  },

  '&:-webkit-autofill': { WebkitBoxShadow: `0 0 0 3em ${theme.color.lightest} inset` },

  '::placeholder': {
    color: theme.color.mediumdark,
  },
});

type Sizes = '100%' | 'flex' | 'auto';
type Alignments = 'end' | 'center' | 'start';
type ValidationStates = 'valid' | 'error' | 'warn';

export interface InputStyleProps {
  size?: Sizes;
  align?: Alignments;
  valid?: ValidationStates;
  height?: number;
}

const sizes = ({ size }: { size?: Sizes }): CSSObject => {
  switch (size) {
    case '100%': {
      return { width: '100%' };
    }
    case 'flex': {
      return { flex: 1 };
    }
    case 'auto':
    default: {
      return { display: 'inline' };
    }
  }
};
const alignment = ({ align }: InputStyleProps): CSSObject => {
  switch (align) {
    case 'end': {
      return { textAlign: 'right' };
    }
    case 'center': {
      return { textAlign: 'center' };
    }
    case 'start':
    default: {
      return { textAlign: 'left' };
    }
  }
};
const validation = ({ valid, theme }: { valid: ValidationStates; theme: Theme }): CSSObject => {
  switch (valid) {
    case 'valid': {
      return { boxShadow: `${theme.color.positive} 0 0 0 1px inset !important` };
    }
    case 'error': {
      return { boxShadow: `${theme.color.negative} 0 0 0 1px inset !important` };
    }
    case 'warn': {
      return {
        boxShadow: `${theme.color.warning} 0 0 0 1px inset`,
      };
    }
    case undefined:
    case null:
    default: {
      return {};
    }
  }
};

const Wrapper = styled.label((props) => ({
  display: 'flex',
}));

type TextareaProps = Omit<TextareaAutosizeProps, keyof InputStyleProps> & InputStyleProps;
export const Textarea = Object.assign(
  styled(
    forwardRef<any, TextareaProps>(({ size, valid, align, ...props }, ref) => (
      <TextareaAutoResize {...props} ref={ref} />
    ))
  )<TextareaProps>(styles, sizes, alignment, validation, ({ height = 400 }) => ({
    overflow: 'visible',
    maxHeight: height,
  })),
  {
    displayName: 'Textarea',
  }
);

const getControlId = (value: string) => `control-${value.replace(/\s+/g, '-')}`;

export default function TextControl({ name, value, onChange, onSave, onFocus, onBlur }: any) {
  const ele = useRef(null);

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    onChange(event.target.value);
  };

  const handleBlur = (event: ChangeEvent<HTMLTextAreaElement>) => {
    onSave?.(value);
    onBlur();
  };

  const handleKeyDown = (e: any) => {
    if (e.key === 'Enter') {
      e.nativeEvent.returnValue = false; // 禁止换行
      ele.current.blur();
    }
  };

  const isValid = typeof value === 'string';
  return (
    <Wrapper>
      <Textarea
        id={getControlId(name)}
        onChange={handleChange}
        ref={ele}
        size="flex"
        placeholder="Edit string..."
        valid={isValid ? null : 'error'}
        onKeyDown={handleKeyDown}
        {...{ name, value: isValid ? value : '', onFocus, onBlur: handleBlur }}
      />
    </Wrapper>
  );
}
