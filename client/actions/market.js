import keyMirror from "keymirror";

const Actions = keyMirror({
  INITIALIZE_MARKETS: null,

  REMOVE_MARKET: null,

  SHIFT_UP_MARKET: null,
  SHIFT_DOWN_MARKET: null,

  ADD_MARKET_REQUEST: null,
  ADD_MARKET_PENDING: null,
  ADD_MARKET_SUCCESS: null,
  ADD_MARKET_FAILURE: null,

  MARKET_TICKER_GET_REQUEST: null,
  MARKET_TICKER_GET_PENDING: null,
  MARKET_TICKER_GET_SUCCESS: null,
  MARKET_TICKER_GET_FAILURE: null,
});

export function initializeMarkets(market) {
  return {
    type: Actions.INITIALIZE_MARKETS,
  };
}

export function addMarket(marketId, isPrepend = false) {
  return {
    type: Actions.ADD_MARKET_REQUEST,
    payload: {
      marketId,
      isPrepend,
    },
  };
}

export function removeMarket(marketId) {
  return {
    type: Actions.REMOVE_MARKET,
    payload: {
      marketId,
    },
  };
}

export function shiftUpMarket(marketId) {
  return {
    type: Actions.SHIFT_UP_MARKET,
    payload: {
      marketId,
    },
  };
}

export function shiftDownMarket(marketId) {
  return {
    type: Actions.SHIFT_DOWN_MARKET,
    payload: {
      marketId,
    },
  };
}

export function getMarketTicker(marketId) {
  return {
    type: Actions.MARKET_TICKER_GET_REQUEST,
    payload: {
      marketId,
    },
  };
}

export default Actions;
