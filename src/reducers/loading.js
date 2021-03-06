import {SET_LOADING} from '../../src/constants';

const initialState = false;

export default function loadingReducer(state = initialState, action) {
  switch (action.type) {
    case SET_LOADING:
      return action.data;
    default:
      return state;
  }
}
