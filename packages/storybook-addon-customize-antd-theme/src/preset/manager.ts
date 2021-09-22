import { addons, types } from '@storybook/addons';

import { ADDON_ID, PANEL_ID } from '../constants';
import { Panel } from '../Panel';

// Register the addon
addons.register(ADDON_ID, () => {
  // Register the panel
  addons.add(PANEL_ID, {
    type: types.PANEL,
    title: 'Customize Antd Theme',
    match: ({ viewMode }) => {
      // console.log('viewMode', viewMode);
      return viewMode === 'story';
    },
    render: Panel,
  });
});
