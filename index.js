import 'babel-polyfill'
// app specific imports
import configureStore from './src/store/configureStore'
import {INITIAL_STATE} from './src/reducers'
import rootSaga from './src/sagas'

console.log(INITIAL_STATE)
const store = configureStore(INITIAL_STATE)
store.runSaga(rootSaga)
