import { createAction } from 'redux-actions';
// import { http } from '../services';
import * as ActionTypes from '../constants/ActionTypes';
import * as Model from '../model';

export const loadWallet = createAction(ActionTypes.LOAD_WALLET, Model.loadWallet);
export const saveWallet = createAction(ActionTypes.SAVE_WALLET);
export const setGUID = createAction(ActionTypes.SET_GUID);
export const delAddress = createAction(ActionTypes.DEL_ADDRESS);
export const activateSecPass = createAction(ActionTypes.ACTIVATE_SEC_PASS);
export const deactivateSecPass = createAction(ActionTypes.DEACTIVATE_SEC_PASS);
export const verifyMnemonic = createAction(ActionTypes.VERIFY_MNEMONIC);
export const unVerifyMnemonic = createAction(ActionTypes.UNVERIFY_MNEMONIC);

export const encrypt = createAction(ActionTypes.ENCRYPT);
