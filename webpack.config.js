const path = require('path');

const main = {
    mode: 'production',
    entry: {
        "web-console-log": ['./src/index.js'],
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
    },
};

module.exports = [main];