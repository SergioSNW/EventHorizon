// webpack.config.json
const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const ESLintReportingPlugin = require('eslint-reporting-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// Esta configuracion genera 2 bundles (css+js). El css esta minimizado por el plugin
module.exports = {
  entry: {pack: './pr_Juan_src/js/entryPoint.js', },
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
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      }
    ]
  },
  plugins: [
    // new BundleAnalyzerPlugin(),    // Plugin que muestra en el navegador la composicion del pack (ctr+c para salir del terminal)
    // new ESLintReportingPlugin()     // No veo que haga nada
    new MiniCssExtractPlugin({ filename: '[name].bundle.css' })
  ]
}
