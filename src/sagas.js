import { call, put } from 'redux-saga/effects';
import * as Actions from './actions';
// import fetch from 'isomorphic-fetch'

export function* helloSaga() {
  console.log('Hello Sagas!');
}

function fetchMerda(){
    return fetch('https://api.blockchain.info/fees')
      .then(response => response.json())
}

export function* loadTodos() {
    console.log("start my saga");
    yield put({ type: Actions.FETCH_FEES_REQUEST });
    const fees = yield call(fetchMerda)
    yield put({ type: Actions.FETCH_FEES_SUCCESS, fees: fees, timestamp: Date.now() });
}
