import React from 'react'
import Markdown from 'markdown-to-jsx'
import { styled, CSSObject, Theme } from '@storybook/theming'
import { transparentize } from 'polished'
import { ArgType, Args } from '../interface'
import ArgControl from './ArgControl'

const codeCommon = ({ theme }: { theme: Theme }): CSSObject => ({
  lineHeight: 1,
  margin: '0 2px',
  padding: '3px 5px',
  whiteSpace: 'nowrap',

  borderRadius: 3,
  fontSize: theme.typography.size.s2 - 1,

  border:
    theme.base === 'light'
      ? `1px solid ${theme.color.mediumlight}`
      : `1px solid ${theme.color.darker}`,
  color:
    theme.base === 'light'
      ? transparentize(0.1, theme.color.defaultText)
      : transparentize(0.3, theme.color.defaultText),
  backgroundColor: theme.base === 'light' ? theme.color.lighter : theme.color.border
})

const Name = styled.span({ fontWeight: 'bold' })

const Description = styled.div(({ theme }) => ({
  '&&': {
    p: {
      margin: '0 0 10px 0'
    },
    a: {
      color: theme.color.secondary
    }
  },

  code: codeCommon({ theme }),

  '& code': {
    margin: 0,
    display: 'inline-block'
  }
}))

const Text = styled.span<{ simple?: boolean }>(codeCommon, ({ theme, simple = false }) => ({
  flex: '0 0 auto',
  fontFamily: theme.typography.fonts.mono,
  fontSize: theme.typography.size.s1,
  wordBreak: 'break-word',
  whiteSpace: 'normal',
  maxWidth: '100%',
  margin: 0,
  marginRight: '4px',
  marginBottom: '4px',
  paddingTop: '2px',
  paddingBottom: '2px',
  lineHeight: '13px',
  ...(simple && {
    background: 'transparent',
    border: '0 none',
    paddingLeft: 0
  })
}))

const StyledTd = styled.td<{ expandable: boolean }>(({ theme, expandable }) => ({
  paddingLeft: expandable ? '40px !important' : '20px !important'
}))

export interface ArgRowProps {
  row: ArgType;
  arg: any;
  updateArgs?: (args: Args) => void;
  expandable?: boolean;
}

export default function ArgRow ({ row, arg, updateArgs, expandable }: ArgRowProps) {
  const { name, desc, value, type } = row
  const hasDescription = desc != null && desc !== ''

  return (
    <tr>
      <StyledTd expandable={expandable}>
        <Name>{name}</Name>
      </StyledTd>
      <td>
        {hasDescription && (
          <Description>
            <Markdown>{desc}</Markdown>
          </Description>
        )}
      </td>
      <td>
        <Text>{value}</Text>
      </td>
      {updateArgs
        ? (
        <td>
          <ArgControl control={{ key: name, type }} arg={arg} updateArgs={updateArgs}/>
        </td>
          )
        : null}
    </tr>
  )
}
