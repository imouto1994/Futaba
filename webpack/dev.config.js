const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const babelConfig = require("../config/babel");

const ASSETS_PATH = path.resolve(__dirname, "../build");

module.exports = {
  target: "web",
  devtool: "sourcemap",
  entry: {
    main: [
      // Bundle the client for hot reloading only - means to only hot reload for successful updates
      "webpack/hot/only-dev-server",
      // Client entry point
      "./client/index.js",
    ],
  },
  output: {
    path: ASSETS_PATH,
    filename: "[name].js",
    chunkFilename: "[name].js",
  },
  // Modules for webpack to compile
  module: {
    rules: [
      {
        test: /\.(jpe?g|png|gif|svg|json)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
            },
          },
        ],
        include: [path.resolve(__dirname, "../client/")],
      },
      {
        test: /\.js$/,
        use: [
          {
            loader: "cache-loader",
            options: {
              cacheDirectory: path.resolve(__dirname, "../.cache-loader"),
            },
          },
          {
            loader: "babel-loader",
            options: babelConfig,
          },
        ],
        exclude: [path.resolve(__dirname, "../node_modules/")],
      },
      {
        test: /\.(otf|eot|svg|ttf|woff|woff2)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8192,
            },
          },
        ],
      },
      // CSS Modules
      {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader",
            options: {
              singleton: true,
            },
          },
          {
            loader: "cache-loader",
            options: {
              cacheDirectory: path.resolve(__dirname, "../.cache-loader"),
            },
          },
          {
            loader: "css-loader",
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName: "[name]__[local]___[hash:base64:5]",
            },
          },
          {
            loader: "postcss-loader",
          },
        ],
        include: [path.resolve(__dirname, "../client/")],
      },
      // Node_modules css
      {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader",
          },
          "cache-loader", // cache css-loader because it's the slow
          {
            loader: "css-loader",
          },
          {
            loader: "postcss-loader",
          },
        ],
        include: [path.resolve(__dirname, "../node_modules/")],
      },
    ],
  },
  // List of injected plugins
  plugins: [
    // Enable Hot Reload for development environment
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),

    // Global variables definition
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("development"),
    }),

    // HTML Bundle extract plugin
    new HtmlWebpackPlugin({
      template: "client/index.html",
      hash: true,
      filename: "index.html",
      inject: "body",
    }),
  ],
  performance: false,
};
