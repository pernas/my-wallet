import { createAction } from 'redux-actions';
// import { http } from '../services';
import * as ActionTypes from '../constants/ActionTypes';
import * as Model from '../model';

export const loadWallet = createAction(ActionTypes.LOAD_WALLET, Model.loadWallet);
export const setGUID = createAction(ActionTypes.SET_GUID);
