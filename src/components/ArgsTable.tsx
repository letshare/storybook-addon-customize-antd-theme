import React from 'react'
import { ArgTypes, ArgType, Args } from '../interface'
import SectionRow from './SectionRow'
import ArgRow from './ArgRow'

type Row = { key: string } & ArgType
type Section = {
  ungrouped: Row[];
};

type Sections = {
  ungrouped: Row[];
  sections: Record<string, Section>;
};

const groupRows = (rows: ArgTypes) => {
  const sections:Sections = { ungrouped: [], sections: {} }
  if (!rows) return sections

  Object.entries(rows).forEach(([key, row]) => {
    const { category } = row
    if (category) {
      const section = sections.sections[category] || { ungrouped: [] }
      section.ungrouped.push({ key, ...row })
      sections.sections[category] = section
    } else {
      sections.ungrouped.push({ key, ...row })
    }
  })

  return sections
}

export interface ArgsTableRowProps {
  rows: ArgTypes;
  args?: Args;
  updateArgs?: (args: Args) => void;
  resetArgs?: (argNames?: string[]) => void;
}

export default function ArgsTable ({
  rows,
  args,
  updateArgs,
  resetArgs
}: ArgsTableRowProps) {
  const groups = groupRows(rows)
  const expandable = Object.keys(groups.sections).length > 0
  const colSpan = 4

  return (
    <table>
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
            <SectionRow key={category} label={category} level="section" colSpan={colSpan}>
              {section.ungrouped.map((row) => (
                <ArgRow key={row.key} expandable={expandable} row={row} arg={args && args[row.key]} updateArgs={updateArgs} />
              ))}
            </SectionRow>
          ))}
        </tbody>
    </table>
  )
}
