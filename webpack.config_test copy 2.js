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
  stats: {
    // preset: 'verbose',       // Para report muy detallado
    preset: 'normal',         // Report normal  
    groupModulesByPath: false,
    groupModulesByExtension: false,
    outputPath: true,
    modulesSpace: 35,
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
    // new BundleAnalyzerPlugin(),    // Plugin que muestra en el navegador la composicion del pack (ctr+c para salir del terminal)
    new ESLintReportingPlugin()
  ]
}
