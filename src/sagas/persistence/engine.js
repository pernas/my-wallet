import { http } from '../../services'
import { mapped, over, view, set, lens, iso, from} from 'ramda-lens'
import { compose } from 'ramda';
import * as WCrypto from '../../WalletCrypto';
import Task from 'data.task'
var Async = require('control.async')(Task)

const immLens = key => lens((x) => x.get(key), (val, x) => x.set(key, val))
const walletState = immLens('walletState')
const payloadChecksum = immLens('payload_checksum')
const payload = immLens('payload')
const guid = immLens('guid')
const sharedKey = immLens('sharedKey')
const password = immLens('password')
const pbkdf2Iterations = immLens('pbkdf2_iterations')

export function save(state) {
  console.log('Wallet Auto-Saving....');
  const walletIm = view(compose(walletState, payload, payload), state);
  const walletSerialized = JSON.stringify(walletIm, null, 2);
  const myPassword = view(compose(walletState, password), state);
  const myIterations = view(compose(walletState, payload, pbkdf2Iterations), state);
  const encrypted = WCrypto.encryptWallet(
      walletSerialized,
      myPassword,
      myIterations,
      // MyWallet.wallet.isUpgradedToHD ? 3.0 : 2.0
      3.0);
  const oldChecksum = view(compose(walletState, payloadChecksum), state);
  const myGUID = view(compose(walletState, payload, payload, guid), state);
  const mySharedKey = view(compose(walletState, payload, payload, sharedKey), state);
  const newChecksum = WCrypto.sha256(encrypted).toString('hex');

  var data = {
    guid: myGUID,
    sharedKey: mySharedKey,
    length: encrypted.length,
    payload: encrypted,
    checksum: newChecksum,
    old_checksum: oldChecksum,
    method: 'update',
    format: 'plain',
    language: 'en' // retrieve from the user (check original code - walltestore)
  };

  // check for old checksum (not always there)
  // if (Helpers.isHex(oldChecksum)) {
  //   data.old_checksum = oldChecksum;
  // }

  // check for syncPubkeys
  Async.toPromise(Promise, http.request('POST', 'wallet', data));
}
