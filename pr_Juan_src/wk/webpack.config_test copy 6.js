// webpack.config.json
const path = require('path');
const SeparaPackCSS = require('mini-css-extract-plugin');
const ReduceSizeCSS = require('css-minimizer-webpack-plugin');
const ComprimePacks = require('compression-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const ESLintReportingPlugin = require('eslint-reporting-webpack-plugin');

// Esta configuracion genera 2 bundles (css+js). El css esta minimizado por el plugin
module.exports = {
  entry: {pack: './pr_Juan_src/js/entryPoint.js', },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
  },
  stats: {
    // preset: 'normal',         // Report normal 
    // preset: 'all', 
    preset: 'verbose',       // Para report muy detallado
    groupModulesByPath: false,
    groupModulesByExtension: false,
    outputPath: true,
    modulesSpace: 35,
    assets: true,
    orphanModules: true,
  },
  mode: 'development',
  // mode: 'production',
  optimization: {
    // minimize: true,   // flag para Reducir en DEV
    // Ver consideraciones para generar source-map, util en Debug en la pag.
    // ... https://www.npmjs.com/package/css-minimizer-webpack-plugin
    minimizer: [ new ReduceSizeCSS() ],
  },
  module: {
    rules: [
      {
        test: /\.(c|sc|sa)ss$/,
        use: [
          SeparaPackCSS.loader,
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  },
  plugins: [
    // new BundleAnalyzerPlugin(),    // Plugin que muestra en el navegador la composicion del pack (ctr+c para salir del terminal)
    // new ESLintReportingPlugin()     // No veo que haga nada
    new SeparaPackCSS({ filename: '[name].bundle.css' }),
    new ComprimePacks(),
    new HTMLWebpackPlugin(),    // Genera dist/index.html que referencia los packs generados
    // {
    //   filename: './pr_Juan_src/htmlOut.html',     // fich.salida
      // template: './pr_Juan_src/pr.html',     // fich.entrada/template
  // })
  ]
}
