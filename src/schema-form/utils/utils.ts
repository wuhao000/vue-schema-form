import {isVNode, VNode} from 'vue';
import {
  ILibComponents,
  Platform,
  SchemaFormComponent,
  SchemaFormComponentOptions,
  SchemaFormField
} from '../../../types';
import {FieldDefinition} from '../internal/utils';

export const ASchemaForm = 'ASchemaForm';

export enum Mode {
  Edit = 'edit',
  Display = 'display'
}

export enum FieldTypes {
  Grid = 'grid',
  File = 'file',
  Checkbox = 'checkbox',
  Picture = 'picture',
  Button = 'button',
  Cascader = 'cascader',
  Transfer = 'transfer',
  Rate = 'rate',
  DateRange = 'daterange',
  Url = 'url',
  String = 'string',
  Datetime = 'datetime',
  Year = 'year',
  Month = 'month',
  Time = 'time',
  Html = 'html',
  Select = 'select',
  Date = 'date',
  DateTimeRange = 'datetimerange',
  Integer = 'integer',
  Number = 'number',
  Double = 'double',
  Boolean = 'boolean',
  ExpandSelect = 'expand-select',
  Range = 'range',
  Empty = 'empty',
  Text = 'text',
  Object = 'object',
  Password = 'password',
  TimeRange = 'timerange',
  AutoComplete = 'autocomplete',
}

export const DESKTOP = 'desktop';
export const MOBILE = 'mobile';


export function swap(array, x, y) {
  array.splice(x, 1, ...array.splice(y, 1, array[x]));
}

export const registerMobileLib = (map: Record<keyof ILibComponents, any>) => {
  Object.keys(map).forEach(key => {
    LibComponents[key].mobile = map[key];
  });
};

export const registerDesktopLib = (map: Record<keyof ILibComponents, any>) => {
  Object.keys(map).forEach(key => {

    if (!LibComponents[key]) {
      throw new Error(`没有${key}`);
    }
    LibComponents[key].desktop = map[key];
  });
};


export const LibComponents: ILibComponents = {
  result: {
    desktop: null,
    mobile: null
  },
  popup: {
    desktop: null,
    mobile: null
  },
  icons: {
    desktop: null,
    mobile: null
  },
  alert: {
    desktop: null,
    mobile: null
  },
  button: {
    desktop: null,
    mobile: null
  },
  col: {
    desktop: null,
    mobile: null
  },
  content: {
    desktop: null,
    mobile: null
  },
  footer: {
    desktop: null,
    mobile: null
  },
  form: {
    desktop: null,
    mobile: null
  },
  formItem: {
    desktop: null,
    mobile: null
  },
  header: {
    desktop: null,
    mobile: null
  },
  layout: {
    desktop: null,
    mobile: null
  },
  popover: {
    desktop: null,
    mobile: null
  },
  row: {
    desktop: null,
    mobile: null
  },
  sider: {
    desktop: null,
    mobile: null
  },
  checkbox: {
    desktop: null,
    mobile: null
  },
  card: {
    desktop: null,
    mobile: null
  },
  empty: {
    desktop: null,
    mobile: null
  },
  select: {
    desktop: null,
    mobile: null
  },
  input: {
    desktop: null,
    mobile: null
  }
};

export const resolveTitle = (definition: SchemaFormField,
                             formValue: any,
                             field: FieldDefinition): string | VNode | VNode[] | undefined => {
  if (isNull(definition.title)) {
    return undefined;
  }
  if (typeof definition.title === 'string' || isVNode(definition.title)) {
    return definition.title;
  } else if (typeof definition.title === 'function') {
    return definition.title(formValue, field);
  } else {
    return definition.title;
  }
};

export const resolveOptions = (field: FieldDefinition, formValue: any) => {
  const fieldEnum = field.enum;
  if (isNull(field.enum)) {
    return undefined;
  }
  if (fieldEnum) {
    if (field.props.options) {
      return field.props.options;
    }
    if (typeof fieldEnum === 'function') {
      const result = fieldEnum(formValue, field);
      if (Array.isArray(result)) {
        return result;
      } else if (result.then) {
        result.then(data => {
          field.props.options = data;
        });
        return [];
      }
    } else if (typeof fieldEnum === 'object' && fieldEnum['then']) {
      fieldEnum['then'](data => {
        field.props.options = data;
      });
      return [];
    }
    return fieldEnum;
  }
  if (field.props?.options) {
    if (typeof field.props.options === 'function') {
      return field.props.options() || [];
    } else if (typeof field.props.options === 'object') {
      return field.props.options || [];
    }
  } else {
    return [];
  }
};

