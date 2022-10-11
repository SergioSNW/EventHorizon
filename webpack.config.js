const path = require('path');

module.exports = {
    entry: './src/eventhorizon.js',
    output: {
        // path: path.resolve(--__dirname, 'dist'),
        filename: 'eventhorizon.bundle.js',
    },
    module: {
        rules: [{ test: /\.txt$/, use: 'raw-loader' }],
    },
    mode: 'production',
};