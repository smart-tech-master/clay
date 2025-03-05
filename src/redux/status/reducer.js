import actions from './actions';

import { paletData } from "../../data/palet";
import claysOnCanvas from "../../components/OnCanvas/ClaysOnCanvas";

const initState = {
  isOpenConfirmModal: false,
  isOpenTemplateModal: false,
  isOpenCanvasItemConfigModal: false,
  isOpenCreatePaletModal: false,
  isOpenUpdatePaletModal: false,
  downloadPdf: false,

  confirmModalAction: {},

  paletData:[...paletData],
  userPaletData: {},
  claysDataOnCanvas:[],
  priceDataOfClaysOnCanvas:[],
  updatedClayData: {
    status: false,
    from: paletData[0],
    to: paletData[0],
    order: 0
  }
};

export default function statusReducer(state = initState, action) {
  switch (action.type) {
    case actions.IS_OPEN_CONFIRM_MODAL:
      return {
        ...state,
        isOpenConfirmModal: !state.isOpenConfirmModal
      };

    case actions.IS_OPEN_CREATE_PALET_MODAL:
      return {
        ...state,
        isOpenCreatePaletModal: !state.isOpenCreatePaletModal
      }

    case actions.IS_OPEN_UPDATE_PALET_MODAL:
      return {
        ...state,
        isOpenUpdatePaletModal: !state.isOpenUpdatePaletModal
      }

    case actions.IS_OPEN_TEMPLATE_MODAL:
      return {
        ...state,
        isOpenTemplateModal: !state.isOpenTemplateModal
      }

    case actions.IS_OPEN_CANVAS_ITEM_CONFIG_MODAL:
      return {
        ...state,
        isOpenCanvasItemConfigModal: !state.isOpenCanvasItemConfigModal
      }

    case actions.CREATE_USER_PALET:
      return {
        ...state,
        userPaletData: { ...state.userPaletData, ...action.payload }
      }

    case actions.ADD_CLAY_ON_CANVAS:
      if(state.claysDataOnCanvas.some(item => item.name === action.payload.name)) return {...state};
      if(state.priceDataOfClaysOnCanvas.some(item => item.name === action.payload.name)) return {...state};

      return {
        ...state,
        claysDataOnCanvas: [ ...state.claysDataOnCanvas, Object.assign({...action.payload}, {fixed_index : state.claysDataOnCanvas.length} )],
        priceDataOfClaysOnCanvas: [ ...state.priceDataOfClaysOnCanvas, Object.assign({...action.payload}, {fixed_index : state.priceDataOfClaysOnCanvas.length} )]
      }

    case actions.REMOVE_CALY_ON_CANVAS:
      const clays = state.claysDataOnCanvas.filter((item, index) => item.name !== action.payload);
      const prices = state.priceDataOfClaysOnCanvas.filter((item, index) => item.name !== action.payload);
      return {
        ...state,
        claysDataOnCanvas: [ ...clays ],
        priceDataOfClaysOnCanvas: [...prices]
      }

    case actions.CONFIRM_MODAL_ACTION_DEFINE:
      return {
        ...state,
        confirmModalAction: { ...action.payload }
      }

    case actions.UPDATED_CLAY_DATA_DEFINE:
      return {
        ...state,
        updatedClayData: {
          status: false,
          from: (paletData.filter((item, index) => item.name === action.payload.from))[0],
          to: (paletData.filter(item => item.name === action.payload.to))[0],
          order: action.payload.order,
        }
      }

    case actions.UPDATE_TO:
      const initOrder = state.claysDataOnCanvas.findIndex((item) => item.name === state.updatedClayData.from.name);
      return {
        ...state,
        updatedClayData: {
          ...state.updatedClayData,
          to: action.payload,
          order: initOrder
        }
      }

    case actions.UPDATE_STATUS_OF_UPDATED_CLAY_DATA:
      return {
        ...state,
        updatedClayData: {
          ...state.updatedClayData,
          status: action.payload
        }
      }

    case actions.UPDATE_ORDER_OF_UPDATED_CLAY_DATA:
      return {
        ...state,
        updatedClayData: {
          ...state.updatedClayData,
          order: action.payload
        }
      }

    case actions.UPDATE_CLAY_ON_CANVAS:
      let cloneClayDataOnCanvas = [ ...state.claysDataOnCanvas ].map(item => {
        if(item.name === state.updatedClayData.from.name) {
          return {
            ...item,
            name: state.updatedClayData.to.name,
            src: state.updatedClayData.to.src,
          }
        }
        return item;
      });

      let clonePriceDataOfClaysOnCanvas = [ ...state.priceDataOfClaysOnCanvas ].map(item => {
        if(item.name === state.updatedClayData.from.name) {
          return {
            ...item,
            name: state.updatedClayData.to.name,
            src: state.updatedClayData.to.src,
            size: item.size
          }
        }
        return item;
      });

      // change order
      const fromIndex = cloneClayDataOnCanvas.findIndex(item => item.name === state.updatedClayData.to.name);
      const fromData = cloneClayDataOnCanvas[fromIndex];
      const toData = cloneClayDataOnCanvas[state.updatedClayData.order];
      cloneClayDataOnCanvas[fromIndex] = toData;
      cloneClayDataOnCanvas[state.updatedClayData.order] = fromData;

      return {
        ...state,
        claysDataOnCanvas: [ ...cloneClayDataOnCanvas ],
        priceDataOfClaysOnCanvas: [...clonePriceDataOfClaysOnCanvas]
      }

    case actions.UPDATE_CLAY_VISIBILITY_ON_CANVAS:

      let result = state.claysDataOnCanvas.map(item => {
        if(item.name === action.payload) {
          return {
            ...item,
            visible: !item.visible
          }
        }
        return item;
      });

      return {
        ...state,
        claysDataOnCanvas: [...result]
      }

    case actions.UPDATE_ORDER_OF_CLAY_DATA_ON_CANVAS:
      return {...state};

    case actions.UPDATE_CLAY_SIZE_ON_CANVAS: {
      let clonePriceDataOfClaysOnCanvas = [...state.priceDataOfClaysOnCanvas];

      clonePriceDataOfClaysOnCanvas = clonePriceDataOfClaysOnCanvas.map(item => {
        return {
          ...item,
          size: action.payload[item.name]
        }
      })
      return {
        ...state,
        priceDataOfClaysOnCanvas: [...clonePriceDataOfClaysOnCanvas],
      };
    }

    case actions.DOWNLOAD_PDF:
      return {
        ...state,
        downloadPdf: !state.downloadPdf
      }

    // case actions.OPEN_PALLET_CREATE_MODAL:
    //   return Object.assign({}, {...state}, { palletCreateModal: !state.palletCreateModal });

    default:
      break;
  }
  return state;
}