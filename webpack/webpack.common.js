const Path = require("path");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: {
    app: Path.resolve(__dirname, "../src/index.js")
  },
  output: {
    path: Path.join(__dirname, "../build"),
    filename: "hdir-vanilla.js"
  },
  plugins: [
    new CleanWebpackPlugin(["build"], { root: Path.resolve(__dirname, "..") }),
    new CopyWebpackPlugin([
      { from: "./public", to: "public" },
      { from: "index.html", to: "index.html", toType: "file" },
      { from: "App.css", to: "App.css", toType: "file" }
    ])
  ],
  resolve: {
    alias: {
      "~": Path.resolve(__dirname, "../src")
    }
  },
  module: {
    rules: [
      {
        test: /\.mjs$/,
        include: /node_modules/,
        type: "javascript/auto"
      }
    ]
  }
};
