const path = require('path');

const DevToolsIgnoreListInlinePlugin = require('devtools-ignore-list-inline-webpack-plugin');

const main = {
    mode: 'production',
    entry: {
        "web-console-log": ['./src/index.js'],
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
    },
    plugins: [new DevToolsIgnoreListInlinePlugin({ isTarget: (filename => filename.endsWith("web-console-log.js")) })]
};

module.exports = [main];