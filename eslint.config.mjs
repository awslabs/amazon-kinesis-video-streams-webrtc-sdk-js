import kvsWebrtc from "eslint-plugin-kvs-webrtc";
import tsParser from "@typescript-eslint/parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default [...compat.extends(
    "plugin:@typescript-eslint/recommended",
    "prettier/@typescript-eslint",
    "plugin:prettier/recommended",
), {
    plugins: {
        "kvs-webrtc": kvsWebrtc,
    },

    languageOptions: {
        parser: tsParser,
        ecmaVersion: 2017,
        sourceType: "module",
    },

    rules: {
        "kvs-webrtc/sorted-imports": "error",
    },
}, {
    files: ["**/*.js", "**/*.ts"],

    rules: {
        "@typescript-eslint/explicit-function-return-type": "off",
        "@typescript-eslint/no-var-requires": "off",
        "@typescript-eslint/no-require-imports": "off",
    },
}];
