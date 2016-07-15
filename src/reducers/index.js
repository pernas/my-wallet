import * as Actions from '../actions'
// import merge from 'lodash/object/merge'
// import paginate from './paginate'
// import { combineReducers } from 'redux'
import { combineReducers } from 'redux-immutable';
import {Map, fromJS} from 'immutable';

export const INITIAL_STATE = Map({
  // fees: Map({})
});

// // Updates an entity cache in response to any action with response.entities.
// function entities(state = fromJS({ fees: {} }), action) {
//   if (action.response && action.response.entities) {
//     return merge({}, state, action.response.entities)
//   }
//
//   return state
// }

// // Updates error message to notify about the failed fetches.
// function errorMessage(state = null, action) {
//   const { type, error } = action
//
//   if (type === ActionTypes.RESET_ERROR_MESSAGE) {
//     return null
//   } else if (error) {
//     return action.error
//   }
//
//   return state
// }



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
