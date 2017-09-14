/*
  Babel presets and plugins config file
  NODE_ENV determines what configurations are being used
*/
const supportedBrowsers = require("./browsers");

// Babel config for client
const babelConfig = {
  presets: [
    "flow",
    // Disable `modules` Babel plugin to let Webpack handle instead
    // The core reason is to enable tree-shaking for Webpack
    [
      "env",
      {
        targets: {
          browsers: supportedBrowsers,
        },
        modules: false,
      },
    ],
    "stage-0",
    "react",
  ],
  plugins: [["transform-runtime", { polyfill: false, regenerator: true }]],
};

module.exports = babelConfig;
