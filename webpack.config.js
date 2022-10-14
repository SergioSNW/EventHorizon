//** Version para que WebPack trabaje con CSS, SCSS y SASS */

const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: ['./style.css', './src/eventhorizon.js'], 

    mode: "production",    
    mode: 'development',    // Para produccion comentar esta linea (en DEV, permite ver algo mas de 1 linea en el fich.output)

    output: {
        filename: './dist/js/main.min.js',
        path: path.resolve(__dirname)
    },
    module: {
        rules: [
            {
                test: /\.html$/, use: 'html-loader'   
            },
            {
                test: /\.(c|sc|sa)ss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    'css-loader',
                    'sass-loader'
                ]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin()
    ]
}
