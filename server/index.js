const path = require("path");
const express = require("express");
const compression = require("compression");
const morgan = require("morgan");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const webpack = require("webpack");
const webpackDevMiddleware = require("webpack-dev-middleware");

const router = require("./router");
const webpackConfig = require("../webpack/dev.config");

const HOST = "localhost";
const PORT = parseInt(process.env.SERVER_PORT, 10) || 4000;
const app = express();

/**
 * Logger Middleware
 */
if (process.env.NODE_ENV === "production") {
  app.use(morgan("combined"));
} else {
  app.use(morgan("dev"));
}

/**
 * Security Middlewares
 */
app.use(helmet.xssFilter());
app.use(helmet.frameguard("deny"));
app.use(
  helmet.hsts({
    maxAge: 10886400000,
    preload: true,
    force: true,
  }),
);
app.use(helmet.hidePoweredBy({ setTo: "Ruby on Rails" }));
app.use(helmet.ieNoOpen());
app.use(helmet.noSniff());

/**
 * Parser Middlewares
 */
app.use(bodyParser.json({ limit: "20mb" }));

/**
 * Compression Middleware
 */
app.use(compression());

/* API Routes */
app.use("/api", router);

/**
 * Webpack Dev Middleware
 */
if (process.env.NODE_ENV === "development") {
  app.use(
    webpackDevMiddleware(webpack(webpackConfig), {
      proxy: {
        "*": `http://${HOST}:${PORT}`,
      },
      inline: true,
      hot: true,
      publicPath: `http://${HOST}:${PORT}`,
      port: PORT,
      host: HOST,
      historyApiFallback: true,
    }),
  );
}

/* Serve Static Files */
app.use("/build", express.static(path.resolve(__dirname, "../build")));

/* Render layout */
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../build/index.html"));
});

/* Initialize server */
app.set("port", PORT);
app.listen(PORT, null);

// eslint-disable-next-line no-console
console.log(`Server started listening at port ${PORT}`);
