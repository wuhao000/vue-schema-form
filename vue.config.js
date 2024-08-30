const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const analyze = false;

module.exports = {
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          javascriptEnabled: true
        }
      }
    }
  },
  configureWebpack: (config) => {
    // config.externals = {
    //   'vue': 'Vue',
    //   'lodash': '_',
    //   dayjs: 'dayjs',
    //   'ant-design-vue': 'antd',
    //   'antd-mobile-vue-next': 'antdm',
    //   '@ant-design/icons-vue': 'anticons'
    // };
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
    config.module.rules.push({
      test: /\.txt$/,
      use: [
        { loader: 'raw-loader' },
        { loader: 'decoded-text-loader' }
      ]
    });
    if (analyze) {
      config.plugins.push(new BundleAnalyzerPlugin({
        generateStatsFile: true,
        statsOptions: {
          source: true
        }
      }));
    }
  }
};
