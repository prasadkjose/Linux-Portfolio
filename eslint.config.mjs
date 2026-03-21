import js from "@eslint/js";
import globals from "globals";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";

export default [
    {
        ignores: ["dist", "node_modules", "public", "LICENSE", "pnpm-lock.yaml", "index.html"]
    },
    {
        files: ["**/*.{js,mjs,cjs,ts,tsx}"],
        languageOptions: {
            ecmaVersion: "latest",
            sourceType: "module",
            globals: globals.browser,
            parser: tsParser,
        },
        plugins: {
            "react-refresh": reactRefresh,
            react,
            "react-hooks": reactHooks,
            "@typescript-eslint": tseslint,
        },
        settings: {
            react: {
                version: "detect",
            },
        },
        rules: {
            ...js.configs.recommended.rules,
            ...tseslint.configs.recommended.rules,
            "react/react-in-jsx-scope": "off",
            "react/no-unescaped-entities": 0,
            camelcase: "error",
            "no-duplicate-imports": "error",
            "@typescript-eslint/no-unused-vars": "error",
            "react/prop-types": 0,
            "linebreak-style": ["warn", "unix"],
            "react-refresh/only-export-components": [
                "warn",
                { allowConstantExport: true },
            ],
            "no-undef": "off", // Disable no-undef since React 19 doesn't require React imports
        },
    }
];
