const path = require('path');

// 1.8 MB approximately for development build with sourcemap
// about 330 KB for the optimized build
const isProduction = process.env.CI === 'true';

module.exports = {
    entry: './index.js',
    output: {
        filename: 'aws-sdk-VERSION-kvswebrtc.js', // VERSION is a placeholder, will get replaced by the rename-output-file.js script
        path: path.resolve(__dirname, 'dist'),
        library: { name: 'AWS', type: 'assign' },
        globalObject: 'this',
    },
    mode: isProduction ? 'production' : 'development',
    devtool: isProduction ? false : 'inline-source-map',
};
