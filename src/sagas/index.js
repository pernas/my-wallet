/* eslint-disable no-constant-condition */
import { cancel, take, put, call, fork, select, takeEvery } from 'redux-saga/effects'
import * as actions from '../actions'
// import { getUser, getRepo, getStarredByUser, getStargazersByRepo } from '../reducers/selectors'
import { serverSave, walletLoad } from '../actions';
import * as PersistenceEngine from './persistence/engine';
import { getPersistenceType, PersistenceType } from './persistence/whitelist';

const DEBOUNCE_TIME = 3000; // debounce time in milliseconds

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function* helloSaga() {
  console.log("Hello Saga!")
}

function *save(state, action) {
  // yield put(serverSave.request(action));
  // try {
    yield call(PersistenceEngine.save, state, action);
    // yield put(serverSave.success());
  // } catch (e) {
    // yield put(serverSave.failure());
  // }
}

function *debounceSave(state) {
  try {
    yield call(delay, DEBOUNCE_TIME);
    yield call(save, state);
  } catch (e) {
    // empty exception handler because the cancel effect throws an exception
  }
}

// // signals to the UI that there are unsaved changes
// export function* signalPersistenceState() {
//   yield put(signalUnsavedChanges());
//   yield take(types.SERVER_SAVE_SUCCESS); // waits for a SERVER_SAVE success to continue
//   yield put(signalSavedChanges());
// }

function* persistenceLayer() {
  // if there's already a delay task running, we want to cancel it
  let debounceTask = null;
  // let unsavedTask = null;

  while (true) {
    const action = yield take();
    const type = getPersistenceType(action.type);
    if (!type) {
      continue;
    }
    const state = yield select();

    if (debounceTask) {
      yield cancel(debounceTask);
    }

    // if (!unsavedTask) {
    //   unsavedTask = yield fork(signalPersistenceState);
    //   unsavedTask.done.then(() => {
    //     unsavedTask = null;
    //   });
    // }

    if (type === PersistenceType.IMMEDIATE) {
      yield fork(save, state);	// save immediately
    } else if (type === PersistenceType.DEBOUNCE) {
      debounceTask = yield fork(debounceSave, state);
    }
  }
}

export default function* root() {
  yield [
    fork(helloSaga),
    fork(persistenceLayer)
  ]
}
