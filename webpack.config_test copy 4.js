// webpack.config.json
const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const ESLintReportingPlugin = require('eslint-reporting-webpack-plugin');
const SeparaPackCSS = require('mini-css-extract-plugin');
const ReduceSizeCSS = require('css-minimizer-webpack-plugin');

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
    errorDetails: true,
    groupModulesByPath: false,
    groupModulesByExtension: false,
    modulesSpace: 35,
  },
  optimization: {
    // minimize: true,   // flag para Reducir en DEV
    // Ver consideraciones para generar source-map, util en Debug en la pag.
    // ... https://www.npmjs.com/package/css-minimizer-webpack-plugin
    minimizer: [ new ReduceSizeCSS() ],
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /.css$/,
        use: [SeparaPackCSS.loader, 'css-loader']
      }
    ]
  },
  plugins: [
    // new BundleAnalyzerPlugin(),    // Plugin que muestra en el navegador la composicion del pack (ctr+c para salir del terminal)
    // new ESLintReportingPlugin(),   // No veo que haga nada
    new SeparaPackCSS({ filename: '[name].bundle.css' }),
  ]
}
