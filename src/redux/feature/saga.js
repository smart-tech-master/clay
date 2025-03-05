import { all, takeLatest, fork, put } from 'redux-saga/effects';
import actions from "./actions";
import statusActions from "./../status/actions";

export function* getPalletRequest() {
  yield takeLatest(actions.GET_PALLET_REQUEST, function* getPalletRequest() {
    try {
      yield put(statusActions.openConfirmModal());
    } catch (e) {
      console.log(e);
    }
  });
}

export default function* rootSaga() {
  yield all([
    fork(getPalletRequest)
  ]);
}