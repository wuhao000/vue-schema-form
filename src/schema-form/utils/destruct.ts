import {getDefaultValue} from './utils';
import {IField} from 'types';

export function getStructValue(parentValue: object,
                               struct: string | any[] | object,
                               vue: any,
                               field: IField = null) {
  if (Array.isArray(struct)) {
    return struct.map(key => getStructValue(parentValue, key, vue));
  } else if (typeof struct === 'string') {
    const v = parentValue && parentValue[struct];
    if (v === undefined && field) {
      const defaultValue = getDefaultValue(field);
      vue.$set(parentValue, struct, defaultValue);
      return defaultValue;
    }
    return v;
  } else if (typeof struct === 'object') {
    const value = {};
    Object.keys(struct).forEach(key => {
      const destructValue = struct[key];
      if (typeof destructValue === 'string') {
        value[key] = parentValue?.[destructValue];
      } else {
        value[key] = getStructValue(parentValue, destructValue, vue);
      }
    });
    return value;
  } else {
    return parentValue;
  }
}


export function setStructValue(parentValue: object, struct: string | any[] | object,
                               structValue: any, vue) {
  if (typeof struct === 'string') {
    vue.$set(parentValue, struct, structValue);
  } else if (Array.isArray(struct)) {
    struct.forEach((key, index) => {
      vue.$set(parentValue, key, structValue ? structValue[index] : undefined);
    });
  } else if (struct) {
    Object.keys(struct).forEach(key => {
      const destructValue = struct[key];
      if (typeof destructValue === 'string') {
        vue.$set(parentValue, destructValue, structValue[key]);
      } else {
        setStructValue(parentValue, destructValue, structValue[key], vue);
      }
    });
  }
}
