import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import { createStore, applyMiddleware } from 'redux'
import reducer from './reducer';
// import * as sagas from './sagas'
import { helloSaga } from './sagas'
import createSagaMiddleware from 'redux-saga'



export default function makeStore() {

  const loggerMiddleware = createLogger()
  const sagaMiddleware = createSagaMiddleware()

  const store = createStore(
    reducer,
    applyMiddleware(
      thunkMiddleware, // lets us dispatch() functions
      loggerMiddleware, // neat middleware that logs actions
      sagaMiddleware
    )
  );
  store.runSaga = sagaMiddleware.run
  return store;
}
