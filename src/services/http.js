var Async = require('control.async')(Task)
import 'isomorphic-fetch'
import Maybe from 'data.maybe'
import Task from 'data.task'
import { Left, Right } from 'data.either'
import { curry } from 'ramda'

export var API_BLOCKCHAIN_INFO = 'https://api.blockchain.info/'
export var BLOCKCHAIN_INFO     = 'https://blockchain.info/'
export var API_CODE            = '1770d5d9-bcea-4d28-ad21-6cbd5be018a8'

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

// checkStatus :: Response -> Task Error Response
const checkStatus = (r) =>
  r.ok ? Task.of(r) : Task.rejected({ initial_error: 'http network error, status ' + r.status })
  // r.ok ? Task.of(r) : Task.rejected(r)

// extractData :: Response -> Task Error (JSON | BLOB | TEXT)
const extractData = (r) => {
  const responseOfType = (t) => r.headers.get('content-type') && r.headers.get('content-type').indexOf(t) > -1
  switch (true) {
    case responseOfType('application/json'):
      return Async.fromPromise(r.json())
    case responseOfType('image/jpeg'):
      return Async.fromPromise(r.blob())
    default:
      return Async.fromPromise(r.text())
  }
}

// encodeFormData :: Object -> String
const encodeFormData = (data) =>
  Object.keys(data).map((k) => encodeURIComponent(k) + '=' + encodeURIComponent(data[k])).join('&')

////////////////////////////////////////////////////////////////////////////////
// API EXPORTS

// fetchWalletTask :: () -> Task Error JSON
export const fetchWallet = (guid, sharedKey) => {

  var data = {
    guid,
    sharedKey,
    method: 'wallet.aes.json',
    format: 'json'
  };

  var body = data ? encodeFormData(data) : '';

  var options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    credentials: 'omit'
  };

  options.body = body;
  const url    = BLOCKCHAIN_INFO + 'wallet';
  return Async.fromPromise(fetch(url, options))
                           .chain(checkStatus)
                           .chain(extractData)
}

// // [Todo] -> Boolean
// const isOfLengthTwo = compose(equals(2), length)
//
// // [Todo] -> Either Error [Todo]
// const testea = ifElse(isOfLengthTwo, Left, Right)
//
// // () -> Task Error [Todo]
// export const getTodoList = () => {
//
//   var options = {
//     method: 'GET',
//     headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
//     credentials: 'omit'
//   };
//
//   return Async.fromPromise(fetch('http://localhost:8000/todo/', options))
//                            .chain(checkStatus)
//                            .chain(extractData)
// };
//
// export const theGet = compose( map(testea) , getTodoList )
////////////////////////////////////////////////////////////////////////////////
// api services
// export const fetchFees = () => callApi(API_BLOCKCHAIN_INFO, 'fees/')
// export const fetchFees = login => callApi(`users/${login}`, userSchema)
// export const fetchRepo = fullName => callApi(`repos/${fullName}`, repoSchema)
// export const fetchStarred = url => callApi(url, repoSchemaArray)
// export const fetchStargazers = url => callApi(url, userSchemaArray)
