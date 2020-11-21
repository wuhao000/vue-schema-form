var hasListener = function hasListener(instance, listener) {
  var listeners = instance.$listeners || {};
  return Object.keys(listeners).includes(listener);
};

var hasProp = function hasProp(instance, prop) {
  var $options = instance.$options || {};
  var propsData = $options.propsData || {};
  return prop in propsData;
};

export { hasProp, hasListener };
export default hasProp;