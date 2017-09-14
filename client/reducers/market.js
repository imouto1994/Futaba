import pull from "lodash/fp/pull";
import concat from "lodash/fp/concat";
import get from "lodash/fp/get";
import set from "lodash/fp/set";
import update from "lodash/fp/update";

import MarketActions from "../actions/market";
import { createMarket } from "../models/market";
import { swap } from "../utils/array";

const initialState = {
  previousMarketsMap: {},
  marketsMap: {},
  marketIds: [],
};

export default function MarketReducer(state = initialState, action) {
  switch (action.type) {
    case MarketActions.ADD_MARKET_PENDING: {
      const { payload } = action;
      const { marketId, isPrepend } = payload;

      // Update market IDs list
      let updatedState = update(
        "marketIds",
        function updater(list) {
          if (!isPrepend) {
            return concat(list, [marketId.toUpperCase()]);
          } else {
            return concat([marketId.toUpperCase()], list);
          }
        },
        state,
      );

      // Set default initial market summary
      updatedState = set(
        `marketsMap.${marketId.toUpperCase()}`,
        createMarket({ MarketName: marketId.toUpperCase() }),
        updatedState,
      );

      // Clear previous market summary
      updatedState = set(
        `previousMarketsMap.${marketId.toUpperCase()}`,
        undefined,
        updatedState,
      );

      // Clear market

      return updatedState;
    }
    case MarketActions.ADD_MARKET_FAILURE: {
      const { payload } = action;
      const { marketId } = payload;
      return update(
        "marketIds",
        function updater(list) {
          return pull(marketId.toUpperCase(), list);
        },
        state,
      );
    }
    case MarketActions.REMOVE_MARKET: {
      const { payload } = action;
      const { marketId } = payload;
      return update(
        "marketIds",
        function updater(list) {
          return pull(marketId.toUpperCase(), list);
        },
        state,
      );
    }
    case MarketActions.SHIFT_UP_MARKET: {
      const { payload } = action;
      const { marketId } = payload;
      const marketIds = get("marketIds", state);
      const index = marketIds.indexOf(marketId.toUpperCase());
      if (index > 0) {
        return update(
          "marketIds",
          function updater(list) {
            return swap(list, index, index - 1);
          },
          state,
        );
      } else {
        return state;
      }
    }
    case MarketActions.SHIFT_DOWN_MARKET: {
      const { payload } = action;
      const { marketId } = payload;
      const marketIds = get("marketIds", state);
      const index = marketIds.indexOf(marketId.toUpperCase());
      if (index !== -1 && index < marketIds.length - 1) {
        return update(
          "marketIds",
          function updater(list) {
            return swap(list, index, index + 1);
          },
          state,
        );
      } else {
        return state;
      }
    }
    case MarketActions.MARKET_TICKER_GET_SUCCESS: {
      const { payload } = action;
      const { summary } = payload;
      const previousMarketSummary = get(
        `marketsMap.${summary.MarketName}`,
        state,
      );
      let updatedState = set(
        `marketsMap.${summary.MarketName}`,
        summary,
        state,
      );
      updatedState = set(
        `previousMarketsMap.${summary.MarketName}`,
        previousMarketSummary,
        updatedState,
      );

      return updatedState;
    }
    default:
      return state;
  }
}
