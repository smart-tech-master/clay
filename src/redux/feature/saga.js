import { all, takeLatest, fork, put } from 'redux-saga/effects';
import actions from "./actions";
import statusActions from "./../status/actions";
import { getQuery, postQuery } from 'utils/api';

export function* getColours() {
  yield takeLatest(actions.GET_COLOURS_REQUEST, function* getPalletRequest() {
    try {
      const response = yield getQuery(``);
      /*console.log('this is color request result', response.data);*/
      if(response.status === 200) {
        yield put({
          type: actions.GET_COLOURS_REQUEST_SUCCESS,
          payload: response.data,
        });
      }
    } catch (e) {
      console.log(e);
    }
  });
}

/*export function* getPalletRequest() {
  yield takeLatest(actions.GET_PALLET_REQUEST, function* () {
    try {
      const response = yield getQuery(`/domains/${payload.domainId}/get_hostnames/`);
    } catch (e) {
      console.log(e);
    }
  });
}*/

export default function* rootSaga() {
  yield all([
    fork(getColours)
  ]);
}