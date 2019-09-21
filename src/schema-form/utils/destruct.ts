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
  } else {
    return parentValue;
  }
}


export function setStructValue(parentValue: object, struct: string | any[] | object,
                               structValue: any, vue) {
  if (typeof struct === 'string') {
    if (parentValue[struct] === undefined) {
      vue.$set(parentValue, struct, structValue);
    } else {
      parentValue[struct] = structValue;
    }
  } else if (Array.isArray(struct)) {
    struct.forEach((key, index) => {
      if (parentValue[key] === undefined) {
        vue.$set(parentValue, key, structValue[index]);
      } else {
        parentValue[key] = structValue[index];
      }
    });
  } else if (struct) {
    Object.keys(struct).forEach(key => {
      const destructValue = struct[key];
      if (typeof destructValue === 'string') {
        if (parentValue[destructValue] === undefined) {
          vue.$set(parentValue, destructValue, structValue[key]);
        } else {
          parentValue[destructValue] = structValue[key];
        }
      } else {
        setStructValue(parentValue, destructValue, structValue[key], vue);
      }
    });
  }
}
