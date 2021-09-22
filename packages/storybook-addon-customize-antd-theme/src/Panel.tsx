import React from 'react';
import { AddonPanel } from '@storybook/components';
import Blocks from './components/Blocks';
interface PanelProps {
  active: boolean;
}

export const Panel: React.FC<PanelProps> = (props) => {
  return (
    <AddonPanel {...props}>
      <Blocks />
    </AddonPanel>
  );
};
