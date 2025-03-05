import actions from './actions';
import { produce } from 'immer';

import { convertAllProductsToColourArray } from 'utils/common'

/*import { colours } from "../../data/palet";*/

const initState = {
  isOpenConfirmModal: false,
  isOpenTemplateModal: false,
  isOpenCanvasItemConfigModal: false,
  isOpenCreatePaletModal: false,
  isOpenUpdatePaletModal: false,
  downloadPdf: false,

  imageBaseUrl: "https://clay.powdev.lt/",
  colours:[],
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
        


      case actions.GET_COLOURS: {
        draft.colours = convertAllProductsToColourArray(action.payload);
      }
      break;

      case actions.GET_COLOURS_REQUEST_SUCCESS: {

      }
      break;

      case actions.GET_PALLET_REQUEST:
        break;

      default:
        break;
    }
  });
}