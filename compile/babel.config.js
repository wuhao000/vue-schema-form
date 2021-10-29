const modules = false;

module.exports = function(api) {

  api && api.cache(false);

  return {
    plugins: [
      ['@babel/plugin-transform-typescript', {
        isTSX: true,
      }],
      ['@vue/babel-plugin-jsx', { mergeProps: false, enableObjectSlots: false }],
      '@babel/plugin-proposal-nullish-coalescing-operator',
      '@babel/plugin-proposal-optional-chaining',
      '@babel/plugin-transform-object-assign',
      '@babel/plugin-proposal-object-rest-spread',
      '@babel/plugin-proposal-export-default-from',
      '@babel/plugin-proposal-export-namespace-from',
      '@babel/plugin-proposal-class-properties',
      '@babel/plugin-syntax-dynamic-import'
    ]
  };
};
