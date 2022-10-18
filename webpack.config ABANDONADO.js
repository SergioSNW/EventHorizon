const { resolve, join } = require('path');
const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const themeDirectory = resolve('wp-content/themes/EventHorizon');
const wcJSDirectory = './node_modules/@webcomponents/webcomponentsjs';

const pluginConfigs = {
    copyFiles: [
      {
        from: resolve('${wcJSDirectory}/webcomponents-*.{js,map}'), // we need this for browsers that don't support web components
        to: join(themeDirectory, 'vendor')
        // flatten: true
      },
      {
        from: resolve('${wcJSDirectory}/custom-elements-es5-adapter.js'), // we need this since we're transpiling to es5
        to: join(themeDirectory, 'vendor')
        // flatten: true
      }
    ],

  miniCSSExtract: {
    filename: "bundle.css" // this is what actually get served after sass is compiled
  }, 
}



const loaderConfigs = {
  miniCSSExtract: [
    MiniCssExtractPlugin.loader,
    {
      loader: "css-loader"
      // ,
      // options: {sourceMap: true}
    },
    {
      loader: "postcss-loader"
      // ,
      // options: {sourceMap: true}
    },
    {
      loader: "sass-loader"
      // ,
      // options: {sourceMap: true}
    }
  ],
  babel: [{
    loader: 'babel-loader',
    options: {
      presets: [
        [
          '@babel/preset-env',
          {
            modules: 'false',
            targets: {
              browsers: '> 1%, IE 11, not dead'
            }
          }
        ]
      ],
      plugins: [
        '@babel/syntax-dynamic-import', // this is needed to support dynamic imports
        '@babel/syntax-object-rest-spread' // this is needed to support the spread  operator
      ]
    }
  }],

}

module.exports = {
    entry: ['./style.css', './src/eventhorizon.js', './src/pr_Juan/pr.html'], 

    mode: "production",    
    mode: 'development',    // Para produccion comentar esta linea (en DEV, permite ver algo mas de 1 linea en el fich.output)

    output: {
        filename: './dist/js/main.min.js',
        path: path.resolve(__dirname)
    // entry: [
    //   'regenerator-runtime/runtime', // is needed for async/await
    //   themeDirectory + '/src/packages/me-app/me-app.js', // this file bootstraps our LitElement PWA
    //   themeDirectory + '/src/styles/app.scss' // use this file for any global styles
    // ],
  
    // output: {
    //   path: join(__dirname, 'wp-content/themes/anubis/bundles'),
    //   filename: 'bundle.js',
    //   publicPath: 'http://hasanirogers.local:8080/wp-content/themes/anubis/bundles'
    },
 
    module: {
        rules: [
        {
            test: /\.js$/,
            use: loaderConfigs.babel
        },
    
        {
            test: /\.scss$/,
            exclude: /node_modules/,
            use: loaderConfigs.miniCSSExtract
        }
        ]
    },
    plugins: [

        // new CopyWebpackPlugin({
        //     patterns: [
        //     //   { from: 'origen', to: 'destino' },
        //       {
        //         from: resolve('${wcJSDirectory}/webcomponents-*.{js,map}'), // we need this for browsers that don't support web components
        //         to: join(themeDirectory, 'vendor')
        //         // flatten: true
        //       },
        //       {
        //         from: resolve('${wcJSDirectory}/custom-elements-es5-adapter.js'), // we need this since we're transpiling to es5
        //         to: join(themeDirectory, 'vendor')
        //         // flatten: true
        //       }
        //     ],
        //     // options: {
        //     //   concurrency: 100,
        //     // },
        //   }),


        // new CopyWebpackPlugin(patterns: [$pluginConfigs.copyFiles]),
        new MiniCssExtractPlugin(pluginConfigs.miniCSSExtract),
        new webpack.optimize.LimitChunkCountPlugin({maxChunks: 1}), // we only want to produce 1 bundle.js file
      ]
}