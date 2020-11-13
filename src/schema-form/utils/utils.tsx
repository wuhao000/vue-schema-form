import {IField, ILibComponents, Platform} from 'v-schema-form-types';

export const ASchemaForm = 'ASchemaForm';

export enum Mode {
  edit = 'edit',
  display = 'display'
}

export enum TYPES {
  file = 'file',
  checkbox = 'checkbox',
  picture = 'picture',
  button = 'button',
  cascader = 'cascader',
  transfer = 'transfer',
  rate = 'rate',
  upload = 'upload',
  daterange = 'daterange',
  url = 'url',
  string = 'string',
  datetime = 'datetime',
  year = 'year',
  month = 'month',
  time = 'time',
  select = 'select',
  date = 'date',
  datetimerange = 'datetimerange',
  integer = 'integer',
  number = 'number',
  double = 'double',
  boolean = 'boolean',
  expandSelect = 'expand-select',
  range = 'range',
  empty = 'empty',
  text = 'text',
  object = 'object',
  plain = 'plain',
}

export const DESKTOP = 'desktop';
export const MOBILE = 'mobile';


export const ComponentMap = {
  checkbox: {
    element: 'el-checkbox',
    antd: 'd-checkbox',
    antdm: 'm-checkbox-item',
    vant: 'van-checkbox'
  },
  button: {
    element: 'el-button',
    antd: 'd-button',
    antdm: 'm-button',
    vant: 'van-button'
  },
  row: {
    element: 'el-row',
    antd: 'd-row'
  },
  col: {
    element: 'el-col',
    antd: 'd-col'
  },
  form: {
    element: 'el-form',
    antd: 'd-form',
    antdm: 'm-list',
    vant: 'van-form'
  },
  formItem: {
    element: 'el-form-item',
    antd: 'd-form-item',
    antdm: 'm-list-item',
    vant: 'van-cell'
  },
  alert: {
    element: 'el-alert',
    antd: 'a-alert'
  },
  layout: {
    element: 'el-container',
    antd: 'd-layout'
  },
  header: {
    element: 'el-header',
    antd: 'd-layout-header'
  },
  footer: {
    element: 'el-footer',
    antd: 'd-layout-footer'
  },
  sider: {
    element: 'el-aside',
    antd: 'd-layout-sider'
  },
  content: {
    element: 'el-main',
    antd: 'd-layout-content'
  },
  icon: {
    element: 'el-ext-icon',
    antd: 'd-icon'
  },
  popover: {
    element: 'el-popover',
    antd: 'a-popover'
  },
  icons: {
    element: {
      info: 'info',
      up: 'arrow-up',
      down: 'arrow-down'
    },
    antd: {
      info: 'info-circle',
      up: 'up',
      down: 'down'
    }
  }
};

export function swap(array, x, y) {
  array.splice(x, 1, ...array.splice(y, 1, array[x]));
}

export const LibName = {
  desktop: 'antd',
  mobile: 'antdm'
};

export const MobileLibComponents: ILibComponents = {
  icons: null,
  alert: null,
  button: null,
  col: null,
  confirm: null,
  content: null,
  footer: null,
  form: null,
  formItem: null,
  header: null,
  icon: null,
  layout: null,
  popover: null,
  row: null,
  sider: null
};

export const LibComponents: ILibComponents = {
  icons: null,
  alert: null,
  button: null,
  col: null,
  confirm: null,
  content: null,
  footer: null,
  form: null,
  formItem: null,
  header: null,
  icon: null,
  layout: null,
  popover: null,
  row: null,
  sider: null
};

export const getOptions = (field: IField) => {
  if (field.enum) {
    return field.enum;
  }
  if (field.props && field.props.options) {
    if (typeof field.props.options === 'function') {
      return field.props.options() || [];
    } else if (typeof field.props.options === 'object') {
      return field.props.options || [];
    }
  } else {
    return [];
  }
};

export const getDefaultValue = (field: IField) => {
  if (field.component.getDefaultValue !== undefined) {
    return field.component.getDefaultValue(field);
  }
  if (field.type === TYPES.transfer) {
    return [];
  } else if (field.type === TYPES.range) {
    return [0, 0];
  } else if (typeof field.destructPath!.destruct !== 'string') {
    return null;
  } else if (field.type === TYPES.object) {
    if (field.array) {
      return [{}];
    } else {
      return {};
    }
  } else {
    return field.array ? [] : null;
  }
};


export const getFormComponent = (platform: Platform) => {
  return platform === DESKTOP ? LibComponents.form : MobileLibComponents.form;
};

export const getRowComponent = () => {
  return LibComponents.row;
};

export const getColComponent = () => {
  return LibComponents.col;
};

export const getButtonComponent = () => {
  return LibComponents.button;
};

export const getAlertComponent = () => {
  return LibComponents.alert;
};

export const getOptionProperty = function getOptionProperty(option: any, property: string | ((option: any) => any)): any {
  if (typeof option === 'string') {
    return option;
  } else if (typeof property === 'string') {
    return option[property];
  } else if (typeof property === 'function') {
    return property(option);
  }
};

export function addRule(rules: any, field: IField, rule: any) {
  const type = field.type as any;
  let validateType = 'string';
  if (field.array) {
    validateType = 'array';
  } else if (type === 'number') {
    validateType = 'number';
  } else if (type === TYPES.integer) {
    validateType = 'number';
  } else if (type === TYPES.double) {
    validateType = 'number';
  } else if (type === TYPES.object) {
    validateType = 'object';
  } else if (type === TYPES.date || type === TYPES.datetime || type === TYPES.year || type === TYPES.month) {
    validateType = 'date';
  } else if (type === TYPES.select || type === TYPES.expandSelect) {
    const options = getOptions(field);
    if (options.length) {
      validateType = typeof getOptionProperty(options[0], field.props && field.props.valueProperty || 'value');
    }
  } else if (type === TYPES.daterange || type === TYPES.datetimerange) {
    validateType = 'array';
  }
  rule.type = validateType;
  rules.push(rule);
}

export const getConfirmFunction = (platform: Platform) => {
  // @ts-ignore
  return platform === 'mobile' ? antdm.Modal.confirm : LibComponents.confirm;
};

export const isNull = (value: any) => {
  return value === undefined || value === null;
};

export const isNotNull = (value: any) => {
  return !isNull(value);
};
