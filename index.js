import 'babel-polyfill'
// app specific imports
import configureStore from './src/store/configureStore'
import {INITIAL_STATE} from './src/reducers'
import rootSaga from './src/sagas'
import * as Actions from './src/actions';
// import { http } from './src/services'

import * as WalletCrypto from './src/WalletCrypto'
// import * as crypto from 'crypto'
// import * as I from 'immutable'
// import * as R from 'ramda'
import Task from 'data.task'
var Async = require('control.async')(Task)

import {Left, Right} from 'data.either'
import Maybe from 'data.maybe'
import { Just, Nothing } from 'data.maybe'
import { ifElse, equals, length, __, gt, assoc, filter, curry, sequence, lensProp, lensIndex, compose, map, toUpper, reverse, replace} from 'ramda'
import { mapped, over, view, set, lens, iso, from} from 'ramda-lens'
import { Map, List } from 'immutable'
import { traverse, fold } from 'pointfree-fantasy'
import { createAction } from 'redux-actions';
import { parseJSON } from './src/WalletJSON'

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
// REDUX STORE

// must be deleted
const guid      = '';
const sharedKey = '';
const password  = '';

const store = configureStore(INITIAL_STATE)
// store.runSaga(rootSaga);
// store.dispatch({type: 'SOMETHING_FIRING_LOAD'});
// store.dispatch(loadTodos());
// store.dispatch(resultFiltered);
// console.log(parseJSON('{"hola": "3"}'))
store.dispatch(Actions.loadWallet(guid, sharedKey, password));
store.dispatch(Actions.setGUID('my-jaume-guid'));
store.close();
////////////////////////////////////////////////////////////////////////////////
// EXAMPLES OF CODE
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
// var x = api.fetchWalletTask()
// x.fork(console.log, console.log)
// console.log(api)
// console.log('///////////////////////////////////////////')
// var x = api.todoTask()
// x.fork(console.log, console.log)
// console.log(loadTodos())
// console.log('{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}');


////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
// EXAMPLES OF TASK HANDLING
//
// var f = (number) => new Task(
//   (rej, res) => {
//     if (number === 2) {
//       rej('error: is a two');
//     } else {
//       res(2*number);
//     }
//   }
//   )
//
//
// // Task.of(1).chain(f).fork(console.log, console.log)
// // f(1).chain(f).fork(console.log, console.log)
//
// const a = [10,20,30]
// const b = [4,1,2]
//
// const uniTask = sequence(Task.of, map(f, a))
// const uniTask2 = traverse(f, Task.of, a)
// const uniTask3 = compose(sequence(Task.of), map(f))
// // uniTask1.fork((x) => console.log('fail: ' + x), (x) => console.log('success: ' + x))
// // uniTask2.fork((x) => console.log('fail: ' + x), (x) => console.log('success: ' + x))
//
// uniTask3(a).fork((x) => console.log('fail: ' + x), (x) => console.log('success: ' + x))
// uniTask3(b).fork((x) => console.log('fail: ' + x), (x) => console.log('success: ' + x))

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
// RAMDA LENS EXAMPLES
// some data
// const addrs = [{street: '99 Walnut Dr.', zip: '04821'}, {street: '2321 Crane Way', zip: '08082'}]
// const user = {id: 3, name: 'Charles Bronson', addresses: addrs}


// const name = lensProp('name')
// console.log(view(name, user))
// console.log(user)
// const x = set(name, 'Richard Branson', user)
// console.log(x)
// console.log(user)
//
//
//
// const addresses = lensProp('addresses')
// const street = lensProp('street')
// const first = lensIndex(0)
//
// const firstStreet = compose(addresses, first, street)
//
// view(firstStreet, user)
// // 99 Walnut Dr.
//
// console.log(over(firstStreet, reverse, user))
//
// console.log('-----------')
// console.log(over(compose(mapped, mapped, mapped, name), toUpper, Task.of(Maybe.of([user]))))
//
// const addresses = lensProp('addresses')
// const street = lensProp('street')
// const allStreets = compose(addresses, mapped, street)
//
// //  :: Int -> Task Error User
// const getUser = id => new Task((rej, res) => setTimeout(() => res(user), 400))
//
// // profilePage :: User -> Html
// const profilePage = compose(map(x => `<span>${x.street}<span>`), view(addresses))
//
// // updateUser :: User -> User
// const updateUser = over(allStreets, replace(/\d+/, '****'))
//
// // renderProfile :: User -> Html
// const renderProfile = compose(map(compose(profilePage, updateUser)), getUser)
//
// renderProfile(1).fork(console.log, console.log)
// [ '<span>**** Walnut Dr.<span>', '<span>**** Crane Way<span>' ]
