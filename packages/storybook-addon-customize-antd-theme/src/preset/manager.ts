import { addons, types } from '@storybook/addons';

import { ADDON_ID, PANEL_ID, TOOL_ID, PARAM_KEY } from '../constants';
import Panel from '../components/Panel';
import Toolbar from '../components/Toolbar';

// Register the addon
addons.register(ADDON_ID, () => {
  // Register the panel
  addons.add(PANEL_ID, {
    type: types.PANEL,
    title: 'Customize Antd Theme',
    match: ({ viewMode }) => {
      return viewMode === 'story';
    },
    render: Panel,
    paramKey: PARAM_KEY,
  });

  addons.add(TOOL_ID, {
    title: 'Customize Antd Theme',
    // 👇 Sets the type of UI element in Storybook
    type: types.TOOL,
    // 👇 Shows the Toolbar UI element if either the Canvas or Docs tab is active
    match: ({ viewMode }) => !!(viewMode && viewMode.match(/^(story|docs)$/)),
    render: Toolbar,
  });
});
