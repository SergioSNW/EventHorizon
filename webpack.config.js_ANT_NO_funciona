const path = require('path');
//const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
//const MiniCssExtractPlugin = require("css-minimizer-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("css-minimizer-webpack-plugin");
// const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
module.exports = {
    mode: "production",
    entry: ['./style.css', './src/eventhorizon.js'],     //ppp
    // entry: ['./style.css', './src/eventhorizon.js','./src/pr_Juan/zz1.sass'],   //-- metiendo el sass da error
    output: {
        filename: './dist/js/main.min.js',
        path: path.resolve(__dirname)
    },
    module: {
        rules: [
            // {
            //     test: /\.js$/, exclude: /node_modules/,
            //     use: {
            //         loader: "babel-loader", 
            //         options: { presets: ['n'] } 
            //     }
            // },
            {
                test: /\.sass$/, use: 'sass-loader'
            }, 
            {
                test: /\.css$/, use: 'css-loader'
            // }, 
            // {
            //     test: /\.(sass|scss)$/,
            //     use: [new OptimizeCSSAssetsPlugin, 'sass-loader', 'scss-loader']
            } 
        ]
    }
};