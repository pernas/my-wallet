import { createStore, applyMiddleware, compose } from 'redux';
import createLogger from 'redux-logger';
import createSagaMiddleware, { END } from 'redux-saga';
import rootReducer from '../reducers';
import futureMiddleware from 'redux-future';
import eitherMiddleware from 'redux-either';
const Either = require('data.either');

export default function configureStore (initialState) {
  const sagaMiddleware = createSagaMiddleware();
  const loggerMiddleware = createLogger();

  const store = createStore(
    rootReducer,
    initialState,
      applyMiddleware(
        futureMiddleware,
        loggerMiddleware,
        eitherMiddleware(Either, (l, r, e) => e.fold(l, r)),
        sagaMiddleware
      )
  );
  store.runSaga = sagaMiddleware.run;
  store.close = () => store.dispatch(END);
  return store;
}
