import 'babel-polyfill'
import thunkMiddleware from 'redux-thunk'
import makeStore from './src/store';
import * as Actions from './src/actions';

export const store = makeStore();

// console.log(store.getState());

// store.dispatch(Actions.fetchFessSuccess({fee1: 'myfees'}));

// console.log(store.getState());


store.dispatch(Actions.fetchFees());
// store.dispatch(Actions.fetchFees()).then(() =>
//   console.log(store.getState())
// )
