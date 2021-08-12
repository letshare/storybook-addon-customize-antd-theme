import React from 'react'
import { useArgs, useArgTypes, useParameter, useStorybookState } from '@storybook/api'
import { Button, ArgsTable, SortType } from '@storybook/components'
import { addons } from '@storybook/addons'
import { PARAM_KEY, EVENT_CHANGE_LESS, EVENT_EXPORT_LESS, TRIGGER_EXPORT_LESS } from '../constants'

interface ControlsParameters {
  sort?: SortType;
}

let locked = false
export default function ControlsPanel () {
  const [args, updateArgs, resetArgs] = useArgs()
  const rows = useArgTypes()
  const {
    sort
  } = useParameter<ControlsParameters>(PARAM_KEY, {})
  const { path } = useStorybookState()

  const bus = addons.getChannel()
  console.log('args', args)
  console.log('rows', rows)

  const lessRows: any = {
    'primary-color': {
      name: 'primary-color',
      control: { type: 'color' },
      description: '重要色',
      table: {
        defaultValue: {
          detail: undefined,
          summary: '#1890ff'
        },
        jsDocTags: undefined,
        type: {
          detail: undefined,
          summary: 'color'
        }
      },
      type: {
        name: 'color',
        required: false
      }
    }
  }

  const lessArgs: any = {
    'primary-color': '#1890ff'
  }

  const handleUpdateArgs = (...args: any[]) => {
    console.log('handleUpdateArgs', args)
    // eslint-disable-next-line no-useless-call
    updateArgs.call(null, ...args)
    bus.emit(EVENT_CHANGE_LESS, args)
  }

  bus.on(EVENT_EXPORT_LESS, (vars) => {
    if (locked) return
    locked = true
    const a = document.createElement('a')
    const blob = new Blob([JSON.stringify(vars, null, 2)])
    a.href = URL.createObjectURL(blob)
    a.download = 'custom-antd.json'
    console.log('receive-less', vars)
    a.click()
    setTimeout(() => {
      locked = false
    }, 2000)
  })

  return (
    <>
      <Button small secondary onClick={() => { bus.emit(TRIGGER_EXPORT_LESS) }}>导出</Button> / <Button small gray onClick={() => { console.log('重置') }}>重置</Button>
      <ArgsTable
        {...{
          key: path, // resets state when switching stories
          // compact: !expanded && hasControls,
          rows: lessRows,
          args: lessArgs,
          updateArgs: handleUpdateArgs,
          resetArgs,
          inAddonPanel: true,
          sort
        }}
      />
    </>
  )
}
