import camelCase from 'camel-case';
export { camelCase };
export var lowercase = function lowercase(str) {
  return String(str || '').toLowerCase();
};