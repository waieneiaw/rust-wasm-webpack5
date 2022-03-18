const path = require("path");

const webpack = require("webpack")
const CopyPlugin = require("copy-webpack-plugin");
const WasmPackPlugin = require("@wasm-tool/wasm-pack-plugin");

const dist = path.resolve(__dirname, "dist");

module.exports = {
  mode: "production",
  entry: {
    index: "./js/index.js"
  },
  output: {
    path: dist,
    filename: "[name].js"
  },
  devServer: {
    // contentBase: dist,
  },
  module: {
    rules: [{
      test: /\.wasm$/,
      type: "webassembly/async"
    }]
  },
  experiments: {
    asyncWebAssembly: true,
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        path.resolve(__dirname, "static")
      ],
    }),

    new WasmPackPlugin({
      crateDirectory: __dirname,
    }),

    new webpack.LoaderOptionsPlugin({
      options: {
        exprimnet: {
          asyncWebAssembly: true
        }
      }
    }),
  ]
};
