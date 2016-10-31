import { http } from '../services';
// import Maybe from 'data.maybe'
// import Task from 'data.task'
import { fromJS } from 'immutable';
import { Left, Right } from 'data.either';
import * as R from 'ramda';
import * as RL from 'ramda-lens';

import { liftA2 } from 'pointfree-fantasy';
import * as WCrypto from '../WalletCrypto';
import { parseJSON } from '../WalletJSON';

const immLens = key => RL.lens((x) => x.get(key), (val, x) => x.set(key, val));
const payload = R.lensProp('payload');
const ipayload = immLens('payload');

// loadWallet :: guid -> sharedKey -> password -> Task Error walletJSON
// export const loadWallet = (guid, sharedKey, password) =>
//   compose( map(WCrypto.decryptWallet(password))
//          , http.fetchWallet)(guid,sharedKey)

const decrypter = R.curry((password, encWrapper) => {
  const immEncWrapperNoPass = fromJS(encWrapper);
  const immEncWrapper = immEncWrapperNoPass.set('password', password);
  const encPayload = R.view(payload, encWrapper);
  const immDecPayloadE = WCrypto.decryptWallet(password, encPayload);
  const replacer = (d) => RL.set(R.compose(ipayload, ipayload), d, immEncWrapper);
  return immDecPayloadE.chain(replacer);
});

export const loadWallet = (guid, sharedKey, password) =>
  R.compose(
    R.map(decrypter(password)),
    R.map(R.over(payload, JSON.parse)),
    http.fetchWallet)(guid, sharedKey);


// encrypt :: string => Either Error TableForEncryption
export const encrypt = (password) => Right(password)


// export const saveWallet = () =>
//   compose( map(WCrypto.decryptWallet(password))
//          , http.fetchWallet)(guid,sharedKey)
