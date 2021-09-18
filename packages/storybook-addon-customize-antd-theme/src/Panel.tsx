import React from 'react';
import { AddonPanel } from '@storybook/components';
import LessControl from './components/LessControl';
interface PanelProps {
  active: boolean;
}

export const Panel: React.FC<PanelProps> = (props) => {
  return (
    <AddonPanel {...props}>
      <LessControl />
    </AddonPanel>
  );
};
