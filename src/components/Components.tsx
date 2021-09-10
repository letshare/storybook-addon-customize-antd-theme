import React, { useState } from 'react';
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
  Form,
  Input,
  InputNumber,
  Mentions,
  Select,
  Cascader,
  Anchor,
  Tooltip,
  Modal,
  Progress,
  Switch,
  Space,
  Spin,
  Table,
  Tag,
  DatePicker,
  TimePicker,
  Calendar,
  Carousel,
  Badge,
  Avatar,
  Rate,
  Card,
  Comment,
} from 'antd';
import {
  DownloadOutlined,
  DownOutlined,
  UserOutlined,
  MailOutlined,
  AppstoreOutlined,
  ClockCircleOutlined,
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
  DislikeOutlined,
  LikeOutlined,
  DislikeFilled,
  LikeFilled,
} from '@ant-design/icons';

const { SubMenu } = Menu;
const { Header, Footer, Sider, Content } = Layout;
const { Panel } = Collapse;
const { Option } = Mentions;
const { Option: SOption } = Select;
const { Link } = Anchor;
const { Meta } = Card;

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

function FormDemo() {
  const [form] = Form.useForm();
  const [form2] = Form.useForm();
  const [form3] = Form.useForm();

  return (
    <Row gutter={[16, 16]}>
      <Col span={8}>
        <Form
          labelCol={{
            span: 4,
          }}
          wrapperCol={{
            span: 14,
          }}
          layout="horizontal"
          form={form}
        >
          <Form.Item label="Field A">
            <Input placeholder="input placeholder" />
          </Form.Item>
          <Form.Item label="Field B">
            <Input placeholder="input placeholder" />
          </Form.Item>
          <Form.Item
            wrapperCol={{
              span: 14,
              offset: 4,
            }}
          >
            <Button type="primary">Submit</Button>
          </Form.Item>
        </Form>
      </Col>
      <Col span={8}>
        <Form layout="vertical" form={form2}>
          <Form.Item label="Field A">
            <Input placeholder="input placeholder" />
          </Form.Item>
          <Form.Item label="Field B">
            <Input placeholder="input placeholder" />
          </Form.Item>
          <Form.Item>
            <Button type="primary">Submit</Button>
          </Form.Item>
        </Form>
      </Col>
      <Col span={8}>
        <Form layout="inline" form={form3}>
          <Form.Item label="Field A">
            <Input placeholder="input placeholder" />
          </Form.Item>
          <Form.Item label="Field B">
            <Input placeholder="input placeholder" />
          </Form.Item>
          <Form.Item>
            <Button type="primary">Submit</Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
}

function InputDemo() {
  return (
    <>
      <Input size="large" placeholder="large size" prefix={<UserOutlined />} />
      <br />
      <br />
      <Input placeholder="default size" prefix={<UserOutlined />} />
      <br />
      <br />
      <Input size="small" placeholder="small size" prefix={<UserOutlined />} />
      <br />
      <br />
      <InputNumber min={1} max={10} defaultValue={3} />
    </>
  );
}

function MentionsDemo() {
  return (
    <Mentions style={{ width: '100%' }} defaultValue="@afc163">
      <Option value="afc163">afc163</Option>
      <Option value="zombieJ">zombieJ</Option>
      <Option value="yesmeck">yesmeck</Option>
    </Mentions>
  );
}

function SelectDemo() {
  const children = [];
  for (let i = 10; i < 36; i++) {
    children.push(
      <SOption key={i.toString(36) + i} value={i.toString(36) + i}>
        {i.toString(36) + i}
      </SOption>
    );
  }
  return (
    <>
      <Select defaultValue="lucy" style={{ width: 120 }} allowClear>
        <SOption value="jack">Jack</SOption>
        <SOption value="lucy">Lucy</SOption>
        <SOption value="disabled" disabled>
          Disabled
        </SOption>
        <SOption value="Yiminghe">yiminghe</SOption>
      </Select>
      <Select defaultValue="lucy" style={{ width: 120 }} disabled>
        <SOption value="lucy">Lucy</SOption>
      </Select>
      <Select
        mode="multiple"
        allowClear
        style={{ width: '100%' }}
        placeholder="Please select"
        defaultValue={['a10', 'c12']}
      >
        {children}
      </Select>
    </>
  );
}

function CascaderDemo() {
  const options = [
    {
      value: 'zhejiang',
      label: 'Zhejiang',
      children: [
        {
          value: 'hangzhou',
          label: 'Hangzhou',
          children: [
            {
              value: 'xihu',
              label: 'West Lake',
            },
          ],
        },
      ],
    },
    {
      value: 'jiangsu',
      label: 'Jiangsu',
      children: [
        {
          value: 'nanjing',
          label: 'Nanjing',
          children: [
            {
              value: 'zhonghuamen',
              label: 'Zhong Hua Men',
            },
          ],
        },
      ],
    },
  ];
  return <Cascader options={options} placeholder="Please select" />;
}

function AnchorDemo() {
  return (
    <Anchor affix={false}>
      <Link href="#" title="Basic demo" />
      <Link href="#" title="Static demo" />
      <Link href="#" title="API">
        <Link href="#" title="Anchor Props" />
        <Link href="#" title="Link Props" />
      </Link>
    </Anchor>
  );
}

function TooltipDemo() {
  return (
    <Tooltip title="prompt text">
      <span>Tooltip will show on mouse enter.</span>
    </Tooltip>
  );
}

function ModalDemo() {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Open Modal
      </Button>
      <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </>
  );
}

