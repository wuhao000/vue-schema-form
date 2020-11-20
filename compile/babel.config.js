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
      [
        '@babel/preset-env',
        {
          modules: useESModules ? false : 'commonjs'
        }
      ],
      '@babel/preset-typescript'
    ],
    plugins: [
      ['@babel/plugin-proposal-decorators', { 'legacy': true }],
      [
        '@babel/plugin-transform-runtime',
        {
          corejs: false,
          useESModules
        }
      ],
      [
        'import',
        {
          libraryName: 'vant',
          libraryDirectory: useESModules ? 'es' : 'lib',
          style: true
        },
        'vant'
      ],
      '@vue/babel-plugin-jsx',
      '@babel/plugin-transform-object-assign',
      '@babel/plugin-proposal-nullish-coalescing-operator',
      '@babel/plugin-proposal-optional-chaining',
      'transform-class-properties'
    ]
  };
};
