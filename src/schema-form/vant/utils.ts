export const createHourOptions = (max: number, suffix: '时' | '分') => {
  const options = [];
  for (let i = 0; i < max; i++) {
    options.push({
      label: i + suffix,
      value: i
    });
  }
  return options;
};