import {List, Map, fromJS} from 'immutable';
import {expect} from 'chai';

import {fees} from './mocks/fees';
import {setFees} from '../src/fees';

describe('Application logic', () => {

  describe('setFees', () => {

    it('adds the fees to the state', () => {
      const state = Map();
      const date  = Date.now();
      const nextState = setFees(state, fees, date);
      fees.timestamp = date;
      expect(nextState).to.equal(fromJS({ fees: fees }));
    });

  });

});
