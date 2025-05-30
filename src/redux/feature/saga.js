import { all, takeLatest, fork, put } from 'redux-saga/effects';
import actions from "./actions";
import statusActions from "./../status/actions";
import { getQuery, postQuery } from 'utils/api';

export function* getColours() {
  yield takeLatest(actions.GET_COLOURS_REQUEST, function* getPalletRequest() {
    try {
      //const response = yield getQuery(`colors?ajax=1`);
      const rootElement = document.getElementById('root');
      const getColoursEndPoint = rootElement?.getAttribute('data-getcolors') || '';
      //console.log("getColoursEndPoint", getColoursEndPoint);

      const response = yield getQuery(getColoursEndPoint);
      // const response = yield getQuery(`/colour-tempdata.json`);
      // console.log('this is color request result', response.data);
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

export function* getObjects() {
  yield takeLatest(actions.GET_OBJECTS_REQUEST, function* getObjectsRequest() {
    try {
      const rootElement = document.getElementById('root');
      const getObjectsEndPoint = rootElement?.getAttribute('data-getobjects') || '';

      //const response = yield getQuery(`objects?ajax=1&action=getObjects`);
      const response = yield getQuery(getObjectsEndPoint);
      /* console.log('this is color request result', response.data);*/
      if(response.status === 200) {
        yield put({
          type: actions.GET_OBJECTS_REQUEST_SUCCESS,
          payload: response.data,
        });
      }
    } catch (e) {
      console.log(e);
    }
  });
}

export function* setObjects() {
  yield takeLatest(actions.SET_OBJECTS_REQUEST, function* setObjectsRequest(payload) {
    try {
      /*      console.log('setObjects');*/
      const rootElement = document.getElementById('root');
      const setObjectsEndPoint = rootElement?.getAttribute('data-setobjects') || '';

      const response = yield postQuery(
        //`objects?ajax=1`,
        setObjectsEndPoint,
        {
          action: 'setObject',
          name: `${payload.customerId}-objects`,
          id_object: JSON.stringify(payload) ,
        }
      );
      if(response.status === 200) {
        console.log('setObjects success');
      }
    } catch (e) {
      console.log(e);
    }
  });
}

export function* addProducts() {
  yield takeLatest(actions.ADD_PRODUCTS_REQUEST, function* addProductsRequest(payload) {
    //console.log('addProducts', payload);
    try {
      const response = yield postQuery(
        `cart?ajax=1`,
        {
          products: payload,
        }
      );
      if(response.status === 200) {
        console.log('addProducts success');
      }
    } catch (e) {
      console.log(e);
    }
  });
}

export function* addToCart() {
  yield takeLatest(actions.ADD_TO_CART_REQUEST, function* addToCartRequest(payload) {
    const rootElement = document.getElementById('root');
    const addToCartEndPoint = rootElement?.getAttribute('data-addtocart') || '';
    console.log('addToCartEndPoint', addToCartEndPoint);
    try {
      const response = yield postQuery(
        //`cart?ajax=1`,
        addToCartEndPoint,
        {
          products: payload,
        }
      );
      if(response.status === 200) {
        console.log('addToCart success');
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
    fork(getColours),
    fork(setObjects),
    fork(getObjects),
    fork(addProducts),
    fork(addToCart)
  ]);
}