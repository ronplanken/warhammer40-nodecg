import {defineConfig} from "vite";
import react from "@vitejs/plugin-react";
import nodecg from "./vite-plugin-nodecg.mjs";
import rollupEsbuild from "rollup-plugin-esbuild";
import rollupExternals from "rollup-plugin-node-externals";
import macrosPlugin from "vite-plugin-babel-macros";

export default defineConfig(({mode}) => ({
	server: {
		host: "0.0.0.0",
	},
	clearScreen: false,
	plugins: [
		macrosPlugin(),
		react(),
		nodecg({
			bundleName: "react-vite-tmpl",
			graphics: "./src/browser/graphics/views/*.tsx",
			dashboard: "./src/browser/dashboard/views/*.tsx",
			extension: {
				input: "./src/extension/index.ts",
				plugins: [rollupEsbuild(), rollupExternals()],
			},
		}),
	],
	define: {
		"process.env.NODE_ENV": `'${mode || "production"}'`, // browser throws an error about process not defined on determineTheme.ts
		SC_DISABLE_SPEEDY: "true", // needed to enable vendor prefixing using 'vite build'
		// using process.env.SC_DISABLE_SPEEDY doesnt work due to the way styled-components checks for process.env
		// https://github.com/styled-components/styled-components/blob/main/packages/styled-components/src/constants.ts#L17
		// I'm guessing process.env ternary worked in webpack but doesn't work with vite
		// you also need to wrap the app with <StyleSheetManager enableVendorPrefixes={true}>
	},
}));
