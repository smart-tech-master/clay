const actions = {
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