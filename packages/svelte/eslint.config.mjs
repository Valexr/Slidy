import typescriptEslint from "@typescript-eslint/eslint-plugin";
import eslintPluginSvelte from 'eslint-plugin-svelte';
import globals from "globals";
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

export default [
	...eslintPluginSvelte.configs['flat/recommended'],
	{
		ignores: ["**/node_modules"],
	}, ...compat.extends(
		"eslint:recommended",
		"plugin:@typescript-eslint/recommended",
		"plugin:svelte/recommended",
	), {
		plugins: {
			"@typescript-eslint": typescriptEslint,
		},

		languageOptions: {
			globals: {
				...globals.browser,
			},

			parser: tsParser,
			ecmaVersion: 2021,
			sourceType: "module",

			parserOptions: {
				extraFileExtensions: [".svelte"],
			},
		},

		settings: {
			"svelte3/typescript": true,
		},

		rules: {
			indent: ["error", "tab"],
			quotes: ["error", "double"],
			semi: ["error", "always"],
			"array-bracket-spacing": ["error", "always"],
			"@typescript-eslint/no-unsafe-assignment": "off",
			"@typescript-eslint/no-unsafe-call": "off",
			"@typescript-eslint/no-unsafe-member-access": "off",
			"@typescript-eslint/explicit-module-boundary-types": "off",
			"@typescript-eslint/restrict-template-expressions": "off",
		},
	}, {
		files: ["**/*.svelte"],
		// processor: "svelte3/svelte3",
	}];
