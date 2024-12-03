const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./src/app.js",  // Entry point for the app
  output: {
    filename: "app.js",  // Output bundle
    path: path.resolve(__dirname, "dist"),
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: "babel-loader",
        exclude: /node_modules/,
      },
    ],
  },
  devServer: {
    static: {
      directory: path.resolve(__dirname, "public"), // Replaces 'contentBase'
    },
    compress: true,
    hot: true,
    port: 3000,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "public", "index.html"),
    }),
  ],
};
