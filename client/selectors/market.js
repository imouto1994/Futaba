import { createSelector } from "reselect";
import get from "lodash/fp/get";

import MarketActions from "../actions/market";
import { createMarket } from "../models/market";

export const marketsMapSelector = function(state) {
  return state.market.marketsMap;
};

export const marketIdsSelector = function(state) {
  return state.market.marketIds;
};

export const currentMarketsSelector = createSelector(
  marketIdsSelector,
  marketsMapSelector,
  function selector(marketIds, marketsMap) {
    return marketIds.map(function mapper(id) {
      return marketsMap[id];
    });
  },
);

export const marketSummaryByIdSelector = function(state, { marketId }) {
  return (
    get(`market.marketsMap.${marketId.toUpperCase()}`, state) || createMarket()
  );
};

export const previousMarketSummaryByIdSelector = function(state, { marketId }) {
  return (
    get(`market.previousMarketsMap.${marketId.toUpperCase()}`, state) ||
    createMarket()
  );
};

export const isAddedMarketSelector = function(state, { marketId }) {
  return state.market.marketIds.indexOf(marketId.toUpperCase()) !== -1;
};

export const getLatestBitcoinPrice = function(state) {
  return get(["market", "marketsMap", "USDT-BTC", "Last"], state) || 0;
};

export const getLatestEthereumPrice = function(state) {
  return (
    (get(["market", "marketsMap", "USDT-BTC", "Last"], state) || 0) *
    (get(["market", "marketsMap", "BTC-ETH", "Last"], state) || 0)
  );
};
