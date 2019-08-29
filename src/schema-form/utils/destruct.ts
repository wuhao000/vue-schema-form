export function getStructValue(parentValue: object, struct: string | any[] | object) {
  if (Array.isArray(struct)) {
    return struct.map(key => getStructValue(parentValue, key));
  } else if (typeof struct === 'string') {
    return parentValue && parentValue[struct];
  } else if (typeof struct === 'object') {
    const value = {};
    Object.keys(struct).forEach(key => {
      const destructValue = struct[key];
      if (typeof destructValue === 'string') {
        value[key] = parentValue && parentValue[destructValue];
      } else {
        value[key] = getStructValue(parentValue, destructValue);
      }
    });
    return value;
  }
}


export function setStructValue(parentValue: object, struct: string | any[] | object, structValue: any) {
  if (typeof struct === 'string') {
    parentValue[struct] = structValue;
  } else if (Array.isArray(struct)) {
    struct.forEach((key, index) => {
      parentValue[key] = structValue[index];
    });
  } else {
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
