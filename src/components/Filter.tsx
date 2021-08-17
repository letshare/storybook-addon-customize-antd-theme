import React, { useState } from 'react'
import { useArgs, useParameter, useStorybookState } from '@storybook/api'
import { Button, ArgsTable, SortType } from '@storybook/components'
import { addons } from '@storybook/addons'
import { PARAM_KEY, EVENT_CHANGE_LESS, EVENT_EXPORT_LESS, TRIGGER_EXPORT_LESS } from '../constants'
import { LessArgGenerator } from '../lib/utils'
import antdLessValue from '../lib/theme/antdLessValue'

interface ControlsParameters {
  sort?: SortType;
}

let locked = false
export default function Filter () {
  // eslint-disable-next-line no-unused-vars
  const [_, updateArgs, resetArgs] = useArgs()
  const [argsGenerator] = useState(new LessArgGenerator(antdLessValue))
  const [argsValues] = useState({ ...antdLessValue })

  const {
    sort
  } = useParameter<ControlsParameters>(PARAM_KEY, {})
  const { path } = useStorybookState()

  const bus = addons.getChannel()
  console.log('args', argsGenerator.args)

  const handleUpdateArgs = (...args: any[]) => {
    console.log('handleUpdateArgs', args)
    // eslint-disable-next-line no-useless-call
    updateArgs.call(null, ...args)
    Object.assign(argsValues, { ...args[0] })
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
      <Button small secondary onClick={() => { bus.emit(TRIGGER_EXPORT_LESS) }}>export json</Button>  <Button small gray onClick={() => { console.log('重置') }}>reset</Button>
      <ArgsTable
        {...{
          key: path, // resets state when switching stories
          // compact: !expanded && hasControls,
          rows: argsGenerator.args,
          args: argsValues,
          updateArgs: handleUpdateArgs,
          resetArgs,
          inAddonPanel: true,
          sort
        }}
      />
    </>
  )
}
