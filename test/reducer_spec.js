import {Map, fromJS} from 'immutable';
import {expect} from 'chai';

import reducer from '../src/reducer';
import {fees} from './mocks/fees';
import * as Actions from '../src/actions';

describe('reducer', () => {

  it('handles '+Actions.FETCH_FEES_SUCCESS , () => {
    const initialState = Map();
    const date  = Date.now();
    const action = {type: Actions.FETCH_FEES_SUCCESS, fees: fees, timestamp: date};
    const nextState = reducer(initialState, action);
    fees.timestamp = date;
    expect(nextState).to.equal(fromJS({fees: fees}));
  });

  it('handles '+Actions.UNKWNON_ACTION , () => {
    const initialState = Map();
    const action = {type: Actions.UNKWNON_ACTION, mydata: "my-data"};
    const nextState = reducer(initialState, action);
    expect(nextState).to.equal(initialState);
  });


});
