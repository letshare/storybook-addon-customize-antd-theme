import React from 'react';
import { styled, ignoreSsrWarning } from '@storybook/theming';
import { opacify, transparentize, darken, lighten } from 'polished';
import { ArgTypes, ArgType, Args } from '../interface';
import SectionRow from './SectionRow';
import ArgRow from './ArgRow';

export const TableWrapper = styled.table<{ compact?: boolean; inAddonPanel?: boolean }>(
  ({ theme, compact, inAddonPanel }) => ({
    '&&': {
      // Resets for cascading/system styles
      borderCollapse: 'collapse',
      borderSpacing: 0,
      color: theme.color.defaultText,

      'td, th': {
        padding: 0,
        border: 'none',
        verticalAlign: 'top',
        textOverflow: 'ellipsis',
      },
      // End Resets

      fontSize: theme.typography.size.s2 - 1,
      lineHeight: '20px',
      textAlign: 'left',
      width: '100%',

      borderTop: '1px solid #e6e6e6',
      // Margin collapse
      marginTop: inAddonPanel ? 0 : 25,
      marginBottom: inAddonPanel ? 0 : 40,

      'thead>tr>th': {
        background: '#DDDDDD',
        border: 'unset',
      },
      'thead th:first-of-type, td:first-of-type': {
        // intentionally specify thead here
        width: '25%',
      },

      'th:first-of-type, td:first-of-type': {
        paddingLeft: 20,
      },

      'th:nth-of-type(2), td:nth-of-type(2)': {
        ...(compact
          ? null
          : {
              // Description column
              width: '35%',
            }),
      },

      'td:nth-of-type(3)': {
        ...(compact
          ? null
          : {
              // Defaults column
              width: '15%',
            }),
      },

      'th:last-of-type, td:last-of-type': {
        paddingRight: 20,
        ...(compact
          ? null
          : {
              // Controls column
              width: '25%',
            }),
      },

      th: {
        color:
          theme.base === 'light'
            ? transparentize(0.25, theme.color.defaultText)
            : transparentize(0.45, theme.color.defaultText),
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 15,
        paddingRight: 15,
      },

      td: {
        paddingTop: '10px',
        paddingBottom: '10px',

        '&:not(:first-of-type)': {
          paddingLeft: 15,
          paddingRight: 15,
        },

        '&:last-of-type': {
          paddingRight: 20,
        },
      },

      // Table "block" styling
      // Emphasize tbody's background and set borderRadius
      // Calling out because styling tables is finicky

      // Makes border alignment consistent w/other DocBlocks
      marginLeft: inAddonPanel ? 0 : 1,
      marginRight: inAddonPanel ? 0 : 1,

      [`tr:last-child${ignoreSsrWarning}`]: {
        [`td:first-child${ignoreSsrWarning}`]: {
          borderBottomLeftRadius: inAddonPanel ? 0 : theme.appBorderRadius,
        },
        [`td:last-child${ignoreSsrWarning}`]: {
          borderBottomRightRadius: inAddonPanel ? 0 : theme.appBorderRadius,
        },
      },

      tbody: {
        // slightly different than the other DocBlock shadows to account for table styling gymnastics
        boxShadow:
          !inAddonPanel &&
          (theme.base === 'light'
            ? `rgba(0, 0, 0, 0.10) 0 1px 3px 1px,
          ${transparentize(0.035, theme.appBorderColor)} 0 0 0 1px`
            : `rgba(0, 0, 0, 0.20) 0 2px 5px 1px,
          ${opacify(0.05, theme.appBorderColor)} 0 0 0 1px`),
        borderRadius: theme.appBorderRadius,

        // for safari only
        // CSS hack courtesy of https://stackoverflow.com/questions/16348489/is-there-a-css-hack-for-safari-only-not-chrome
        '@media not all and (minResolution:.001dpcm)': {
          '@supports (webkitAppearance:none)': {
            borderWidth: 1,
            borderStyle: 'solid',
            borderColor:
              !inAddonPanel &&
              (theme.base === 'light'
                ? transparentize(0.035, theme.appBorderColor)
                : opacify(0.05, theme.appBorderColor)),
          },
        },

        tr: {
          background: 'transparent',
          overflow: 'hidden',
          ...(inAddonPanel
            ? {
                borderTopWidth: 1,
                borderTopStyle: 'solid',
                borderTopColor:
                  theme.base === 'light'
                    ? darken(0.1, theme.background.content)
                    : lighten(0.05, theme.background.content),
              }
            : {
                [`&:not(:first-child${ignoreSsrWarning})`]: {
                  borderTopWidth: 1,
                  borderTopStyle: 'solid',
                  borderTopColor:
                    theme.base === 'light'
                      ? darken(0.1, theme.background.content)
                      : lighten(0.05, theme.background.content),
                },
              }),
        },

        td: {
          background: theme.background.content,
        },
      },
      // End finicky table styling
    },
  })
);

type Row = { key: string } & ArgType;
type Section = {
  ungrouped: Row[];
};

type Sections = {
  ungrouped: Row[];
  sections: Record<string, Section>;
};

const groupRows = (rows: ArgTypes) => {
  const sections: Sections = { ungrouped: [], sections: {} };
  if (!rows) return sections;

  Object.entries(rows).forEach(([key, row]) => {
    const { category } = row;
    if (category) {
      const section = sections.sections[category] || { ungrouped: [] };
      section.ungrouped.push({ key, ...row });
      sections.sections[category] = section;
    } else {
      sections.ungrouped.push({ key, ...row });
    }
  });

  return sections;
};

export interface ArgsTableRowProps {
  rows: ArgTypes;
  args?: Args;
  updateArgs?: (args: Args) => void;
  resetArgs?: (argNames?: string[]) => void;
}

export default function ArgsTable({ rows, args, updateArgs, resetArgs }: ArgsTableRowProps) {
  const groups = groupRows(rows);
  const expandable = Object.keys(groups.sections).length > 0;
  const colSpan = 4;
  return (
    <TableWrapper className="docblock-argstable">
      <thead className="docblock-argstable-head">
        <tr>
          <th>Name</th>
          <th>Description</th>
          <th>Default</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody className="docblock-argstable-body">
        {groups.ungrouped.map((row) => (
          <ArgRow key={row.key} expandable={expandable} row={row} arg={args && args[row.key]} updateArgs={updateArgs} />
        ))}

        {Object.entries(groups.sections).map(([category, section]) => (
          <SectionRow key={category} label={category} level="subsection" colSpan={colSpan} initialExpanded={false}>
            {section.ungrouped.map((row) => (
              <ArgRow
                key={row.key}
                expandable={expandable}
                row={row}
                arg={args && args[row.key]}
                updateArgs={updateArgs}
              />
            ))}
          </SectionRow>
        ))}
      </tbody>
    </TableWrapper>
  );
}