function ProgressDemo() {
  return (
    <>
      <Progress percent={30} />
      <br />
      <Progress percent={50} status="active" />
      <br />
      <Progress percent={70} status="exception" />
      <br />
      <Progress percent={100} />
      <br />
      <Progress percent={50} showInfo={false} />
      <br />
      <Progress type="circle" percent={75} />
      <br />
      <Progress type="circle" percent={70} status="exception" />
      <br />
      <Progress type="circle" percent={100} />
      <br />
      <Progress percent={50} steps={3} />
      <br />
      <Progress percent={30} steps={5} />
      <br />
      <Progress percent={100} steps={5} size="small" strokeColor="#52c41a" />
    </>
  );
}

function MenuDemo() {
  const [state, setState] = useState({
    theme: 'dark',
    current: '1',
  });

  const changeTheme = (value: boolean) => {
    setState({
      ...state,
      theme: value ? 'dark' : 'light',
    });
  };

  const handleClick = (e: any) => {
    console.log('click ', e);
    setState({
      ...state,
      current: e.key,
    });
  };

  return (
    <>
      <Switch
        checked={state.theme === 'dark'}
        onChange={changeTheme}
        checkedChildren="Dark"
        unCheckedChildren="Light"
      />
      <br />
      <br />
      <Menu
        theme={state.theme as any}
        onClick={handleClick}
        style={{ width: 256 }}
        defaultOpenKeys={['sub1']}
        selectedKeys={[state.current]}
        mode="inline"
      >
        <SubMenu key="sub1" icon={<MailOutlined />} title="Navigation One">
          <Menu.Item key="1">Option 1</Menu.Item>
          <Menu.Item key="2">Option 2</Menu.Item>
          <Menu.Item key="3">Option 3</Menu.Item>
          <Menu.Item key="4">Option 4</Menu.Item>
        </SubMenu>
        <SubMenu key="sub2" icon={<AppstoreOutlined />} title="Navigation Two">
          <Menu.Item key="5">Option 5</Menu.Item>
          <Menu.Item key="6">Option 6</Menu.Item>
          <SubMenu key="sub3" title="Submenu">
            <Menu.Item key="7">Option 7</Menu.Item>
            <Menu.Item key="8">Option 8</Menu.Item>
          </SubMenu>
        </SubMenu>
        <SubMenu key="sub4" icon={<SettingOutlined />} title="Navigation Three">
          <Menu.Item key="9">Option 9</Menu.Item>
          <Menu.Item key="10">Option 10</Menu.Item>
          <Menu.Item key="11">Option 11</Menu.Item>
          <Menu.Item key="12">Option 12</Menu.Item>
        </SubMenu>
      </Menu>
    </>
  );
}

function SpinDemo() {
  return (
    <Space size="middle">
      <Spin size="small" />
      <Spin />
      <Spin size="large" />
    </Space>
  );
}

function TableDemo() {
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Age',
      dataIndex: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
    },
  ];

  const data = [];
  for (let i = 0; i < 46; i++) {
    data.push({
      key: i,
      name: `Edward King ${i}`,
      age: 32,
      address: `London, Park Lane no. ${i}`,
    });
  }

  const [state, setState] = useState({
    selectedRowKeys: [], // Check here to configure the default column
    loading: false,
  });

  const start = () => {
    setState({ ...state, loading: true });
    // ajax request after empty completing
    setTimeout(() => {
      setState({
        ...state,
        selectedRowKeys: [],
        loading: false,
      });
    }, 1000);
  };

  const onSelectChange = (selectedRowKeys: any) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    setState({ ...state, selectedRowKeys });
  };

  const { loading, selectedRowKeys } = state;
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const hasSelected = selectedRowKeys.length > 0;

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Button type="primary" onClick={start} disabled={!hasSelected} loading={loading}>
          Reload
        </Button>
        <span style={{ marginLeft: 8 }}>{hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}</span>
      </div>
      <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
    </div>
  );
}

