/* eslint-disable no-constant-condition */
import { take, put, call, fork, select } from 'redux-saga/effects'
import { api } from '../services'
import * as actions from '../actions'
// import { getUser, getRepo, getStarredByUser, getStargazersByRepo } from '../reducers/selectors'

// each entity defines 3 creators { request, success, failure }
// const { user, repo, starred, stargazers } = actions


function* helloSaga() {
  console.log("Hello Saga!")
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

export default function* root() {
  yield [
    fork(helloSaga),
    fork(byeSaga)
  ]
}
