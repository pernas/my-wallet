import 'babel-polyfill'
import thunkMiddleware from 'redux-thunk'
import makeStore from './src/store';
import * as Actions from './src/actions';
import { helloSaga, loadTodos } from './src/sagas'

export const store = makeStore();
store.runSaga(loadTodos);
// console.log(store.getState());

// store.dispatch(Actions.fetchFessSuccess({fee1: 'myfees'}));

// console.log(store.getState());

// store.dispatch({type: 'SAVE_SCORE'});
// store.dispatch(Actions.fetchFees());
