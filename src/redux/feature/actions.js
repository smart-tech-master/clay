const actions = {
  IS_OPEN_CONFIRM_MODAL: 'IS_OPEN_CONFIRM_MODAL',
  IS_OPEN_TEMPLATE_MODAL: 'IS_OPEN_TEMPLATE_MODAL',
  IS_OPEN_CREATE_PALET_MODAL: 'IS_OPEN_CREATE_PALET_MODAL',
  IS_OPEN_UPDATE_PALET_MODAL: 'IS_OPEN_UPDATE_PALET_MODAL',
  IS_OPEN_CANVAS_ITEM_CONFIG_MODAL: 'IS_OPEN_CANVAS_ITEM_CONFIG_MODAL',

  CREATE_USER_COLOURS: 'CREATE_USER_COLOURS',
  ADD_COLOUR_ON_CANVAS: 'ADD_COLOUR_ON_CANVAS',
  REMOVE_COLOUR_0N_CANVAS: 'REMOVE_COLOUR_0N_CANVAS',
  UPDATED_COLOUR_ON_CANVAS: 'UPDATED_COLOUR_ON_CANVAS',
  CONFIRM_MODAL_ACTION_DEFINE: 'CONFIRM_MODAL_ACTION_DEFINE',
  UPDATED_COLOUR_DEFINE: 'UPDATE_COLOUR_DEFINE',
  UPDATE_TO: 'UPDATE_TO',
  UPDATE_STATUS_OF_UPDATED_COLOUR: 'UPDATE_STATUS_OF_UPDATED_COLOUR',
  UPDATE_ORDER_OF_UPDATED_COLOUR: 'UPDATE_ORDER_OF_UPDATED_COLOUR',
  UPDATE_USER_COLOURS: 'UPDATE_USER_COLOURS',
  UPDATE_VISIBILITY_ON_CANVAS: 'UPDATE_VISIBILITY_ON_CANVAS',
  UPDATE_SIZE: 'UPDATE_SIZE',
  SAVE_USER_COLOURS: 'SAVE_USER_COLOURS',

  INIT_USER_DATA: 'INIT_USER_DATA',
  SET_USER_INFO: 'SET_USER_INFO',
  GET_OBJECTS_REQUEST: 'GET_OBJECTS_REQUEST',
  GET_OBJECTS_REQUEST_SUCCESS: 'GET_OBJECTS_REQUEST_SUCCESS',
  SET_OBJECTS_REQUEST: 'SET_OBJECTS_REQUEST',
  SET_OBJECTS_REQUEST_SUCCESS: 'SET_OBJECTS_REQUEST_SUCCESS',
  GET_COLOURS_REQUEST: 'GET_COLOURS_REQUEST',
  GET_COLOURS_REQUEST_SUCCESS: 'GET_COLOURS_REQUEST_SUCCESS',
  ADD_PRODUCTS_REQUEST: 'ADD_PRODUCT',
  SET_LANGUAGE: 'SET_LANGUAGE',
  SET_ASSETS_PATH: 'SET_ASSETS_PATH',
  ADD_TO_CART_REQUEST: 'ADD_TO_CART_REQUEST',
  GET_DEFAULT_PALLET_REQUEST: 'GET_DEFAULT_PALLET_REQUEST',
  GET_DEFAULT_PALLET_REQUEST_SUCCESS: 'GET_DEFAULT_PALLET_REQUEST_SUCCESS',
  SET_PALLET_REQUEST: 'SET_PALLET_REQUEST',

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


  getColoursRequest: () => ({
    type: actions.GET_COLOURS_REQUEST,
  }),

  createUserColours: (payload) => ({
    type: actions.CREATE_USER_COLOURS,
    payload: payload,
  }),

  addColourOnCanvas: (payload) => ({
    type: actions.ADD_COLOUR_ON_CANVAS,
    payload
  }),
  
  removeColourOnCanvas: (payload) => ({
    type: actions.REMOVE_COLOUR_0N_CANVAS,
    payload
  }),

  updateColourOnCanvas: (payload) => ({
    type: actions.UPDATED_COLOUR_ON_CANVAS,
    payload
  }),

  confirmModalActionDefine: (payload) => ({
    type: actions.CONFIRM_MODAL_ACTION_DEFINE,
    payload
  }),

  updatedColourDataDefine: (payload) => ({
    type: actions.UPDATED_COLOUR_DEFINE,
    payload
  }),

  updateTo: (payload) => ({
    type: actions.UPDATE_TO,
    payload
  }),

  updateStatusOfUpdateColour: (payload) => ({
    type: actions.UPDATE_STATUS_OF_UPDATED_COLOUR,
    payload
  }),

  updateOrder: (payload) => ({
    type: actions.UPDATE_ORDER_OF_UPDATED_COLOUR,
    payload
  }),

  updateUserColours: () => ({
    type: actions.UPDATE_USER_COLOURS
  }),

  updateVisibilityOnCanvas: (payload) => ({
    type: actions.UPDATE_VISIBILITY_ON_CANVAS,
    payload
  }),

  updateSize: (payload) => ({
    type: actions.UPDATE_SIZE,
    payload
  }),

  saveUserColours: (payload) => ({
    type: actions.SAVE_USER_COLOURS,
    payload
  }),

  setUserInfo: (payload) =>({
    type: actions.SET_USER_INFO,
    payload
  }),

  initUserData: (payload) => ({
    type: actions.INIT_USER_DATA,
    payload
  }),

  setLanguage: (payload) => ({
    type: actions.SET_LANGUAGE,
    payload
  }),

  setAssetsPath: (payload) => ({
    type: actions.SET_ASSETS_PATH,
    payload
  }),

  addToCart: (payload) => ({
    type: actions.ADD_TO_CART_REQUEST,
    payload
  }),

  getDefaultPallet: () => ({
    type: actions.GET_DEFAULT_PALLET_REQUEST
  }),

  setPallet: (payload) => ({
    type: actions.SET_PALLET_REQUEST,
    payload
  }),
}

export default actions;