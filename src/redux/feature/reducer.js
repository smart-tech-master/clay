import actions from './actions';
import { produce } from 'immer';

import { colours } from "../../data/palet";

const initState = {
  imageBaseUrl: "https://clay.powdev.lt/",
  colours:[...colours],
}

export default function reducer(state = initState, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      case actions.GET_COLOURS: {

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