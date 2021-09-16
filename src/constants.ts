export const ADDON_ID = 'storybook/antd_theme_addon';
export const TOOL_ID = `${ADDON_ID}/tool`;
export const PANEL_ID = `${ADDON_ID}/panel`;
export const TAB_ID = `${ADDON_ID}/tab`;
export const PARAM_KEY = 'myAddonParameter';
export const EVENT_EXPORT_JS = 'event_export_js';
export const TRIGGER_EXPORT_JS = 'trigger_export_js';
export const EVENT_EXPORT_LESS = 'event_export_less';
export const TRIGGER_EXPORT_LESS = 'trigger_export_less';
export const EVENT_CHANGE_LESS = 'event_change_less';
export const EVENT_RESET_LESS = 'event_reset_less';

export const EVENTS = {
  RESULT: `${ADDON_ID}/result`,
  REQUEST: `${ADDON_ID}/request`,
  CLEAR: `${ADDON_ID}/clear`,
};

export const CONTROL_DATA_TYPE: { [key: string]: string } = {
  boolean: 'boolean',
  number: 'number',
  range: 'number',
  radio: 'enum',
  'inline-radio': 'enum',
  check: 'enum',
  'inline-check': 'enum',
  select: 'enum',
  'multi-select': 'enum',
  text: 'string',
  color: 'string',
  date: 'string',
};
