module.exports = function(api) {
  const { BABEL_MODULE, NODE_ENV } = process.env;
  const useESModules = BABEL_MODULE !== 'commonjs' && NODE_ENV !== 'test';
  api && api.cache(false);
  return {
    presets: [
      ['@vue/app', {
        useBuiltIns: false,
        targets: {
          browsers: [
            'Chrome >= 54',
            'IE >= 9',
            'Safari >= 10.1',
            'iOS >= 10.3',
            'Firefox >= 54',
            'Edge >= 15'
          ]
        },
        modules: false,
        loose: true
      }],
      '@babel/preset-typescript'
    ],
    plugins: [
      ['module-resolver', {
        'root': './es',
        'alias': {
          '@': './es',
          'utils': './es/utils'
        }
      }],
      ['@babel/plugin-proposal-decorators', { legacy: true }],
      ['@babel/plugin-proposal-class-properties', { 'loose': false }],
      '@babel/plugin-transform-object-assign',
      '@babel/plugin-proposal-nullish-coalescing-operator',
      '@babel/plugin-proposal-optional-chaining'
    ]
  };
};
