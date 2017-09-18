const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const FaviconsWebpackPlugin = require("favicons-webpack-plugin");

const babelConfig = require("../config/babel");

const ASSETS_PATH = path.resolve(__dirname, "../build");

module.exports = {
  target: "web",
  entry: {
    main: "./client/index.js",
  },
  output: {
    path: ASSETS_PATH,
    filename: "[name]-[hash].js",
    chunkFilename: "[name]-[hash].js",
    publicPath: "/build/",
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
              name: "[name]-[has].[ext]",
            },
          },
        ],
        include: [path.resolve(__dirname, "../client/")],
      },
      {
        test: /\.js$/,
        use: [
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
        use: ExtractTextPlugin.extract({
          fallback: [
            {
              loader: "style-loader",
              options: {
                singleton: true,
              },
            },
          ],
          use: [
            {
              loader: "css-loader",
              options: {
                modules: true,
                importLoaders: 1,
                ignoreOrder: true,
                localIdentName: "[name]__[local]___[hash:base64:5]",
              },
            },
            {
              loader: "postcss-loader",
            },
          ],
        }),
        include: [path.resolve(__dirname, "../client/")],
      },
      // Node_modules css
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: [
            {
              loader: "style-loader",
              options: {
                singleton: true,
              },
            },
          ],
          use: [
            {
              loader: "css-loader",
            },
            {
              loader: "postcss-loader",
            },
          ],
        }),
        include: [path.resolve(__dirname, "../node_modules/")],
      },
    ],
  },
  // List of injected plugins
  plugins: [
    // Enable scope hoisting for modules
    new webpack.optimize.ModuleConcatenationPlugin(),

    // Bundle CSS file from the "extract-text-plugin" loader
    new ExtractTextPlugin("[name]-[hash].css"),

    // Global variables definition
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("production"),
    }),

    // Favicon Plugin
    new FaviconsWebpackPlugin({
      // Your source logo
      logo: path.resolve(__dirname, "../client/images/bitcoin-logo.png"),
    }),

    // Optimization Plugins
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
    }),

    new webpack.optimize.UglifyJsPlugin({
      compress: {
        screw_ie8: true,
        warnings: false,
      },
      mangle: {
        screw_ie8: true,
      },
      output: {
        comments: false,
        screw_ie8: true,
      },
    }),

    // HTML Bundle extract plugin
    new HtmlWebpackPlugin({
      template: "client/index.html",
      hash: true,
      filename: "index.html",
      inject: "body",
    }),
  ],
};
