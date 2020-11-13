const  transformJsx = require('./plugins/transform-jsx')

module.exports = {
  presets: [
    [
      '@babel/preset-env',
    ],
    [
      '@babel/preset-typescript',   // 引用Typescript插件
      {
        isTSX: true,
        allExtensions: true,        // 🔴支持所有文件扩展名
      },
    ]
  ],
  plugins: [
    transformJsx,
  ]
}
