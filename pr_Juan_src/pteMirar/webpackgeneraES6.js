const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  output: {
    filename: 'main-es6.js'
  },
  plugins: [
    new HtmlWebpackPlugin({  
      template: 'dist/index.html',
    }),
  ]
}