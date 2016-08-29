import { combineReducers } from 'redux-immutable';
import {Map, fromJS} from 'immutable';
import { Schema, arrayOf } from 'normalizr';

// import merge from 'lodash/object/merge'
// import paginate from './paginate'
// import { combineReducers } from 'redux'
import * as ActionTypes from '../constants/ActionTypes';
import * as WalletCrypto from '../WalletCrypto'


export const INITIAL_STATE = Map({
  walletState: Map({})
});


export default function guid (state = INITIAL_STATE, {type, payload, error}) {
  switch (type) {
    case ActionTypes.SET_GUID:
      return payload;
    default:
      return state;
  }
}


export default function walletLoader (state = INITIAL_STATE, {type, payload, error}) {
  switch (type) {
    case ActionTypes.LOAD_WALLET:
      if (error)
        return fromJS({error: payload})
      else
        return payload;
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  walletState: walletLoader,
  walletState: combineReducers({guid})
});

export default rootReducer
