import { all, fork } from "redux-saga/effects";
import graphsSaga from "./graphsSaga";
import dealsSaga from "./dealsSaga";

export default function* rootSaga() {
  yield all([fork(graphsSaga)]);
  yield all([fork(dealsSaga)]);
}
