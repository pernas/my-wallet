import {fromJS} from 'immutable';

export function setFees(state, fees, timestamp) {
  return state.set('fees', fromJS(fees))
              .setIn(["fees", "timestamp"], timestamp);
}
