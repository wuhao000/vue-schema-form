const hasListener = (instance, listener) => {
  const listeners = instance.$listeners || {};
  return Object.keys(listeners).includes(listener);
};

const hasProp = (instance, prop) => {
  const $options = instance.$options || {};
  const propsData = $options.propsData || {};
  return prop in propsData;
};

export {
  hasProp,
  hasListener
};

export default hasProp;
