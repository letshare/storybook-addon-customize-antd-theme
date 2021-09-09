import React, { useEffect, useState } from 'react';
import {
  Row,
  Col,
  Divider,
  Radio,
  Popover,
  Button,
  Checkbox,
  Descriptions,
  Dropdown,
  Menu,
  Empty,
  Layout,
  Collapse,
} from 'antd';
import { DownloadOutlined, DownOutlined } from '@ant-design/icons';

const { SubMenu } = Menu;
const { Header, Footer, Sider, Content } = Layout;
const { Panel } = Collapse;

const content = (
  <div>
    <p>Content</p>
    <p>Content</p>
  </div>
);

function PopoverDemo() {
  return (
    <Popover content={content} title="Title">
      <Button type="primary">Hover me</Button>
    </Popover>
  );
}

function LinkDemo() {
  return <Button type="link">Link</Button>;
}

function ButtonsDemo() {
  const [size, setSize] = useState<any>('large');
  const handleSizeChange = (e: any) => {
    setSize(e.target.value);
  };
  return (
    <>
      <Radio.Group value={size} onChange={handleSizeChange}>
        <Radio.Button value="large">Large</Radio.Button>
        <Radio.Button value="default">Default</Radio.Button>
        <Radio.Button value="small">Small</Radio.Button>
      </Radio.Group>
      <br />
      <br />
      <Button type="primary" size={size}>
        Primary
      </Button>
      <Button size={size}>Default</Button>
      <Button type="dashed" size={size}>
        Dashed
      </Button>
      <br />
      <Button type="link" size={size}>
        Link
      </Button>
      <br />
      <Button type="primary" icon={<DownloadOutlined />} size={size} />
      <Button type="primary" shape="circle" icon={<DownloadOutlined />} size={size} />
      <Button type="primary" shape="round" icon={<DownloadOutlined />} size={size} />
      <Button type="primary" shape="round" icon={<DownloadOutlined />} size={size}>
        Download
      </Button>
      <Button type="primary" icon={<DownloadOutlined />} size={size}>
        Download
      </Button>
    </>
  );
}

function CheckboxDemo() {
  return (
    <Checkbox.Group style={{ width: '100%' }}>
      <Row>
        <Col span={8}>
          <Checkbox value="A">A</Checkbox>
        </Col>
        <Col span={8}>
          <Checkbox value="B">B</Checkbox>
        </Col>
        <Col span={8}>
          <Checkbox value="C">C</Checkbox>
        </Col>
        <Col span={8}>
          <Checkbox value="D">D</Checkbox>
        </Col>
        <Col span={8}>
          <Checkbox value="E">E</Checkbox>
        </Col>
      </Row>
    </Checkbox.Group>
  );
}

function DescriptionsDemo() {
  return (
    <Descriptions title="User Info">
      <Descriptions.Item label="UserName">Zhou Maomao</Descriptions.Item>
      <Descriptions.Item label="Telephone">1810000000</Descriptions.Item>
      <Descriptions.Item label="Live">Hangzhou, Zhejiang</Descriptions.Item>
      <Descriptions.Item label="Remark">empty</Descriptions.Item>
      <Descriptions.Item label="Address">
        No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China
      </Descriptions.Item>
    </Descriptions>
  );
}

const menu = (
  <Menu>
    <Menu.ItemGroup title="Group title">
      <Menu.Item>1st menu item</Menu.Item>
      <Menu.Item>2nd menu item</Menu.Item>
    </Menu.ItemGroup>
    <SubMenu title="sub menu">
      <Menu.Item>3rd menu item</Menu.Item>
      <Menu.Item>4th menu item</Menu.Item>
    </SubMenu>
    <SubMenu title="disabled sub menu" disabled>
      <Menu.Item>5d menu item</Menu.Item>
      <Menu.Item>6th menu item</Menu.Item>
    </SubMenu>
  </Menu>
);

