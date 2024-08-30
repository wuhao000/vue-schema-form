export const getOptionProperty = function getOptionProperty(option: string | Record<string, unknown>,
                                                            property: string | ((option: Record<string, unknown>) => unknown)): unknown {
  if (typeof option === 'string') {
    return option;
  } else if (typeof property === 'string') {
    return option[property];
  } else if (typeof property === 'function') {
    return property(option);
  }
};