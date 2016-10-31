import { combineReducers } from 'redux-immutable';
import { List, Map, fromJS} from 'immutable';
import { Schema, arrayOf } from 'normalizr';

// import merge from 'lodash/object/merge'
// import paginate from './paginate'
// import { combineReducers } from 'redux'

// lens imports
import { ifElse, equals, length, __, gt, assoc, filter,
         curry, sequence, lensProp, lensIndex, compose,
         map, toUpper, reverse, replace }
         from 'ramda'
import { mapped, over, view, set, lens, iso, from } from 'ramda-lens'

import * as ActionTypes from '../constants/ActionTypes';
import * as WCrypto from '../WalletCrypto'
import reduceReducers from 'reduce-reducers'


// lens definitions:
const immLens = key => lens((x) => x && x.get(key), (val, x) => x && x.set(key, val))


// const mnemonic_verified = immLens('mnemonic_verified')
const guidLens = immLens('guid')
const sharedKeyLens = immLens('sharedKey')
const optionsLens = immLens('options')
const pbkdf2IterationsLens = immLens('pbkdf2_iterations')

var encrypt = (msg) => msg;
var decrypt = (msg) => msg;

export const INITIAL_STATE = Map({
  walletState: Map({})
});

function guid (state = "", {type, payload, error}) {
  switch (type) {
    case ActionTypes.SET_GUID:
      return payload;
    default:
      return state;
  }
}

// function account (state = Map({}), {type, payload, error}) {
//   switch (type) {
//     case ActionTypes.VERIFY_MNEMONIC:
//       const mnemonic_verified = immLens('mnemonic_verified')
//       return set(mnemonic_verified, true, state);
//     default:
//       return state;
//   }
// }

function hd_wallet (state = Map({}), {type, payload, error}) {
  switch (type) {
    case ActionTypes.VERIFY_MNEMONIC:
      return set(immLens('mnemonic_verified'), true, state);
    case ActionTypes.UNVERIFY_MNEMONIC:
      return set(immLens('mnemonic_verified'), false, state);
    case ActionTypes.ACTIVATE_SEC_PASS:
      // const shouldFail = msg => {throw 'FUCK!!'};
      // return over(immLens('seed_hex'), shouldFail, state)
      return over(immLens('seed_hex'), encrypt(payload), state);
    case ActionTypes.DEACTIVATE_SEC_PASS:
      // const shouldFail = msg => {throw 'FUCK!!'};
      // return over(immLens('seed_hex'), shouldFail, state)
      return over(immLens('seed_hex'), decrypt(payload), state);

    default:
      return state;
  }
}

function hd_wallets (state = List([]), {type, payload, error}) {
  const HDWalletLens = immLens(payload);
  switch (type) {
    case ActionTypes.VERIFY_MNEMONIC:
    case ActionTypes.UNVERIFY_MNEMONIC:
      // should run over the selected hd-wallet
      return over(HDWalletLens, h => hd_wallet(h, {type, payload, error}), state);
    case ActionTypes.DEACTIVATE_SEC_PASS:
    case ActionTypes.ACTIVATE_SEC_PASS:
      // should run over all hd-wallets
      return over(mapped, h => hd_wallet(h, {type, payload, error}), state);
    default:
      return state
  }
}

function key (state = Map({}), {type, payload, error}) {
  switch (type) {
    case ActionTypes.ACTIVATE_SEC_PASS:
      return state.update('priv', encrypt(payload));
    case ActionTypes.DEACTIVATE_SEC_PASS:
      return state.update('priv', decrypt(payload));
    default:
      return state;
  }
}

// shan de revisar els initial states
function keys (state = List([]), {type, payload, error}) {
  switch (type) {
    case ActionTypes.DEL_ADDRESS:
      return state.rest();
    case ActionTypes.DEACTIVATE_SEC_PASS:
    case ActionTypes.ACTIVATE_SEC_PASS:
      return state.map(k => key(k, {type, payload, error}));
    default:
      return state;
  }
}

const payloadReducer = (state = Map({}), action) => {

  // set second password encryption function
  const sk = view(sharedKeyLens, state);
  const it = view(compose(optionsLens, pbkdf2IterationsLens), state);
  encrypt = WCrypto.encryptSecPass(sk, it);
  // TODO :: problem: if second password is wrong wipe all decrypted fields
  decrypt = WCrypto.decryptSecPass(sk, it);
  return combineReducers({
    guid,
    keys,
    hd_wallets
  })(state, action);
}

const wrapperPayloadReducer = combineReducers({
  payload: payloadReducer
});

const walletReducer = combineReducers({
  payload: wrapperPayloadReducer
});

function walletLoader (state = INITIAL_STATE, {type, payload, error}) {
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

const walletState = reduceReducers(walletLoader, walletReducer)
// const walletState = reduceReducers(walletLoader)

const rootReducer = combineReducers({
  walletState
});

export default rootReducer