function TagDemo() {
  function preventDefault(e: any) {
    e.preventDefault();
    console.log('Clicked! But prevent default.');
  }
  return (
    <>
      <Tag>Tag 1</Tag>
      <Tag>
        <a href="https://github.com/ant-design/ant-design/issues/1862">Link</a>
      </Tag>
      <Tag closable>Tag 2</Tag>
      <Tag closable onClose={preventDefault}>
        Prevent Default
      </Tag>
    </>
  );
}

function CarouselDemo() {
  const contentStyle = {
    height: '160px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
  } as any;
  return (
    <Carousel>
      <div>
        <h3 style={contentStyle}>1</h3>
      </div>
      <div>
        <h3 style={contentStyle}>2</h3>
      </div>
      <div>
        <h3 style={contentStyle}>3</h3>
      </div>
      <div>
        <h3 style={contentStyle}>4</h3>
      </div>
    </Carousel>
  );
}

function PickerDemo() {
  return (
    <Space direction="vertical">
      <DatePicker />
      <TimePicker />
    </Space>
  );
}

function CalendarDemo() {
  return <Calendar />;
}

function BadgeDemo() {
  return (
    <>
      <Badge count={5}>
        <Avatar shape="square" size="large" />
      </Badge>
      <Badge count={0} showZero>
        <Avatar shape="square" size="large" />
      </Badge>
      <Badge count={<ClockCircleOutlined style={{ color: '#f5222d' }} />}>
        <Avatar shape="square" size="large" />
      </Badge>
      <Badge dot>
        <Avatar shape="square" size="large" />
      </Badge>
    </>
  );
}

function RateDemo() {
  return <Rate allowHalf defaultValue={2.5} />;
}

function CardDemo() {
  return (
    <Card
      style={{ width: 300 }}
      cover={<img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />}
      actions={[<SettingOutlined key="setting" />, <EditOutlined key="edit" />, <EllipsisOutlined key="ellipsis" />]}
    >
      <Meta
        avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
        title="Card title"
        description="This is the description"
      />
    </Card>
  );
}

