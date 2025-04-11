import typescript from '@rollup/plugin-typescript';

export default {
  input: 'src/index.tsx',
  output: {
    file: 'bundle.js',
    format: 'iife',
    globals: {
      "react/jsx-runtime": "jsxRuntime",
      "react": "react",
      "react-dom/client": "client",
    },
  },
  external: [
    "react/jsx-runtime",
    "react",
    "react-dom/client",
  ],
  plugins: [typescript()],
};
