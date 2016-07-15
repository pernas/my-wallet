/* eslint-disable no-constant-condition */
import { take, put, call, fork, select } from 'redux-saga/effects'
import { api } from '../services'
import * as actions from '../actions'
// import { getUser, getRepo, getStarredByUser, getStargazersByRepo } from '../reducers/selectors'

// each entity defines 3 creators { request, success, failure }
const { fees } = actions


function* helloSaga() {
  console.log("Hello Saga!")
  console.log(fees);
  // while(true) {
  //   const {fullName} = yield take(actions.LOAD_MORE_STARGAZERS)
  //   yield fork(loadStargazers, fullName, true)
  // }
}

function* byeSaga() {
  console.log("Bye Saga!")
  // while(true) {
  //   const {fullName} = yield take(actions.LOAD_MORE_STARGAZERS)
  //   yield fork(loadStargazers, fullName, true)
  // }
}

// load user unless it is cached
function* loadFees(login, requiredFields) {
  // const user = yield select(getUser, login)
  // if (!user || requiredFields.some(key => !user.hasOwnProperty(key))) {
  //   yield call(fetchUser, login)
  // }
}

export default function* root() {
  yield [
    fork(helloSaga),
    fork(byeSaga)
  ]
}
