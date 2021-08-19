import React, { useState, useEffect, useCallback } from 'react'
import { useStorybookState } from '@storybook/api'
import { Button } from '@storybook/components'
import { addons } from '@storybook/addons'
import { EVENT_CHANGE_LESS, EVENT_EXPORT_LESS, TRIGGER_EXPORT_LESS } from '../constants'
import { LessArgGenerator } from '../lib/utils'
import antdLessValue from '../lib/antd-helper/antdLessValue'
import ArgsTable from './ArgsTable'

export default function ControlsPanel () {
  const [argsGenerator] = useState(() => new LessArgGenerator(antdLessValue))
  const [argsValues, updateArgs] = useState({ ...antdLessValue })
  const [bus] = useState(() => addons.getChannel())

  const { path } = useStorybookState()

  // console.log('args', argsGenerator.args, path)

  const handleUpdateArgs = useCallback((...args: any[]) => {
    console.log('handleUpdateArgs', args)
    updateArgs((argsValues) => {
      return { ...argsValues, ...args[0] }
    })
    bus.emit(EVENT_CHANGE_LESS, args)
  }, [])

  useEffect(() => {
    bus.on(EVENT_EXPORT_LESS, (vars) => {
      const a = document.createElement('a')
      const blob = new Blob([JSON.stringify(vars, null, 2)])
      a.href = URL.createObjectURL(blob)
      a.download = 'antd-theme.json'
      console.log('receive-less', vars)
      a.click()
    })
  }, [])

  return (
    <>
      <Button small secondary onClick={() => { bus.emit(TRIGGER_EXPORT_LESS) }}>export json</Button>
      <Button small gray onClick={() => { console.log('重置') }}>reset</Button>
      <ArgsTable
        key ={path}
        rows={argsGenerator.hints}
        args={argsValues}
        updateArgs={handleUpdateArgs}
      />
    </>
  )
}
