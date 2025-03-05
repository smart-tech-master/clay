const actions = {
  IS_OPEN_CONFIRM_MODAL: 'IS_OPEN_CONFIRM_MODAL',
  IS_OPEN_TEMPLATE_MODAL: 'IS_OPEN_TEMPLATE_MODAL',
  IS_OPEN_CREATE_PALET_MODAL: 'IS_OPEN_CREATE_PALET_MODAL',
  IS_OPEN_UPDATE_PALET_MODAL: 'IS_OPEN_UPDATE_PALET_MODAL',
  IS_OPEN_CANVAS_ITEM_CONFIG_MODAL: 'IS_OPEN_CANVAS_ITEM_CONFIG_MODAL',
  CREATE_USER_PALET: 'CREATE_USER_PALET',
  UPDATE_USER_PALET: 'UPDATE_USER_PALET',
  ADD_CLAY_ON_CANVAS: 'ADD_CLAY_ON_CANVAS',
  REMOVE_CALY_ON_CANVAS: 'REMOVE_CALY_ON_CANVAS',
  DOWNLOAD_PDF: 'DOWNLOAD_PDF',
  CONFIRM_MODAL_ACTION_DEFINE: 'CONFIRM_MODAL_ACTION_DEFINE',
  CONFIRM_MODAL_ACTION: 'CONFIRM_MODAL_ACTION',
  UPDATED_CLAY_DATA_DEFINE: 'UPDATED_CLAY_DATA_DEFINE',
  UPDATE_TO: 'UPDATE_TO',
  UPDATE_CLAY_ON_CANVAS: 'UPDATE_CLAY_ON_CANVAS',
  UPDATE_STATUS_OF_UPDATED_CLAY_DATA: 'UPDATE_STATUS_OF_UPDATED_CLAY_DATA',
  UPDATE_ORDER_OF_UPDATED_CLAY_DATA: 'UPDATE_ORDER_OF_UPDATED_CLAY_DATA',
  UPDATE_ORDER_OF_CLAY_DATA_ON_CANVAS: 'UPDATE_ORDER_OF_CLAY_DATA_ON_CANVAS',
  UPDATE_CLAY_VISIBILITY_ON_CANVAS: 'UPDATE_CLAY_VISIBILITY_ON_CANVAS',
  UPDATE_CLAY_SIZE_ON_CANVAS: 'UPDATE_CLAY_SIZE_ON_CANVAS',

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

  createUserPalet: (payload) => ({
    type: actions.CREATE_USER_PALET,
    payload
  }),
  updateUserPalet: (payload) => ({
    type: actions.UPDATE_USER_PALET,
    payload
  }),
  addClayOnCanvas: (payload) => ({
    type: actions.ADD_CLAY_ON_CANVAS,
    payload
  }),
  removeClayOnCanvas: (payload) => ({
    type: actions.REMOVE_CALY_ON_CANVAS,
    payload
  }),
  updatedClayDataDefine: (payload) => ({
    type: actions.UPDATED_CLAY_DATA_DEFINE,
    payload
  }),
  updateTo: (payload) => ({
    type: actions.UPDATE_TO,
    payload
  }),
  updateStatusOfUpdatedClayData: (payload) => ({
    type: actions.UPDATE_STATUS_OF_UPDATED_CLAY_DATA,
    payload
  }),
  updateOrderOfUpdatedClayData: (payload) => ({
    type: actions.UPDATE_ORDER_OF_UPDATED_CLAY_DATA,
    payload
  }),
  updatedClayData: (payload) => ({
    type: actions.UPDATE_CLAY_ON_CANVAS
  }),
  updateOrderOfClayDataOnCanvas: (payload) => ({
    type: actions.UPDATE_STATUS_OF_UPDATED_CLAY_DATA
  }),
  updateVisibilityOnCanvas: (payload) => ({
    type: actions.UPDATE_CLAY_VISIBILITY_ON_CANVAS,
    payload
  }),
  updateSizeOnCanvas: (payload) => ({
    type: actions.UPDATE_CLAY_SIZE_ON_CANVAS,
    payload
  }),
  confirmModalActionDefine: (payload) => ({
    type: actions.CONFIRM_MODAL_ACTION_DEFINE,
    payload
  }),
  confirmModalAction: (payload) => ({
    type: actions.CONFIRM_MODAL_ACTION
  }),
  dowloadPdf: () => ({
    type: actions.DOWNLOAD_PDF
  })
}

export default actions;