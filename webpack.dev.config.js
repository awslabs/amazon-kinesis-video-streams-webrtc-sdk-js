const path = require('path');
const merge = require('webpack-merge');

module.exports = merge.smart(require('./webpack.config'), {
    mode: 'development',

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'kvs-webrtc.js',
    },

    devServer: {
        static: {
          directory: path.join(__dirname, "examples")
        },
        devMiddleware: {
            publicPath: '/',
        },
        allowedHosts: 'auto',
        port: 3001,
    },

    // Include sourcemaps
    devtool: 'inline-source-map',

    // Keep running even if there are errors
    bail: false,
});
