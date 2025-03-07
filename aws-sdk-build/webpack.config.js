const path = require("path");

module.exports = {
    entry: "./index.js",
    output: {
        filename: "aws-sdk-VERSION-kvswebrtc.js", // VERSION is a placeholder, will get replaced by the rename-output-file.js script
        path: path.resolve(__dirname, "dist"),
        library: { name: "AWS", type: "assign" },
        globalObject: "this"
    },
    mode: "production",
};
