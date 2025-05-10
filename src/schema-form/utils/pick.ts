export const pick = (obj: Record<string, unknown>, keys: string[]): Record<string, unknown> => {
  const result = {};
  keys.forEach(key => {
    if (obj[key] !== undefined) {
      result[key] = obj[key];
    }
  });
  return result;
};