function DropdownDemo() {
  return (
    <Dropdown overlay={menu}>
      <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
        Cascading menu <DownOutlined />
      </a>
    </Dropdown>
  );
}

const plainOptions = ['Apple', 'Pear', 'Orange'];
const options = [
  { label: 'Apple', value: 'Apple' },
  { label: 'Pear', value: 'Pear' },
  { label: 'Orange', value: 'Orange' },
];
const optionsWithDisabled = [
  { label: 'Apple', value: 'Apple' },
  { label: 'Pear', value: 'Pear' },
  { label: 'Orange', value: 'Orange', disabled: true },
];

function RadioDemo() {
  const [state, setState] = useState({
    value1: 'Apple',
    value2: 'Apple',
    value3: 'Apple',
    value4: 'Apple',
  });

  const onChange1 = (e: any) => {
    console.log('radio1 checked', e.target.value);
    setState({
      ...state,
      value1: e.target.value,
    });
  };

  const onChange2 = (e: any) => {
    console.log('radio2 checked', e.target.value);
    setState({
      ...state,
      value2: e.target.value,
    });
  };

  const onChange3 = (e: any) => {
    console.log('radio3 checked', e.target.value);
    setState({
      ...state,
      value3: e.target.value,
    });
  };

  const onChange4 = (e: any) => {
    console.log('radio4 checked', e.target.value);
    setState({
      ...state,
      value4: e.target.value,
    });
  };

  const { value1, value2, value3, value4 } = state;

  return (
    <>
      <Radio.Group options={plainOptions} onChange={onChange1} value={value1} />
      <br />
      <Radio.Group options={optionsWithDisabled} onChange={onChange2} value={value2} />
      <br />
      <br />
      <Radio.Group options={options} onChange={onChange3} value={value3} optionType="button" />
      <br />
      <br />
      <Radio.Group
        options={optionsWithDisabled}
        onChange={onChange4}
        value={value4}
        optionType="button"
        buttonStyle="solid"
      />
    </>
  );
}

function LayoutDemo() {
  return (
    <Layout>
      <Sider>Sider</Sider>
      <Layout>
        <Header>Header</Header>
        <Content>Content</Content>
        <Footer>Footer</Footer>
      </Layout>
    </Layout>
  );
}

function CollapseDemo() {
  const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;
  return (
    <Collapse defaultActiveKey={['1']}>
      <Panel header="This is panel header 1" key="1">
        <p>{text}</p>
      </Panel>
      <Panel header="This is panel header 2" key="2">
        <p>{text}</p>
      </Panel>
      <Panel header="This is panel header 3" key="3">
        <p>{text}</p>
      </Panel>
    </Collapse>
  );
}

const AllComs = [
  {
    title: 'Popover',
    link: 'https://ant.design/components/popover-cn/',
    content: PopoverDemo,
  },
  {
    title: 'Link',
    content: LinkDemo,
  },
  {
    title: 'Buttons',
    link: 'https://ant.design/components/button-cn/',
    content: ButtonsDemo,
  },
  {
    title: 'Checkbox',
    link: 'https://ant.design/components/checkbox-cn/',
    content: CheckboxDemo,
  },
  {
    title: 'Descriptions',
    link: 'https://ant.design/components/descriptions-cn/',
    content: DescriptionsDemo,
  },
  {
    title: 'Dropdown',
    link: 'https://ant.design/components/dropdown-cn/',
    content: DropdownDemo,
  },
  {
    title: 'Empty',
    link: 'https://ant.design/components/empty-cn/',
    content: Empty,
  },
  {
    title: 'Radio',
    link: 'https://ant.design/components/radio-cn/',
    content: RadioDemo,
  },
  {
    title: 'Dropdown',
    link: 'https://ant.design/components/dropdown-cn/',
    content: DropdownDemo,
  },
  {
    title: 'Layout',
    link: 'https://ant.design/components/layout-cn/',
    content: LayoutDemo,
  },
  {
    title: 'Collapse',
    link: 'https://ant.design/components/collapse-cn/',
    content: CollapseDemo,
  },
  {
    title: 'Layout',
    link: 'https://ant.design/components/layout-cn/',
    content: LayoutDemo,
  },
  {
    title: 'Layout',
    link: 'https://ant.design/components/layout-cn/',
    content: LayoutDemo,
  },
  {
    title: 'Layout',
    link: 'https://ant.design/components/layout-cn/',
    content: LayoutDemo,
  },
];

