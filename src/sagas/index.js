/* eslint-disable no-constant-condition */
import { take, put, call, fork, select, takeEvery } from 'redux-saga/effects'
import * as actions from '../actions'
// import { getUser, getRepo, getStarredByUser, getStargazersByRepo } from '../reducers/selectors'
import { serverSave, walletLoad } from '../actions';
import * as PersistenceEngine from './persistence/engine';

function* helloSaga() {
  console.log("Hello Saga!")
}

function* byeSaga() {
  console.log("Bye Saga!")
}


// function* persistenceSaga() {
//   while (true) {
//     const action = yield take();
//     const state = yield select();
//     yield put(serverSave.request(action));
//     yield call(PersistenceEngine.save, state, action);
//     yield put(serverSave.success());
//   }
// }

function* walletLoadSaga() {
  const action = yield take();
  yield put(walletLoad.request());
  const state = yield call(PersistenceEngine.getWallet);
  yield put(walletLoad.success(state));
}


export default function* root() {
  yield [
    // fork(helloSaga),
    // fork(byeSaga),
    // fork(persistenceSaga),
    fork(walletLoadSaga)
  ]
}
