import actions from './actions';
import { produce } from 'immer';

import { convertAllProductsToColourArray } from 'utils/common'
/*import {paletData} from "../../data/palet";*/

/*import { colours } from "../../data/palet";*/

const initState = {
  isOpenConfirmModal: false,
  isOpenTemplateModal: false,
  isOpenCanvasItemConfigModal: false,
  isOpenCreatePaletModal: false,
  isOpenUpdatePaletModal: false,
  downloadPdf: false,

  confirmModalAction: {},

  imageBaseUrl: "https://clay.powdev.lt",
  // assetsPath: '/modules/revisualizer/views/lib/',
  assetsPath: '',

  isLoggedIn: 0,
  customerId: 0,
  language: 'en',

  colours:[],
  userColours:{},
  coloursOnCanvas:[],
  priceData:[],
  updatedColour: {
    status: false,
    from: {},
    to: {},
    order: 0
  }
}

export default function reducer(state = initState, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      case actions.IS_OPEN_CONFIRM_MODAL:
        draft.isOpenConfirmModal = !draft.isOpenConfirmModal;
        break;

      case actions.IS_OPEN_CREATE_PALET_MODAL:
        draft.isOpenCreatePaletModal = !draft.isOpenCreatePaletModal;
        break;

      case actions.IS_OPEN_UPDATE_PALET_MODAL:
        draft.isOpenUpdatePaletModal = !draft.isOpenUpdatePaletModal;
        break;
        

      case actions.IS_OPEN_TEMPLATE_MODAL:
        draft.isOpenTemplateModal = !draft.isOpenTemplateModal;
        break;

      case actions.IS_OPEN_CANVAS_ITEM_CONFIG_MODAL:
        draft.isOpenCanvasItemConfigModal = !draft.isOpenCanvasItemConfigModal;
        break;

      case actions.GET_COLOURS_REQUEST_SUCCESS: {
        draft.colours = convertAllProductsToColourArray(action.payload.products);
      }
      break;

      case actions.CREATE_USER_COLOURS: {
        draft.userColours = {
          ...draft.userColours,
          ...action.payload
        };
      }
      break;

      case actions.ADD_COLOUR_ON_CANVAS: {
        if(!draft.coloursOnCanvas.some(item => item.id_product_attribute === action.payload.id_product_attribute)) {
          draft.coloursOnCanvas = [...draft.coloursOnCanvas, action.payload];
        }
        if(!draft.priceData.some(item => item.id_product_attribute === action.payload.id_product_attribute)) {
          draft.priceData = [...draft.priceData, action.payload];
        }
      }
      break;

      case actions.CONFIRM_MODAL_ACTION_DEFINE: {
        draft.confirmModalAction = { ...action.payload };
      }
      break;

      case actions.REMOVE_COLOUR_0N_CANVAS: {
        const colours = [...draft.coloursOnCanvas].filter((item) => item.id_product_attribute !== action.payload);
        draft.coloursOnCanvas = [...colours];

        const priceData = [...draft.priceData].filter((item) => item.id_product_attribute !== action.payload);
        draft.priceData = [...priceData];
      }
      break;

      case actions.UPDATED_COLOUR_DEFINE: {
        draft.updatedColour = {
          status: false,
          order: action.payload.order,
          from: (draft.colours.filter((item) => item.id_product_attribute === action.payload.from))[0],
          to: (draft.colours.filter(item => item.id_product_attribute === action.payload.to))[0],
        }
      }
      break;

      case actions.UPDATE_TO: {
        const initOrder = state.coloursOnCanvas.findIndex((item) => item.id_product_attribute === draft.updatedColour.from.id_product_attribute);
        draft.updatedColour = {
          ...draft.updatedColour,
          to: action.payload,
          order: initOrder
        }
      }
      break;

      case actions.UPDATE_ORDER_OF_UPDATED_COLOUR: {
        draft.updatedColour = {
          ...draft.updatedColour,
          order: action.payload,
        }
      }
      break;

      case actions.UPDATE_STATUS_OF_UPDATED_COLOUR: {
        draft.updatedColour = {
          ...draft.updatedColour,
          status: action.payload
        }
      }
      break;

      case actions.UPDATE_USER_COLOURS: {
        let cloneUserColours = [ ...draft.coloursOnCanvas ].map(item => {
          if(item.id_product_attribute === draft.updatedColour.from.id_product_attribute) {
            return {
              ...item,
              ...draft.updatedColour.to
            }
          }
          return item;
        });

        let priceData = [ ...draft.priceData ].map(item => {
          if(item.id_product_attribute === draft.updatedColour.from.id_product_attribute) {
            return {
              ...item,
              ...draft.updatedColour.to,
            }
          }
          return item;
        });

        // change order
        const fromIndex = cloneUserColours.findIndex(item => item.id_product_attribute === draft.updatedColour.to.id_product_attribute);
        const fromData = cloneUserColours[fromIndex];
        const toData = cloneUserColours[draft.updatedColour.order];
        cloneUserColours[fromIndex] = toData;
        cloneUserColours[draft.updatedColour.order] = fromData;

        draft.coloursOnCanvas = [...cloneUserColours];
        draft.priceData = [...priceData];
      }
      break;

      case actions.UPDATE_VISIBILITY_ON_CANVAS: {
        let coloursOnCanvas = [...draft.coloursOnCanvas].map(item => {
          if(item.id_product_attribute === action.payload) {
            return {
              ...item,
              visible: !item.visible
            }
          }
          return item;
        });

        draft.coloursOnCanvas = [...coloursOnCanvas];
      }
      break;

      case actions.UPDATE_SIZE:{
        let priceData = [ ...draft.priceData ].map(item => {
            return {
              ...item,
              m2: action.payload.size[item.id_product_attribute],
              price: action.payload.price[item.id_product_attribute] * action.payload.size[item.id_product_attribute],
            }
        });

        draft.priceData = [...priceData];
      }
      break;

      case actions.SAVE_USER_COLOURS: {
        draft.userColours = action.payload;
      }
      break;

      case actions.SET_USER_INFO: {
        draft.isLoggedIn = action.payload.isLoggedIn;
        draft.customerId = action.payload.customerId;
      }
      break;

      case actions.INIT_USER_DATA: {
        Object.assign(draft, action.payload);
      }
      break;

      case actions.GET_OBJECTS_REQUEST_SUCCESS: {
        if(action.payload.length) {
          Object.assign(draft, JSON.parse(action.payload.length[0]));
        }
      }
      break;

      case actions.SET_LANGUAGE: {
        draft.language = action.payload;
      }
      break;

      case actions.SET_ASSETS_PATH: {
        draft.assetsPath = action.payload;
      }
      break;

      default:
        break;
    }
  });
}