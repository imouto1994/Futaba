import { combineReducers } from "redux";

import MarketReducer from "./market";

export default combineReducers({
  market: MarketReducer,
});
