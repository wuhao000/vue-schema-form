module.exports = {
  presets: [
    [
      '@babel/preset-env'
    ],
    [
      '@babel/preset-typescript',   // 引用Typescript插件
      {
        isTSX: true,
        allExtensions: true        // 🔴支持所有文件扩展名
      }
    ]
  ],
  plugins: [
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-transform-runtime',
    'babel-plugin-vue3-jsx-transform'
  ]
};
