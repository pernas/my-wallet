import * as Actions from '../actions'
// import merge from 'lodash/object/merge'
// import paginate from './paginate'
// import { combineReducers } from 'redux'
import { combineReducers } from 'redux-immutable';
import {Map} from 'immutable';

export const INITIAL_STATE = Map({
  // fees: Map({})
});


export default function fees(state = INITIAL_STATE, action) {
  // switch (action.type) {
  // case Actions.FETCH_FEES_SUCCESS:
  //   return setFees(state, action.fees, action.timestamp);
  // }
  return state;
}

const rootReducer = combineReducers({
  fees
})

export default rootReducer