export const getDefaultValue = (field: FieldDefinition) => {
  if (!field.slot && field.getComponent().getDefaultValue !== undefined) {
    return field.getComponent().getDefaultValue(field);
  }
  if (isNotNull(field.default)) {
    return field.default;
  }
  if (field.type === FieldTypes.Transfer) {
    return [];
  } else if (field.type === FieldTypes.Range) {
    return [0, 0];
  } else if (typeof field.destructPath.destruct !== 'string') {
    return null;
  } else if (field.type === FieldTypes.Object) {
    if (field.array) {
      return [{}];
    } else {
      return {};
    }
  } else {
    return field.array ? [] : null;
  }
};


export const getFormComponent = (platform: Platform) => LibComponents.form[platform];

export const getRowComponent = (platform: Platform) => LibComponents.row[platform];

export const getColComponent = (platform: Platform) => LibComponents.col[platform];

export const getLayoutComponent = (platform: Platform) => LibComponents.layout[platform];

export const getSiderComponent = (platform: Platform) => LibComponents.sider[platform];

export const getContentComponent = (platform: Platform) => LibComponents.content[platform];

export const getButtonComponent = (platform: Platform) => LibComponents.button[platform];

export const getAlertComponent = (platform: Platform) => LibComponents.alert[platform];

export const getOptionProperty = function getOptionProperty(option: any, property: string | ((option: any) => any)): any {
  if (typeof option === 'string') {
    return option;
  } else if (typeof property === 'string') {
    return option[property];
  } else if (typeof property === 'function') {
    return property(option);
  }
};

export const addRule = (rules: any, field: FieldDefinition, rule: any) => {
  const type = field.type;
  let validateType = 'string';
  if (field.array) {
    validateType = 'array';
  } else if (type === 'number') {
    validateType = 'number';
  } else if (type === FieldTypes.Integer) {
    validateType = 'number';
  } else if (type === FieldTypes.Double) {
    validateType = 'number';
  } else if (type === FieldTypes.Object) {
    validateType = 'object';
  } else if (type === FieldTypes.Date || type === FieldTypes.Datetime || type === FieldTypes.Year || type === FieldTypes.Month) {
    validateType = 'date';
  } else if (type === FieldTypes.Select || type === FieldTypes.ExpandSelect) {
    const options = field.options;
    if (options.length) {
      validateType = typeof getOptionProperty(options[0], field.props && field.props.valueProperty || 'value');
    }
  } else if (type === FieldTypes.DateRange || type === FieldTypes.DateTimeRange) {
    validateType = 'array';
  }
  rule.type = validateType;
  if (type === FieldTypes.Url) {
    rule.format = 'url';
  }
  rules.push(rule);
};

export const isNull = (value: any) => value === undefined || value === null;

export const isNotNull = (value: any) => !isNull(value);

export const fixComponentDefinition = (value: SchemaFormComponentOptions | SchemaFormComponentOptions[],
                                       forDisplay: boolean): SchemaFormComponent => {

  let options: SchemaFormComponentOptions = null;
  if (Array.isArray(value)) {
    if (forDisplay) {
      options = value.find(it => it.mode === 'display' || it.mode === 'both');
    } else {
      options = value.find(it => it.mode === 'input');
    }
  } else {
    options = value;
  }
  return {
    component: options.component,
    platform: options.platforms as Platform,
    mode: options.mode || 'input',
    arrayMode: options.arrayMode,
    layoutOptions: options.layoutOptions,
    valueProp: options.valueProp || 'value',
    wrap: options.wrap,
    getProps: (definition: FieldDefinition, platform) => {
      const getProps = options.getProps || (() => ({}));
      const props: any = getProps(definition, platform) || {};
      if (definition.title && options.platforms === MOBILE && !props.labelNumber) {
        props.labelNumber = typeof definition.title === 'string' ? (definition.title.length > 7 ? 7 : definition.title.length) : 7;
      }
      if (definition.props) {
        Object.assign(props, definition.props);
      }
      return props;
    }
  };
};


export const uuid = () => {
  const s = [];
  const hexDigits = '0123456789abcdef';
  for (let i = 0; i < 36; i++) {
    s[i] = hexDigits.substring(Math.floor(Math.random() * 0x10), 1);
  }
  s[14] = '4';  // bits 12-15 of the time_hi_and_version field to 0010
  s[19] = hexDigits.substring((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
  s[8] = s[13] = s[18] = s[23] = '-';
  return s.join('');
};
