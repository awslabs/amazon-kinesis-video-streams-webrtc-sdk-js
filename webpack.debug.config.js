const path = require('path');
const { merge } = require('webpack-merge');

module.exports = merge(require('./webpack.config'), {
    mode: 'development',

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'kvs-webrtc.js',
    },

    // Include sourcemaps
    devtool: 'inline-source-map',

    performance: {
        maxAssetSize: 1048576,
        maxEntrypointSize: 1048576,
    },
});
