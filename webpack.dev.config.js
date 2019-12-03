const path = require('path');
const merge = require('webpack-merge');

module.exports = merge.smart(require('./webpack.config'), {
    mode: 'development',

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'kvs-webrtc.js',
    },

    devServer: {
        contentBase: path.join(__dirname, 'examples'),
        publicPath: '/',
        port: 3001,
    },

    // Include sourcemaps
    devtool: 'inline-source-map',

    // Keep running even if there are errors
    bail: false,
});
