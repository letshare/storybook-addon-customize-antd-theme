import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Page from './App';
import 'antd/dist/antd.css';

export default {
  title: 'Docs',
  component: Page,
} as ComponentMeta<typeof Page>;

const Template: ComponentStory<typeof Page> = (args) => <Page />;

export const usage = Template.bind({});
