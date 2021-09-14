import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { useStorybookState } from '@storybook/api';
import TrieSearch from 'trie-search';
import { Button } from '@storybook/components';
import { addons } from '@storybook/addons';
import styled from '@emotion/styled';
import { Input } from 'antd';
import 'antd/dist/antd.css';
import { EVENT_CHANGE_LESS, EVENT_EXPORT_LESS, TRIGGER_EXPORT_LESS } from '../constants';
import { LessArgGenerator, filtered } from '../lib/utils';
import antdLessValue from '../lib/antd-helper/antdLessValue';
import ArgsTable from './ArgsTable';

const { Search } = Input;

const Tool = styled.div((props) => ({
  display: 'flex',
  marginTop: '10px',
  marginBottom: '-10px',
}));

export default function ControlsPanel() {
  const allLessArgs = useMemo(() => new LessArgGenerator(antdLessValue).hints, []);
  const [lessArgs, setLessArgs] = useState(allLessArgs);
  const [argsValues, setArgs] = useState({ ...antdLessValue });
  const [bus] = useState(() => addons.getChannel());

  const { path } = useStorybookState();

  console.log('args', lessArgs, path);

  const handleUpdateArgs = useCallback((...args: any[]) => {
    console.log('handleUpdateArgs', args);
    setArgs((argsValues) => {
      return { ...argsValues, ...args[0] };
    });
    bus.emit(EVENT_CHANGE_LESS, args);
  }, []);

  useEffect(() => {
    bus.on(EVENT_EXPORT_LESS, (vars) => {
      const a = document.createElement('a');
      const blob = new Blob([JSON.stringify(vars, null, 2)]);
      a.href = URL.createObjectURL(blob);
      a.download = 'antd-theme.json';
      console.log('receive-less', vars);
      a.click();
    });
  }, []);

  const onSearch = (value: any) => {
    if (!value) {
      return setLessArgs(allLessArgs);
    }
    const trie = new TrieSearch(['name', 'desc', 'category']);
    trie.addAll(Object.values(allLessArgs));
    setLessArgs(
      filtered(
        trie.search(value).map((arg: any) => arg.name),
        allLessArgs
      )
    );
  };

  return (
    <>
      <Tool>
        <Search placeholder="input search text" onSearch={onSearch} style={{ width: 200, marginLeft: 16 }} allowClear />
        <Button
          small
          secondary
          onClick={() => {
            bus.emit(TRIGGER_EXPORT_LESS);
          }}
          style={{ marginLeft: 'auto' }}
        >
          export json
        </Button>
        <Button
          small
          gray
          onClick={() => {
            console.log('重置');
          }}
        >
          reset
        </Button>
      </Tool>
      <ArgsTable key={path} rows={lessArgs} args={argsValues} updateArgs={handleUpdateArgs} />
    </>
  );
}
