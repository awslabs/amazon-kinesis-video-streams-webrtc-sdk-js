const fs = require("fs");
const path = require("path");
const execSync = require("child_process").execSync;

// Get the version from package.json
const version_kvs = JSON.parse(execSync("npm list @aws-sdk/client-kinesis-video --depth=0 --json"))
    .dependencies["@aws-sdk/client-kinesis-video"].version;

const version_kvs_signaling = JSON.parse(execSync("npm list @aws-sdk/client-kinesis-video-signaling --depth=0 --json"))
    .dependencies["@aws-sdk/client-kinesis-video-signaling"].version;

const version_kvs_webrtc_storage = JSON.parse(execSync("npm list @aws-sdk/client-kinesis-video-webrtc-storage --depth=0 --json"))
    .dependencies["@aws-sdk/client-kinesis-video-webrtc-storage"].version;

if (version_kvs !== version_kvs_signaling || version_kvs !== version_kvs_webrtc_storage) {
    throw `Version mismatch!
        @aws-sdk/client-kinesis-video version: ${version_kvs};
        @aws-sdk/client-kinesis-video-signaling version: ${version_kvs_signaling};
        @aws-sdk/client-kinesis-video-webrtc-storage version: ${version_kvs_webrtc_storage}`
}

// Path to the Webpack output directory
const distDir = path.resolve(__dirname, "dist");

// Find the generated Webpack file
const oldFileName = path.join(distDir, 'aws-sdk-VERSION-kvswebrtc.js');
const newFileName = path.join(distDir, `aws-sdk-${version_kvs}-kvswebrtc.js`);

// Rename the file
fs.rename(oldFileName, newFileName, (err) => {
    if (err) {
        console.error("Error renaming file:", err);
    } else {
        console.log(`Renamed file to: ${newFileName}`);
    }
});
