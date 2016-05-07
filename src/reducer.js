import {setFees} from './fees';
import {INITIAL_STATE} from './core';
import * as Actions from './actions'

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case Actions.FETCH_FEES_SUCCESS:
    return setFees(state, action.fees, action.timestamp);
  }
  return state;
}
