// Polyfill generator runtime
require("regenerator-runtime/runtime");

// Polyfill Promise
require("es6-promise").polyfill();

// Polyfill Fetch
require("unfetch/polyfill");

import React from "react";
import ReactDOM from "react-dom";

import Root from "./components/Root";
import redux from "./redux";
import rootSaga from "./sagas";
import { addMarket, initializeMarkets } from "./actions/market";

// Read data from DOM
const mountNode = document.getElementById("app");

// Initialize Redux Store
const store = redux();
store.runSaga(rootSaga);
// Initialize Actions
store.dispatch(initializeMarkets());
store.dispatch(addMarket("usdt-btc"), true); // always need to have this market as base market
store.dispatch(addMarket("btc-eth"), true); // always need to have this market as base market

function renderApp(Component) {
  ReactDOM.render(<Component store={store} />, mountNode);
}

function hotHandler() {
  const NextRoot = require("./components/Root");
  renderApp(NextRoot);
}

renderApp(Root);

// Enable hot reload
if (process.env.NODE_ENV === "development") {
  if (module.hot) {
    module.hot.accept("./components/Root", hotHandler);
  }
}
