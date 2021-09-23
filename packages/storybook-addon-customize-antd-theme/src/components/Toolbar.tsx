import React, { useCallback } from 'react';
import { FORCE_RE_RENDER } from '@storybook/core-events';
import { useGlobals } from '@storybook/api';
import { IconButton, Icons } from '@storybook/components';
import { addons } from '@storybook/addons';
import { TOOL_ID, PARAM_KEY } from '../constants';

export default function Toolbar() {
  const [globals, updateGlobals] = useGlobals();
  const isActive = typeof globals[PARAM_KEY] === 'undefined' ? true : globals[PARAM_KEY];

  // Function that will update the global value and trigger a UI refresh.
  const refreshAndUpdateGlobal = () => {
    // Updates Storybook global value
    updateGlobals({
      [PARAM_KEY]: !isActive,
    });
    // Invokes Storybook's addon API method (with the FORCE_RE_RENDER) event to trigger a UI refresh
    addons.getChannel().emit(FORCE_RE_RENDER);
  };

  const toggleOutline = useCallback(() => refreshAndUpdateGlobal(), [isActive]);

  return (
    <IconButton key={TOOL_ID} active={isActive} title="Render with custom antd theme" onClick={toggleOutline}>
      <Icons icon="box" />
    </IconButton>
  );
}
