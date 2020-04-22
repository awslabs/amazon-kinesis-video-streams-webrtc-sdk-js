const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const LicenseWebpackPlugin = require('license-webpack-plugin').LicenseWebpackPlugin;
const path = require('path');
const webpack = require('webpack');
const packageJson = require('./package.json');
const fs = require('fs');

const version = packageJson.version;
console.log(`Package version: ${version}`);

module.exports = {
    entry: {
        main: path.resolve(__dirname, 'src/index.ts'),
    },
    output: {
        library: 'KVSWebRTC',
        libraryTarget: 'window',
    },
    externals: {
        'isomorphic-webcrypto': 'crypto',
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                loaders: [
                    {
                        loader: 'ts-loader',
                        options: {
                            // disable type checker - we will use it in fork plugin
                            transpileOnly: true,
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        new ForkTsCheckerWebpackPlugin(),

        new webpack.EnvironmentPlugin({
            PACKAGE_VERSION: version,
        }),

        new LicenseWebpackPlugin({
            outputFilename: 'kvs-webrtc.LICENSE',
            addBanner: true,
            renderBanner: () => fs.readFileSync('./license/bundleLicenseBanner.txt', { encoding: 'utf-8' }).replace('VERSION', version),
            renderLicenses: modules => {
                let text = fs.readFileSync('./license/bundleLicenseHeader.txt', { encoding: 'utf-8' });
                modules.forEach(module => {
                    text += '\n';
                    text += `This product bundles ${module.name}, which is available under the ${module.licenseId} license:\n`;
                    text += '\n';
                    text += module.licenseText
                        .split('\n')
                        .map(line => `  ${line}\n`)
                        .join('');
                });
                return text;
            },
        }),
    ],

    // Fail if there are any errors (such as a TypeScript type issue)
    bail: true,
};
