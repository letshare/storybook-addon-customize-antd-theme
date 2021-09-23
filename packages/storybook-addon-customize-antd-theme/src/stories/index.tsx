import React from 'react';

import AntdBoard from './components/AntdBoard';

export default {
  title: 'Theme',
  component: AntdBoard,
};

const Template = (args: any) => <AntdBoard {...args} />;

export const antd = Template.bind({});
antd.args = {
  title: 'antd components display',
};

antd.storyName = 'antd components';
