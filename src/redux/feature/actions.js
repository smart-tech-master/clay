const actions = {
  IS_OPEN_CONFIRM_MODAL: 'IS_OPEN_CONFIRM_MODAL',
  IS_OPEN_TEMPLATE_MODAL: 'IS_OPEN_TEMPLATE_MODAL',
  IS_OPEN_CREATE_PALET_MODAL: 'IS_OPEN_CREATE_PALET_MODAL',
  IS_OPEN_UPDATE_PALET_MODAL: 'IS_OPEN_UPDATE_PALET_MODAL',
  IS_OPEN_CANVAS_ITEM_CONFIG_MODAL: 'IS_OPEN_CANVAS_ITEM_CONFIG_MODAL',

  isOpenConfirmModal: (action) => ({
    type: actions.IS_OPEN_CONFIRM_MODAL
  }),
  isOpenTemplateModal: (action) => ({
    type: actions.IS_OPEN_TEMPLATE_MODAL,
  }),
  isOpenCreatePaletModal: (action) => ({
    type: actions.IS_OPEN_CREATE_PALET_MODAL,
  }),
  isOpenUpdatePaletModal: () => ({
    type: actions.IS_OPEN_UPDATE_PALET_MODAL
  }),
  isOpenCanvasItemConfigModal: (action) => ({
    type: actions.IS_OPEN_CANVAS_ITEM_CONFIG_MODAL
  }),

  GET_COLOURS_REQUEST: 'GET_COLOURS_REQUEST',
  GET_COLOURS_REQUEST_SUCCESS: 'GET_COLOURS_REQUEST_SUCCESS',


  getColours: () => ({
    type: actions.GET_COLOURS
  }),
  getColoursRequest: () => ({
    type: actions.GET_COLOURS_REQUEST,
  }),




/*  GET_PALLET_REQUEST: 'GET_PALLET_REQUEST',
  getPalletRequest: ()=> ({
    type: actions.GET_PALLET_REQUEST,
  }),*/
}

export default actions;