import { all, call } from "redux-saga/effects";

import { watchMarketActions } from "./market";

export default function* rootSaga() {
  yield all([call(watchMarketActions)]);
}