function CommentDemo() {
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [action, setAction] = useState(null);

  const like = () => {
    setLikes(1);
    setDislikes(0);
    setAction('liked');
  };

  const dislike = () => {
    setLikes(0);
    setDislikes(1);
    setAction('disliked');
  };

  const actions = [
    <Tooltip key="comment-basic-like" title="Like">
      <span onClick={like}>
        {React.createElement(action === 'liked' ? LikeFilled : LikeOutlined)}
        <span className="comment-action">{likes}</span>
      </span>
    </Tooltip>,
    <Tooltip key="comment-basic-dislike" title="Dislike">
      <span onClick={dislike}>
        {React.createElement(action === 'disliked' ? DislikeFilled : DislikeOutlined)}
        <span className="comment-action">{dislikes}</span>
      </span>
    </Tooltip>,
    <span key="comment-basic-reply-to">Reply to</span>,
  ];

  return (
    <Comment
      actions={actions}
      author={<a>Han Solo</a>}
      avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" alt="Han Solo" />}
      content={
        <p>
          We supply a series of design principles, practical patterns and high quality design resources (Sketch and
          Axure), to help people create their product prototypes beautifully and efficiently.
        </p>
      }
      datetime="1天前"
    />
  );
}
function TabsDemo() {
  return null;
}
function BackTopDemo() {
  return null;
}
function AvatarDemo() {
  return null;
}
function SwitchDemo() {
  return null;
}
function PaginationDemo() {
  return null;
}
function PageHeaderDemo() {
  return null;
}
function BreadcrumbDemo() {
  return null;
}
function SliderDemo() {
  return null;
}
function TreeDemo() {
  return null;
}
function SkeletonDemo() {
  return null;
}
function TransferDemo() {
  return null;
}
function AlertDemo() {
  return null;
}
function ListDemo() {
  return null;
}
function StatisticDemo() {
  return null;
}
function DrawerDemo() {
  return null;
}
function TimelineDemo() {
  return null;
}
function TypographyDemo() {
  return null;
}
function StepsDemo() {
  return null;
}
function NotificationDemo() {
  return null;
}
function ResultDemo() {
  return null;
}
function ImageDemo() {
  return null;
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
    title: 'Form',
    link: 'https://ant.design/components/form-cn/',
    content: FormDemo,
  },
  {
    title: 'Input',
    link: 'https://ant.design/components/input-cn/',
    content: InputDemo,
  },
  {
    title: 'Mentions',
    link: 'https://ant.design/components/mentions-cn/',
    content: MentionsDemo,
  },
  {
    title: 'Cascader',
    link: 'https://ant.design/components/cascader-cn/',
    content: CascaderDemo,
  },
  {
    title: 'Select',
    link: 'https://ant.design/components/select-cn/',
    content: SelectDemo,
  },
  {
    title: 'Anchor',
    link: 'https://ant.design/components/anchor-cn/',
    content: AnchorDemo,
  },
  {
    title: 'Tooltip',
    link: 'https://ant.design/components/tooltip-cn/',
    content: TooltipDemo,
  },
  {
    title: 'Modal',
    link: 'https://ant.design/components/modal-cn/',
    content: ModalDemo,
  },
  {
    title: 'Progress',
    link: 'https://ant.design/components/progress-cn/',
    content: ProgressDemo,
  },
  {
    title: 'Menu',
    link: 'https://ant.design/components/menu-cn/',
    content: MenuDemo,
  },
  {
    title: 'Spin',
    link: 'https://ant.design/components/spin-cn/',
    content: SpinDemo,
  },
  {
    title: 'Table',
    link: 'https://ant.design/components/table-cn/',
    content: TableDemo,
  },
  {
    title: 'Tag',
    link: 'https://ant.design/components/tag-cn/',
    content: TagDemo,
  },
  {
    title: 'Picker',
    link: 'https://ant.design/components/picker-cn/',
    content: PickerDemo,
  },
  {
    title: 'Calendar',
    link: 'https://ant.design/components/calendar-cn/',
    content: CalendarDemo,
  },
  {
    title: 'Carousel',
    link: 'https://ant.design/components/carousel-cn/',
    content: CarouselDemo,
  },
  {
    title: 'Badge',
    link: 'https://ant.design/components/badge-cn/',
    content: BadgeDemo,
  },
  {
    title: 'Rate',
    link: 'https://ant.design/components/rate-cn/',
    content: RateDemo,
  },
  {
    title: 'Card',
    link: 'https://ant.design/components/card-cn/',
    content: CardDemo,
  },
  {
    title: 'Comment',
    link: 'https://ant.design/components/comment-cn/',
    content: CommentDemo,
  },
  {
    title: 'Tabs',
    link: 'https://ant.design/components/tabs-cn/',
    content: TabsDemo,
  },
  {
    title: 'BackTop',
    link: 'https://ant.design/components/BackTop-cn/',
    content: BackTopDemo,
  },
  {
    title: 'Avatar',
    link: 'https://ant.design/components/avatar-cn/',
    content: AvatarDemo,
  },
  {
    title: 'Switch',
    link: 'https://ant.design/components/switch-cn/',
    content: SwitchDemo,
  },
  {
    title: 'Pagination',
    link: 'https://ant.design/components/pagination-cn/',
    content: PaginationDemo,
  },
  {
    title: 'PageHeader',
    link: 'https://ant.design/components/PageHeader-cn/',
    content: PageHeaderDemo,
  },
  {
    title: 'Breadcrumb',
    link: 'https://ant.design/components/Breadcrumb-cn/',
    content: BreadcrumbDemo,
  },
  {
    title: 'Slider',
    link: 'https://ant.design/components/slider-cn/',
    content: SliderDemo,
  },
  {
    title: 'Tree',
    link: 'https://ant.design/components/tree-cn/',
    content: TreeDemo,
  },
  {
    title: 'Skeleton',
    link: 'https://ant.design/components/skeleton-cn/',
    content: SkeletonDemo,
  },
  {
    title: 'Transfer',
    link: 'https://ant.design/components/transfer-cn/',
    content: TransferDemo,
  },
  {
    title: 'Alert',
    link: 'https://ant.design/components/alert-cn/',
    content: AlertDemo,
  },
  {
    title: 'List',
    link: 'https://ant.design/components/list-cn/',
    content: ListDemo,
  },
  {
    title: 'Statistic',
    link: 'https://ant.design/components/statistic-cn/',
    content: StatisticDemo,
  },
  {
    title: 'Drawer',
    link: 'https://ant.design/components/drawer-cn/',
    content: DrawerDemo,
  },
  {
    title: 'Timeline',
    link: 'https://ant.design/components/timeline-cn/',
    content: TimelineDemo,
  },
  {
    title: 'Typography',
    link: 'https://ant.design/components/typography-cn/',
    content: TypographyDemo,
  },
  {
    title: 'Steps',
    link: 'https://ant.design/components/steps-cn/',
    content: StepsDemo,
  },
  {
    title: 'Notification',
    link: 'https://ant.design/components/notification-cn/',
    content: NotificationDemo,
  },
  {
    title: 'Result',
    link: 'https://ant.design/components/result-cn/',
    content: ResultDemo,
  },
  {
    title: 'Image',
    link: 'https://ant.design/components/image-cn/',
    content: ImageDemo,
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
