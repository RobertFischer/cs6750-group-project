import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { pluginTypeCheck } from "@rsbuild/plugin-type-check";
import { pluginNodePolyfill } from "@rsbuild/plugin-node-polyfill";


export default defineConfig({
  html: {
    template: "./index.html",
  },
  output: {
    assetPrefix: "/cs6750-group-project/",
    polyfill: 'entry',
    cleanDistPath: true,
    distPath: {
      root: 'docs',
    },
  },
  plugins: [
    pluginNodePolyfill(),
    pluginReact(),
    pluginTypeCheck({
      typescript: {
    // set 'readonly' to avoid emitting tsbuildinfo,
    // as the generated tsbuildinfo will break ts-checker-rspack-plugin
    mode: "readonly",
    // avoid OOM issue
    memoryLimit: 8192,
    // use typescript of user project
    typescriptPath: "./node_modules/typescript",
  },
  issue: {
    // ignore types errors from node_modules
    exclude: [({ file = "" }) => /[\\/]node_modules[\\/]/.test(file)],
  },
    }),
  ],
});
