import actions from './actions';
import { produce } from 'immer';

const initState = {
  pallet: ''
}

export default function reducer(state = initState, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      case actions.GET_PALLET_REQUEST:
        break;

      default:
        break;
    }
  });
}