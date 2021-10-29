import {isEqual} from '../uform/utils';

export function getStructValue(parentValue: { [key: string]: unknown }, struct: string | any[] | { [key: string]: string | any[] }) {
  if (Array.isArray(struct)) {
    return struct.map(key => getStructValue(parentValue, key));
  } else if (typeof struct === 'string') {
    if (parentValue && parentValue[struct] === undefined) {
      parentValue[struct] = null;
    }
    return parentValue && parentValue[struct];
  } else if (typeof struct === 'object') {
    const value = {};
    Object.keys(struct).forEach(key => {
      const destructValue = struct[key];
      if (typeof destructValue === 'string') {
        value[key] = parentValue?.[destructValue];
      } else {
        value[key] = getStructValue(parentValue, destructValue);
      }
    });
    return value;
  } else {
    return parentValue;
  }
}


export function setStructValue(parentValue: { [key: string]: unknown }, struct: string | any[] | { [key: string]: string | any[] },
                               structValue: any) {
  if (typeof struct === 'string') {
    const oldValue = parentValue[struct];
    if (!isEqual(structValue, oldValue)) {
      parentValue[struct] = structValue;
    }
  } else if (Array.isArray(struct)) {
    struct.forEach((key, index) => {
      parentValue[key] = structValue ? structValue[index] : undefined;
    });
  } else if (struct) {
    Object.keys(struct).forEach(key => {
      const destructValue = struct[key];
      if (typeof destructValue === 'string') {
        parentValue[destructValue] = structValue[key];
      } else {
        setStructValue(parentValue, destructValue, structValue[key]);
      }
    });
  }
}
