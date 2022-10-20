// webpack.config.json
const path = require('path');
module.exports = {
  entry: {
      app: './pr_Juan_src/js/entryPoint.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
  },
  module: {
    rules: [
      {
        test: /.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  }
};