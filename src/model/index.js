import { http } from '../services'
// import Maybe from 'data.maybe'
// import Task from 'data.task'
import { fromJS } from 'immutable'
// import { Left, Right } from 'data.either'
import { curry
       , compose
       , map } from 'ramda'

import * as WCrypto from '../WalletCrypto'
import { parseJSON } from '../WalletJSON'


// loadWallet :: guid -> sharedKey -> password -> Task Error walletJSON
export const loadWallet = (guid, sharedKey, password) =>
  compose( map(WCrypto.decryptWallet(password))
         , http.fetchWallet)(guid,sharedKey)
