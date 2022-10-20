// webpack.config.json
const path = require('path');
const SeparaPackCSS = require('mini-css-extract-plugin');
const ReduceSizeCSS = require('css-minimizer-webpack-plugin');
const ComprimePacks = require('compression-webpack-plugin');
const HTMLWebpackPlugin  = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

// Esta configuracion genera 2 bundles (css+js). El css esta minimizado por el plugin
module.exports = {
  // Tengo que hacer reajustes del direccionamiento para pasarlo a src
  // entry: {pack: './src/js/entryPoint.js'},
  entry: {pack: './pr_Juan_src/js/entryPoint.js'},
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
  },
  output: {
    path: path.resolve(__dirname, 'pr_Juan_src/dist'),
    filename: '[name].bundle.js',
  },
  stats: {
    preset: 'normal',  
    groupModulesByPath: false,
    groupModulesByExtension: false,
    modulesSpace: 500,
    modulesSort: 'name',  
    // preset: 'detailed',    //-- Interesante para produccion ???
    // orphanModules: true,   //-- Interesante para produccion ???
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
        test: /\.html$/,
        type: "asset/resource",
        generator: {
          filename: "[name][ext]",
        },
      },
      {
        test: /\.html$/, use: 'html-loader'   
      },
      {
        test: /\.(c|sc|sa)ss$/,
        use: [
          SeparaPackCSS.loader,
          'css-loader',
          'sass-loader'
        ]
      },
    ]
  },
  plugins: [
    new SeparaPackCSS({ filename: '[name].bundle.css' }),
    new ComprimePacks(),
    new CleanWebpackPlugin({verbose: true,}),

    // new HTMLWebpackPlugin(),     // Genera dist/index.html que referencia los packs generados
    //   {
    //     filename: './pr_Juan_src/htmlOut.html',     // fich.salida
    //     template: './pr_Juan_src/pr.html',          // fich.entrada/template
    //   })
    // new BundleAnalyzerPlugin(),  // Plugin que muestra en el navegador la composicion del pack (ctr+c para salir del terminal)
  ]
}
