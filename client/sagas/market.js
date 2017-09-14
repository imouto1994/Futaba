import { all, call, takeEvery, put, select } from "redux-saga/effects";
import Cookies from "js-cookie";

import MarketActions, { addMarket } from "../actions/market";
import { isAddedMarketSelector, marketIdsSelector } from "../selectors/market";

function* getMarketTicker(marketId, shouldPropagateError = false) {
  yield put({
    type: MarketActions.MARKET_TICKER_GET_PENDING,
    payload: { marketId },
  });

  try {
    const data = yield call(fetch, `/api/market/${marketId}/`);
    const summary = yield data.json();
    yield put({
      type: MarketActions.MARKET_TICKER_GET_SUCCESS,
      payload: { summary },
    });
  } catch (error) {
    yield put({
      type: MarketActions.MARKET_TICKER_GET_FAILURE,
      error,
    });
    if (shouldPropagateError) {
      throw error;
    }
  }
}

function* handleGetMarketTicker(action) {
  const { payload } = action;
  const { marketId } = payload;
  yield call(getMarketTicker, marketId);
}

function* handleAddMarket(action) {
  const { payload } = action;
  const { marketId, isPrepend } = payload;

  const isAddedMarket = yield select(isAddedMarketSelector, { marketId });
  if (isAddedMarket) {
    return;
  }

  yield put({
    type: MarketActions.ADD_MARKET_PENDING,
    payload: { marketId, isPrepend },
  });

  // Fetch initial market ticker
  try {
    yield call(getMarketTicker, marketId, true);
    yield put({
      type: MarketActions.ADD_MARKET_SUCCESS,
      payload: { marketId },
    });
    const marketIds = yield select(marketIdsSelector);
    yield call(Cookies.set, "marketIds", marketIds);
  } catch (error) {
    yield put({
      type: MarketActions.ADD_MARKET_FAILURE,
      payload: {
        marketId,
      },
      error: new Error(
        "Failed to add market since app could not fetch market summary",
      ),
    });
  }
}

function* handleShiftUpMarket(action) {
  const marketIds = yield select(marketIdsSelector);
  yield call(Cookies.set, "marketIds", marketIds);
}

function* handleShiftDownMarket(action) {
  const marketIds = yield select(marketIdsSelector);
  yield call(Cookies.set, "marketIds", marketIds);
}

function* handleRemoveMarket(action) {
  const marketIds = yield select(marketIdsSelector);
  yield call(Cookies.set, "marketIds", marketIds);
}

function* handleInitializeMarkets(action) {
  const marketIds = yield call(Cookies.getJSON, "marketIds");
  if (marketIds != null) {
    for (const marketId of marketIds) {
      yield put(addMarket(marketId));
    }
  }
}

export function* watchMarketActions() {
  yield all([
    takeEvery(MarketActions.MARKET_TICKER_GET_REQUEST, handleGetMarketTicker),
    takeEvery(MarketActions.ADD_MARKET_REQUEST, handleAddMarket),
    takeEvery(MarketActions.SHIFT_UP_MARKET, handleShiftUpMarket),
    takeEvery(MarketActions.SHIFT_DOWN_MARKET, handleShiftDownMarket),
    takeEvery(MarketActions.REMOVE_MARKET, handleRemoveMarket),
    takeEvery(MarketActions.INITIALIZE_MARKETS, handleInitializeMarkets),
  ]);
}
