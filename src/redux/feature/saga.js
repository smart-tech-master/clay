import { all, takeLatest, fork, put } from 'redux-saga/effects';
import actions from "./actions";
import statusActions from "./../status/actions";
import featureActions from "../../redux/feature/actions";
import { getQuery, postQuery } from 'utils/api';
import { getDefaultPallet } from 'utils/common';

export function* getColours() {
  yield takeLatest(actions.GET_COLOURS_REQUEST, function* getPalletRequest() {
    try {
      //const response = yield getQuery(`colors?ajax=1`);
      const rootElement = document.getElementById('root');
      const getColoursEndPoint = rootElement?.getAttribute('data-getcolors') || '';

      const response = yield getQuery(getColoursEndPoint);
      // const response = yield getQuery(`/colour-tempdata.json`);
      //const response = yield getQuery(`https://clay.powdev.lt/en/module/revisualizer/colors?ajax=1`);
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
        yield put({
          type: actions.OPEN_TOAST,
          payload: {
            isOpen: true,
            status: "success",
            message: "Object is saved successfully"
          },
        });
      }
    } catch (e) {
      yield put({
        type: actions.OPEN_TOAST,
        payload: {
          isOpen: true,
          status: "error",
          message: "Object saving is failed"
        },
      });
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
    // console.log('addToCartEndPoint', addToCartEndPoint);
    try {
      const response = yield postQuery(
        //`cart?ajax=1`,
        addToCartEndPoint,
        {
          customerId : payload.payload.customerId,
          products: payload.payload.priceData,
        }
      );
      if(response.status === 200) {
        yield put({
          type: actions.OPEN_TOAST,
          payload: {
            isOpen: true,
            status: "success",
            message: "Add to cart is done successfully"
          },
        });
      }
    } catch (e) {
      yield put({
        type: actions.OPEN_TOAST,
        payload: {
          isOpen: true,
          status: "error",
          message: "Add to cart is failed"
        },
      });
    }
  });
}

export function* defaultPalletRequest() {
  yield takeLatest(actions.GET_DEFAULT_PALLET_REQUEST, function* () {
    try {
      const rootElement = document.getElementById('root');
      const getDefaultPalletEndPoint = rootElement?.getAttribute('data-getpallets') || '';

      const response = yield getQuery(getDefaultPalletEndPoint);
      // const response = yield getQuery(`/default-pallets.json`);
      //const response = yield getQuery(`https://clay.powdev.lt/en/module/revisualizer/pallets?ajax=1&action=getPallets`);
      if(response.status === 200) {
        const defaultPalletData = getDefaultPallet(response.data.objects);
        console.log('dispatch(featureActions.getDefaultPallet())', response);
        yield put({
          type: actions.CREATE_USER_COLOURS,
          payload: {...defaultPalletData},
        });
      }
    } catch (e) {
      console.log(e);
    }
  });
}

export function* setPallet() {
  yield takeLatest(actions.SET_PALLET_REQUEST, function* setPalletRequest(param) {
    try {
      /*      console.log('setObjects');*/
      const rootElement = document.getElementById('root');
      const setPalletsEndPoint = rootElement?.getAttribute('data-setpallets') || '';

      const response = yield postQuery(
        //`objects?ajax=1`,
        setPalletsEndPoint,
        {
          action: 'setPallets',
          payload: param.payload,
        }
      );
      if(response.status === 200) {
        if(param.payload.type === "create"){
          yield put({
            type: actions.OPEN_TOAST,
            payload: {
              isOpen: true,
              status: "success",
              message: "Pallet is created successfully"
            },
          });
        }

        if(param.payload.type === "update"){
          yield put({
            type: actions.OPEN_TOAST,
            payload: {
              isOpen: true,
              status: "success",
              message: "Pallet is saved successfully"
            },
          });
        }

        if(param.payload.type === "delete"){
          yield put({
            type: actions.OPEN_TOAST,
            payload: {
              isOpen: true,
              status: "success",
              message: "Pallet is deleted successfully"
            },
          });
        }
        // console.log('setObjects success');
      }
    } catch (e) {
      if(param.payload.type === "create"){
        yield put({
          type: actions.OPEN_TOAST,
          payload: {
            isOpen: true,
            status: "error",
            message: "Pallet creating is failed"
          },
        });
      }

      if(param.payload.type === "update"){
        yield put({
          type: actions.OPEN_TOAST,
          payload: {
            isOpen: true,
            status: "error",
            message: "Pallet saving is failed"
          },
        });
      }

      if(param.payload.type === "delete"){
        yield put({
          type: actions.OPEN_TOAST,
          payload: {
            isOpen: true,
            status: "error",
            message: "Pallet deleting is failed"
          },
        });
      }
    }
  });
}

export default function* rootSaga() {
  yield all([
    fork(getColours),
    fork(setObjects),
    fork(getObjects),
    fork(addProducts),
    fork(addToCart),
    fork(defaultPalletRequest),
    fork(setPallet)
  ]);
}