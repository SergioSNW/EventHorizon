// webpack.config.json
const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const ESLintReportingPlugin = require('eslint-reporting-webpack-plugin');

module.exports = {
  entry: {
      app: './pr_Juan_src/js/entryPoint.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins: [
    // new BundleAnalyzerPlugin(),
    new ESLintReportingPlugin()
  ]
}