export default function Components({ filter = '' }) {
  return (
    <div>
      {AllComs.map(({ title, link, content: Content }) => (
        <div key={title}>
          <Divider orientation="left">
            {link ? (
              <a target="_blank" href={link} rel="noreferrer">
                {title}
              </a>
            ) : (
              title
            )}
          </Divider>
          <Content />
        </div>
      ))}
    </div>
  );
}

function Line() {
  return (
    <>
      <Divider orientation="left">Global</Divider>
      <Divider orientation="left">Popover</Divider>
      <Divider orientation="left">Border</Divider>
      <Divider orientation="left">Link</Divider>
      <Divider orientation="left">Animation</Divider>
      <Divider orientation="left">Outline</Divider>
      <Divider orientation="left">Disabled</Divider>
      <Divider orientation="left">Shadow</Divider>
      <Divider orientation="left">Buttons</Divider>
      <Divider orientation="left">Checkbox</Divider>
      <Divider orientation="left">Descriptions</Divider>
      <Divider orientation="left">Divider</Divider>
      <Divider orientation="left">Dropdown</Divider>
      <Divider orientation="left">Empty</Divider>
      <Divider orientation="left">Radio</Divider>
      <Divider orientation="left">Screen</Divider>
      <Divider orientation="left">Layout</Divider>
      <Divider orientation="left">Zindex</Divider>
      <Divider orientation="left">Collapse</Divider>
      <Divider orientation="left">Form</Divider>
      <Divider orientation="left">Input</Divider>
      <Divider orientation="left">Mentions</Divider>
      <Divider orientation="left">Select</Divider>
      <Divider orientation="left">Cascader</Divider>
      <Divider orientation="left">Anchor</Divider>
      <Divider orientation="left">Tooltip</Divider>
      <Divider orientation="left">Modal</Divider>
      <Divider orientation="left">Progress</Divider>
      <Divider orientation="left">Menu</Divider>
      <Divider orientation="left">Spin</Divider>
      <Divider orientation="left">Table</Divider>
      <Divider orientation="left">Tag</Divider>
      <Divider orientation="left">Picker</Divider>
      <Divider orientation="left">Calendar</Divider>
      <Divider orientation="left">Carousel</Divider>
      <Divider orientation="left">Badge</Divider>
      <Divider orientation="left">Rate</Divider>
      <Divider orientation="left">Card</Divider>
      <Divider orientation="left">Comment</Divider>
      <Divider orientation="left">Tabs</Divider>
      <Divider orientation="left">BackTop</Divider>
      <Divider orientation="left">Avatar</Divider>
      <Divider orientation="left">Switch</Divider>
      <Divider orientation="left">Pagination</Divider>
      <Divider orientation="left">PageHeader</Divider>
      <Divider orientation="left">Breadcrumb</Divider>
      <Divider orientation="left">Slider</Divider>
      <Divider orientation="left">Tree</Divider>
      <Divider orientation="left">Skeleton</Divider>
      <Divider orientation="left">Transfer</Divider>
      <Divider orientation="left">Alert</Divider>
      <Divider orientation="left">List</Divider>
      <Divider orientation="left">Statistic</Divider>
      <Divider orientation="left">Drawer</Divider>
      <Divider orientation="left">Timeline</Divider>
      <Divider orientation="left">Typography</Divider>
      <Divider orientation="left">Steps</Divider>
      <Divider orientation="left">Notification</Divider>
      <Divider orientation="left">Result</Divider>
      <Divider orientation="left">Image</Divider>
    </>
  );
}
