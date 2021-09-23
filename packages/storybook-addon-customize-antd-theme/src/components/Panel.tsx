import React, { useState, useMemo, useEffect, useCallback, useRef } from 'react';
import { useParameter } from '@storybook/api';
import TrieSearch from 'trie-search';
import { AddonPanel, Button } from '@storybook/components';
import { addons } from '@storybook/addons';
import styled from '@emotion/styled';
import { pick } from 'lodash';
import Input from 'antd/lib/input';
import 'antd/lib/input/style/css';
import {
  EVENT_CHANGE_LESS,
  EVENT_RESET_LESS,
  EVENT_EXPORT_LESS,
  TRIGGER_EXPORT_LESS,
  EVENT_EXPORT_JS,
  TRIGGER_EXPORT_JS,
  EVENT_LESS_LOADED,
  PARAM_KEY,
} from '../constants';
import { LessArgGenerator } from '../lib/utils';
import antdLessValue from '../lib/antd-helper/antdLessValue';
import ArgsTable from './ArgsTable';

const { Search } = Input;

const Tool = styled.div((props) => ({
  display: 'flex',
  marginTop: '10px',
  marginBottom: '-10px',
}));

const InputFile = styled.label((props) => ({
  display: 'inline-block',
  cursor: 'pointer',
  'input[type="file"]': {
    display: 'none',
  },
}));

const jsExtReg = /\.js$/;
const lineReg = /[\r\n]+/;
const jsVarReg = /^\s*['"@]*([^'"\s:]+)['"]?\s*:\s*['"](.+)['"]\s*,?\s*/;
const lessVarReg = /^\s*@([^\s:]+)\s*:\s*(\S.+)\s*;\s*/;

interface PanelProps {
  active: boolean;
}

export default function Panel(props: PanelProps) {
  const allLessArgs = useMemo(() => new LessArgGenerator(antdLessValue).hints, []);
  const [lessArgs, setLessArgs] = useState(allLessArgs);
  const [argsValues, setArgs] = useState({ ...antdLessValue });
  const [bus] = useState(() => addons.getChannel());
  const paramsRef = useRef<any>({});
  const params = useParameter(PARAM_KEY);

  paramsRef.current = params;

  // console.log('Panel', paramsRef.current, props, lessArgs, argsValues);

  const handleUpdateArgs = useCallback((...args: any[]) => {
    // console.log('handleUpdateArgs', args);
    setArgs((argsValues) => {
      return { ...argsValues, ...args[0] };
    });
    bus.emit(EVENT_CHANGE_LESS, args[0]);
  }, []);

  useEffect(() => {
    bus.on(EVENT_EXPORT_JS, (vars) => {
      const a = document.createElement('a');
      const blob = new Blob(['module.exports = ', JSON.stringify(vars, null, 2), ';']);
      a.href = URL.createObjectURL(blob);
      a.download = 'antd-theme.js';
      a.click();
    });

    bus.on(EVENT_EXPORT_LESS, (vars) => {
      const a = document.createElement('a');
      const blob = new Blob(
        Object.keys(vars).map((key) => {
          return `${key}: ${vars[key]};\n`;
        })
      );
      a.href = URL.createObjectURL(blob);
      a.download = 'antd-theme.less';
      a.click();
    });

    bus.on(EVENT_LESS_LOADED, (vars) => {
      const { modifyVars } = paramsRef.current;
      if (typeof modifyVars === 'object' && Object.keys(modifyVars).length) {
        bus.emit(EVENT_CHANGE_LESS, modifyVars);
      }
    });
  }, []);

  // 实现前缀树搜索
  const handleSearch = (value: any) => {
    if (!value) {
      return setLessArgs(allLessArgs);
    }
    const trie = new TrieSearch(['name', 'desc', 'category']);
    trie.addAll(Object.values(allLessArgs));
    setLessArgs(
      pick(
        allLessArgs,
        trie.search(value).map((arg: any) => arg.name)
      )
    );
  };

  const handleReset = () => {
    setArgs({ ...antdLessValue });
    bus.emit(EVENT_RESET_LESS, { ...antdLessValue });
  };

  const onInputClick = (event: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    const element = event.target as HTMLInputElement;
    element.value = '';
  };

  const readFile = (event: any) => {
    const fr = new FileReader();
    const file = event.target.files[0];
    fr.onload = function () {
      const lines = (fr.result as string).split(lineReg);
      const isJs = jsExtReg.test(file.name);
      const args: Record<string, any> = {};
      lines.forEach((line) => {
        const mm = line.match(isJs ? jsVarReg : lessVarReg);
        if (mm) {
          args[mm[1]] = mm[2];
        }
      });
      setArgs((argsValues) => {
        return { ...argsValues, ...args };
      });
      bus.emit(EVENT_CHANGE_LESS, args);
    };

    fr.readAsText(file);
  };

  return (
    <AddonPanel {...props}>
      <Tool>
        <Search
          placeholder="input search text"
          onSearch={handleSearch}
          style={{ width: 200, marginLeft: 16 }}
          allowClear
        />
        <Button
          small
          secondary
          onClick={() => {
            bus.emit(TRIGGER_EXPORT_JS);
          }}
          style={{ marginLeft: 'auto' }}
        >
          export js
        </Button>
        <Button
          small
          secondary
          onClick={() => {
            bus.emit(TRIGGER_EXPORT_LESS);
          }}
          style={{ marginLeft: '8px' }}
        >
          export less
        </Button>
        <Button small secondary style={{ marginLeft: '8px' }}>
          <InputFile>
            <input type="file" accept=".js, .less" onChange={readFile} onClick={onInputClick} />
            import less
          </InputFile>
        </Button>
        <Button small gray style={{ marginLeft: '8px', marginRight: '16px' }} onClick={handleReset}>
          reset
        </Button>
      </Tool>
      <ArgsTable key="customize-antd-theme" rows={lessArgs} args={argsValues} updateArgs={handleUpdateArgs} />
    </AddonPanel>
  );
}
