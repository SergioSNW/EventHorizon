//
// WebPack. Fichero de configuracion para la actualizacion de la libreria de componentes en pruebas
// =======
// El funcionamiento es el siguiente:
// 1. Los componentes se desarollan en el dir '/src/@components'. 
//    El fuente puede ser tanto javascript/js, como typescript/ts (es empaquetado como js-ES6)
// 2. Cuando se quiera probar uno, hay que importarlo en '/src/@components/@catalogo.js'. Todos los 
//    componentes incluidos en este catalogo se empaquetan en '/src/@components/@libComponents.js'
// 3. Montar el html para las pruebas incluyendo  <script src="..apuntando a la libreria.."></script>
//    Hay un ejemplo, llamado 'pag@components.html' en el raiz del theme
// 4. Debería ser capaz de debugarse (incluye los mapas), pero no lo he probado aun.
//
// IMPORTANTE: Si ejecutas...  npm run libcomp  (script incluido en package.json)
//             cuando termine de empaquetar, queda en watching para regenerarse cuando se actualiza el catalogo
//             o cualquiera de los componentes empaquetados
 
const path = require('path');
const ReduceSizeCSS = require('css-minimizer-webpack-plugin');

module.exports = {
  entry:  './src/@components/@catalogo.js',
  output: {
    path: path.resolve(__dirname),
    filename: '@libComponents.js',
  },
  stats: {
    groupModulesByPath: false,
    groupModulesByExtension: false,
    modulesSpace: 500,
  },
  mode: 'development',
  devtool: 'inline-source-map',
  optimization: {
    // minimize: true,   // flag para Reducir en DEV
    // Ver consideraciones para generar source-map, util en Debug en la pag.
    // ... https://www.npmjs.com/package/css-minimizer-webpack-plugin
    minimizer: [ new ReduceSizeCSS() ],
  },
  module: {
    rules: [
      //TODO. Habria que incluir imagenes, audio y video
      {
        test: /\.imageneshtml$/, 
        use: 'html-loader'   
      },
      {
        test: /\.tsx?$/, 
        exclude: /node_modules/,
        use: 'ts-loader',
      },
      {
        test: /\.(c|sc|sa)ss$/,
        use: [ 'css-loader' , 'sass-loader' ]
      },
    ]
  },
  plugins: [
  ]
}
