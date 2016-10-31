import 'babel-polyfill'
import configureStore from './src/store/configureStore'
import { INITIAL_STATE } from './src/reducers'
import rootSaga from './src/sagas'
import * as Actions from './src/actions';
// import { http } from './src/services'

import * as WalletCrypto from './src/WalletCrypto'
// import * as crypto from 'crypto'
// import * as I from 'immutable'
// import * as R from 'ramda'
import Task from 'data.task'
var Async = require('control.async')(Task)

import { Left, Right} from 'data.either'
import Maybe from 'data.maybe'
import { Just, Nothing } from 'data.maybe'
import { concat, add, ifElse, equals, length, __, gt, assoc, filter, curry, sequence, lensProp, lensIndex, compose, map, toUpper, reverse, replace} from 'ramda'
import { mapped, over, view, set, lens, iso, from} from 'ramda-lens'
import { fromJS, merge, Seq, Map, List } from 'immutable'
import { liftA1, liftA2, traverse, fold } from 'pointfree-fantasy'
import { createAction } from 'redux-actions';
import { parseJSON } from './src/WalletJSON'
const readline = require('readline');
const prettyI = require("pretty-immutable");

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
// REDUX STORE
const guid = 'f9df366a-3fc3-4826-827f-fb3c1e8ce616';
const sharedKey = '00efae13-985b-4858-81ad-71bd8b5ac863';
const password = '100 cent';

const store = configureStore(INITIAL_STATE);
store.runSaga(rootSaga);
store.dispatch(Actions.loadWallet(guid, sharedKey, password));
// var f = fromJS({hola: 2, adeu: 4});
// console.log(JSON.stringify(f));
// const hola = fromJS({hola: 3});
// const adeu = fromJS({adeu: 10});
// const juntar = curry((x,y) => x.merge(y));
//
// var h = Task.of(Right(hola));
// var a = Task.of(Right(adeu));
// var f = liftA2(liftA2(juntar), h, a);
//
// f.fork(
//   function(error) { throw error }
// , function(data)  { console.log(data) }
// )


// var tres = Task.of(Right(fromJS({adeu: 10})));
// console.log(merge)
// var five = liftA2(liftA2(merge), dos, tres);
// // console.log(five);
// var tOfM = compose(Task.of, Maybe.of);
// var ctask = liftA2(liftA2(concat), tOfM('Rainy Days'), tOfM(' and Mondays'));
// ctask.fork(
//   function(error) { throw error }
// , function(data)  { console.log(data) }
// )

// const m3 = Maybe.of(3);
// const m5 = Maybe.of(5);
// const mm3 = Maybe.of(m3);
// const mm5 = Maybe.of(m5);
// // console.log(map(add, m3).ap(m5));
// //
// // console.log(Maybe.of(add).ap(m3).ap(m5));
// //
// // console.log(liftA2(add, m3, m5));
//
// const c = curry((x,y) => x + y)
// const tOfM = compose(Task.of, Maybe.of);
//
// const tema = liftA2(liftA2(add), mm3, mm5);
//
// // tema.map(x=>x.map(console.log))
// map(map(console.log))(tema)
// store.dispatch(Actions.saveWallet());
// store.dispatch({type: 'SOMETHING_FIRING_LOAD'});
// store.dispatch({type: 'SOMETHING_FIRING_SHIT'});
// store.dispatch({type: 'SOMETHING_FIRING_SHITsss'});
// store.dispatch({type: 'SOMETHING_FIRING_LOAD'});
// store.dispatch({type: 'SOMETHING_FIRING_LOAD'});

// store.dispatch(loadTodos());
// store.dispatch(resultFiltered);
// console.log(parseJSON('{"hola": "3"}'))
// store.subscribe(() => console.log('merda!'))
// store.close();

store.subscribe(() => {
  console.log('\n=================== Wallet State =====================')
  console.log(prettyI(store.getState()))
  console.log('======================================================')
})




const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
const cliWhile = () => {
  rl.question('Dispatch Action: ', (answer) => {
    let args = answer.split(" ");

    switch (args[0]) {

      case 'l':
      case 'load':
        console.log('dispatching load action')
        var g = args[1]
        var s = args[2]
        var p = args[3]
        store.dispatch(Actions.loadWallet(g, s, p));
        break;

      case 'quit':
      case 'q':
        console.log('bye bye');
        rl.close();
        process.exit(0);
        return;
        break;

      case 'guid':
        console.log('setting guid');
        var g = args[1]
        store.dispatch(Actions.setGUID(g));
        break;

      case 'delAddr':
        console.log('deleting legacy address');
        var addr = args[1]
        store.dispatch(Actions.delAddress(addr));
        break;

      case 'enc':
        console.log('activate second password');
        var pass = args[1]
        store.dispatch(Actions.activateSecPass(pass));
        break;

      case 'dec':
        console.log('deactivate second password');
        var pass = args[1]
        store.dispatch(Actions.deactivateSecPass(pass));
        break;

      case 'enc2':
        console.log('activate second password (alternative way)');
        var pass = args[1]
        store.dispatch(Actions.encrypt(pass));
        break;

      case 'verifyMnemonic':
        console.log('verifiy menmonic for hdwallet #');
        var hdWalletIndex = args[1]
        store.dispatch(Actions.verifyMnemonic(hdWalletIndex));
        break;

      case 'unVerifyMnemonic':
        console.log('unverifiy menmonic for hdwallet #');
        var hdWalletIndex = args[1]
        store.dispatch(Actions.unVerifyMnemonic(hdWalletIndex));
        break;

      default:
        console.log('Unknown command')
    }
    return cliWhile();
  });
}
cliWhile()

// store.runSaga(rootSaga);
// store.dispatch({type: 'SOMETHING_FIRING_LOAD'});
// store.dispatch(loadTodos());
// store.dispatch(resultFiltered);
// console.log(parseJSON('{"hola": "3"}'))
// store.subscribe(() => console.log('merda!'))
// store.close();
////////////////////////////////////////////////////////////////////////////////
// LENSES

// const addrs = [{street: '99 Walnut Dr.', zip: '04821'}, {street: '2321 Crane Way', zip: '08082'}]
// const user = {id: 3, name: 'Charles Bronson', addresses: addrs}
//
// const name = lensProp('name')
// // console.log(view(name, user))
// // console.log(set(name, 'Richard Branson', user))
// // console.log(over(name, toUpper, user))
// const addresses = lensProp('addresses')
// const street = lensProp('street')
// const first = lensIndex(0)
//
// const allStreets = compose(addresses, mapped, street)
// const firstStreet = compose(addresses, first, street)

// const immLens = key => lens((x) => x.get(key), (val, x) => x.set(key, val))
//
// const addrs = List.of(Map({street: '99 Walnut Dr.', zip: '04821'}), Map({street: '2321 Crane Way', zip: '08082'}))
// const user = Map({id: 3, name: 'bob', addresses: addrs})
//
// const addresses = immLens('addresses')
// const street = immLens('street')
// const allStreets = compose(addresses, mapped, street)
//
// console.log(view(addresses, user))
// console.log(view(firstStreet, user))
// const m = Maybe.of([user]);
// console.log(m);
// console.log(over(compose(mapped, mapped, name), toUpper, m));
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
