export const part = <T>(obj: T, fields: Array<keyof T>): { [key in keyof T]?: unknown; } => {
  type keys = keyof T;
  const newObj: { [key in keys]?: unknown } = {};

  fields.forEach(key => {
    newObj[key] = obj[key];
  });

  return newObj;
};

export const values = (obj: any) => {
  return Object.keys(obj).map(key => obj[key]);
};
