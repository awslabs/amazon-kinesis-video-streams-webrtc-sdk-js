const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const merge = require('webpack-merge');

// Define maximum asset size before gzipping
const MAX_ASSET_SIZE_KB = 23;
const MAX_ASSET_SIZE_BYTES = MAX_ASSET_SIZE_KB * 1024;

module.exports = merge.smart(require('./webpack.config'), {
    mode: 'production',

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'kvs-webrtc.min.js',
    },

    // Make sure the asset is not accidentally growing in size
    // Make sure that size impact of adding new code is known
    performance: {
        hints: 'error',
        maxAssetSize: MAX_ASSET_SIZE_BYTES,
        maxEntrypointSize: MAX_ASSET_SIZE_BYTES,
    },

    optimization: {
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    output: {
                        comments: /kvs-webrtc\.LICENSE/i,
                    },
                },
                extractComments: false,
            }),
        ],
    },
});
