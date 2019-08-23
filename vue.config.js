/**
 * @Author : Duyuntao
 * @Date : 2019/4/2
 * @Version : 1.0
 * @Content : 项目配置文件
 */

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const path = require('path');
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const webpack = require('webpack');
const resolve = dir => {
  return path.join(__dirname, dir);
};
// 需要gzip压缩的文件后缀
const productionGzipExtensions = ['js', 'css'];
const analyze = false;
module.exports = {
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  },
  runtimeCompiler: false,
  configureWebpack: (config) => {
    config.output.libraryExport = 'default';
    config.module.rules.push({
      test: /\.md$/,
      use: [
        {
          loader: 'html-loader'
        },
        {
          loader: 'markdown-loader',
          options: {}
        }
      ]
    });
    config.plugins.push(
        new CompressionWebpackPlugin({
          test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
          threshold: 1024 * 30, // 30K
          minRatio: 0.8,
          exclude: /node_modules/
        })
    );
    config.externals = {
      'vue': 'Vue',
      'moment': 'moment'
    };
    if (analyze) {
      config.plugins.push(new BundleAnalyzerPlugin({
        generateStatsFile: true,
        statsOptions: {
          source: true
        }
      }));
    }
  },
  chainWebpack: config => {
    config.resolve.alias
        .set('@', resolve('src'))
        .set('_p', resolve('packages'))
        .set('_t', resolve('types'));
  }
};
