const parentValue = {
  start: 1,
  end: 2
};

const struct = ['start', 'end'];

function getStructValue(parentValue, struct) {
  if (Array.isArray(struct)) {
    return struct.map(key => getStructValue(parentValue, key));
  } else if (typeof struct === 'string') {
    return parentValue && parentValue[struct];
  } else if (typeof struct === 'object') {
    let value = {};
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

function setStructValue(parentValue, struct, structValue) {
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

function createDefaultValueForFields(fields) {
  const value = {};
  fields.forEach(field => {
    if (field.type === 'object') {
      if (field.array) {
        value[field.property] = [createDefaultValueForFields(field.fields || [])];
      } else {
        value[field.property] = createDefaultValueForFields(field.fields || []);
      }
    } else {
      if (field.array) {
        value[field.property] = [null];
      } else {
        value[field.property] = null;
      }
    }
  });
}

console.log(getStructValue(null, ['start', 'end']));
console.log(getStructValue(parentValue, { startDate: { year: 'start' }, endDate: 'end' }));

setStructValue(parentValue, ['start', 'end'], [3, 4]);
console.log(parentValue);
setStructValue(parentValue, { startDate: { year: 'start' }, endDate: 'end' }, { startDate: { year: 6 }, endDate: 9 });
console.log(parentValue);
