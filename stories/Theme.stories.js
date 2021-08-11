import React from 'react'

import Theme from './Theme'

export default {
  title: '主题',
  component: Theme
}

const Template = (args:any) => <Theme {...args} />

export const antd = Template.bind({})
antd.args = {
  title: 'antd主题定制'
}
