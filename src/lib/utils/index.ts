import { camelCase, upperFirst } from 'lodash';
import { CONTROL_DATA_TYPE } from '../../constants';
import { ArgTypes } from '../../interface';
import descMap from '../antd-helper/lessValueDesc';

const modules = [
  'link',
  'border',
  'outline',
  'disabled',
  'shadow',
  'checkbox',
  'descriptions',
  'divider',
  'dropdown',
  'empty',
  'radio',
  'screen',
  'layout',
  'zindex',
  'animation',
  'dropdown',
  'form',
  'input',
  'mentions',
  'select',
  'cascader',
  'anchor',
  'tooltip',
  'popover',
  'modal',
  'progress',
  'menu',
  'spin',
  'table',
  'tag',
  'picker',
  'calendar',
  'carousel',
  'badge',
  'rate',
  'card',
  'comment',
  'tabs',
  'back-top',
  'avatar',
  'switch',
  'pagination',
  'page-header',
  'breadcrumb',
  'slider',
  'tree',
  'collapse',
  'skeleton',
  'transfer',
  'alert',
  'list',
  'statistic',
  'drawer',
  'timeline',
  'typography',
  'steps',
  'notification',
  'result',
  'image',
];

const categoryOrder = [
  'Buttons',
  'Typography',
  'Layout',
  'Breadcrumb',
  'Dropdown',
  'Menu',
  'PageHeader',
  'Pagination',
  'Steps',
  'Cascader',
  'Checkbox',
  'Picker',
  'Form',
  'Input',
  'Mentions',
  'Radio',
  'Rate',
  'Select',
  'Slider',
  'Switch',
  'Transfer',
  'Anchor',
  'Badge',
  'Calendar',
  'Card',
  'Carousel',
  'Collapse',
  'Comment',
  'Descriptions',
  'Empty',
  'Image',
  'List',
  'Link',
  'Popover',
  'Statistic',
  'Table',
  'Tabs',
  'Tag',
  'Timeline',
  'Tooltip',
  'Tree',
  'Alert',
  'Drawer',
  'Modal',
  'Notification',
  'Progress',
  'Result',
  'Skeleton',
  'Spin',
  'Avatar',
  'BackTop',
];

const moduleReg = new RegExp(`^(${modules.join('|')})`);

const alias: { [key: string]: any } = {
  ease: 'Animation',
  'box-shadow-base': 'Shadow',
  btn: 'Buttons',
  'label-required-color': 'Form',
  'label-color': 'Form',
  'process-tail-color': 'Steps',
};

const aliasReg = new RegExp(`^(${Object.keys(alias).join('|')})`);

const colorReg =
  /^(rgb\s*?\(\s*?(000|0?\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\s*?,\s*?(000|0?\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\s*?,\s*?(000|0?\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\s*?\))$|^(rgba\s*?\(\s*?(000|0?\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\s*?,\s*?(000|0?\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\s*?,\s*?(000|0?\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\s*?,\s*?(0|0\.\d*|1|1.0*)\s*?\))$|^(transparent)$|^(#([a-fA-F0-9]){3})$|^(#([a-fA-F0-9]){6}$)|(^hsl\s*?\(\s*?(000|0?\d{1,2}|[1-2]\d\d|3[0-5]\d|360)\s*?,\s*?(000|100|0?\d{2}|0?0?\d)%\s*?,\s*?(000|100|0?\d{2}|0?0?\d)%\s*?\)$)|(^hsla\s*?\(\s*?(000|0?\d{1,2}|[1-2]\d\d|3[0-5]\d|360)\s*?,\s*?(000|100|0?\d{2}|0?0?\d)%\s*?,\s*?(000|100|0?\d{2}|0?0?\d)%\s*?,\s*?(0|0\.\d*|1|1.0*)\s*?\)$)$/;

// 由plain对象生成control args
export class LessArgGenerator {
  vars: { [key: string]: any };
  hints: ArgTypes = {};
  args: { [key: string]: any } = {};
  constructor(vars: {}) {
    this.vars = vars;
    this.copyToHints();
    this.analyseVars();
  }

  copyToHints() {
    for (const [key, value] of Object.entries(this.vars)) {
      this.hints[key] = { name: key, value };
    }
  }

  // 名字匹配器解析出分类，值匹配器解决出类型
  analyseVars() {
    const handlers: Array<(key: string, value: any) => void> = [];
    function use(handler: (key: string, value: any) => void) {
      handlers.push(handler);
    }

    use((key) => {
      const m = key.match(aliasReg);
      if (m) {
        this.hints[key].category = alias[m[1]];
      }
    });

    use((key) => {
      const m = key.match(moduleReg);
      if (m) {
        const subject = upperFirst(camelCase(m[1]));
        this.hints[key].category = subject;
      }
    });

    use((key, value) => {
      const m = value.match(colorReg);
      if (m) {
        this.hints[key].type = 'color';
      } else {
        this.hints[key].type = 'text';
      }
    });

    use((key, value) => {
      this.hints[key].desc = (descMap as { [key: string]: any })[key];
      this.hints[key].category = this.hints[key].category || 'Global';
    });

    for (const [key, value] of Object.entries(this.vars)) {
      for (const fn of handlers) {
        fn(key, value);
      }
    }

    this.sortCategory();

    for (const [key, value] of Object.entries(this.hints)) {
      this.args[key] = this.createArg(
        key,
        value.type,
        value.value,
        (descMap as { [key: string]: any })[key],
        value.category
      );
    }
  }

  sortCategory() {
    const allKeys = Object.keys(this.hints);
    allKeys.sort((a, b) => {
      a = this.hints[a].category;
      b = this.hints[b].category;
      if (a === b) return 0;
      return categoryOrder.indexOf(a) - categoryOrder.indexOf(b);
    });
    const sortedHints = {} as any;
    allKeys.forEach((key) => {
      sortedHints[key] = this.hints[key];
    });
    this.hints = sortedHints;
  }

  createArg(name: string, controlType: string, defaultValue: any, description = '', category = 'Global') {
    return {
      name,
      type: { name: CONTROL_DATA_TYPE[controlType], required: false },
      defaultValue,
      description,
      table: {
        type: { summary: CONTROL_DATA_TYPE[controlType] },
        defaultValue: { summary: defaultValue },
        subcategory: category,
      },
      control: {
        type: controlType,
      },
    };
  }
}

export function filtered(filteredKeys: string[], raw: Record<string, any>) {
  return filteredKeys.reduce((obj, key) => ({ ...obj, [key]: raw[key] }), {});
}
