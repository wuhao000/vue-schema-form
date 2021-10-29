import {ILibComponents, Platform, SchemaFormComponentOptions} from '../../../types';
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
  Upload = 'upload',
  DateRange = 'daterange',
  Url = 'url',
  String = 'string',
  Datetime = 'datetime',
  Year = 'year',
  Month = 'month',
  Time = 'time',
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

export const resolveOptions = (field: FieldDefinition) => {
  if (field.enum) {
    if (field.props.options) {
      return field.props.options;
    }
    if (typeof field.enum === 'function') {
      const result = field.enum();
      if (Array.isArray(result)) {
        return result;
      } else if (result.then) {
        result.then(data => {
          field.props.options = data;
        });
        return [];
      }
    } else if (typeof field.enum === 'object' && field.enum['then']) {
      field.enum['then'](data => {
        field.props.options = data;
      });
      return [];
    }
    return field.enum;
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


export const getFormComponent = (platform: Platform) => {
  return LibComponents.form[platform];
};

export const getRowComponent = (platform: Platform) => {
  return LibComponents.row[platform];
};

export const getColComponent = (platform: Platform) => {
  return LibComponents.col[platform];
};

export const getLayoutComponent = (platform: Platform) => {
  return LibComponents.layout[platform];
};

export const getSiderComponent = (platform: Platform) => {
  return LibComponents.sider[platform];
};

export const getContentComponent = (platform: Platform) => {
  return LibComponents.content[platform];
};

export const getButtonComponent = (platform: Platform) => {
  return LibComponents.button[platform];
};

export const getAlertComponent = (platform: Platform) => {
  return LibComponents.alert[platform];
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

export function addRule(rules: any, field: FieldDefinition, rule: any) {
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
    const options = resolveOptions(field);
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
}

export const isNull = (value: any) => {
  return value === undefined || value === null;
};

export const isNotNull = (value: any) => {
  return !isNull(value);
};


export const fixComponentDefinition = (value: SchemaFormComponentOptions | SchemaFormComponentOptions[], forDisplay: boolean) => {
  let options = null;
  if (Array.isArray(value)) {
    options = value.find(it => it.forDisplay === forDisplay);
  } else {
    options = value;
  }
  const forArray = options.forArray !== undefined ? options.forArray : null;
  const getProps = options.getProps || (() => ({}));
  return {
    component: options.component,
    platform: options.platforms as Platform,
    type: options.types as string,
    forArray,
    forInput: options.forInput ?? true,
    layoutOptions: options.layoutOptions,
    valueProp: options.valueProp || 'value',
    wrap: options.wrap,
    layout: options.layout,
    getProps: (definition: FieldDefinition) => {
      const props: any = getProps(definition, options.platforms) || {};
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
