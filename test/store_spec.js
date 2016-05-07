import {Map, fromJS} from 'immutable';
import {expect} from 'chai';

import makeStore from '../src/store';
import {fees} from './mocks/fees';
import * as Actions from '../src/actions';

describe('store', () => {

  it('is a Redux store configured with the correct reducer', () => {
    const store = makeStore();
    expect(store.getState()).to.equal(Map());

    const date = Date.now();
    store.dispatch({
      type: Actions.FETCH_FEES_SUCCESS,
      fees: fees,
      timestamp: date
    });
    fees.timestamp = date;
    expect(store.getState()).to.equal(fromJS({ fees: fees }));
  });

});
