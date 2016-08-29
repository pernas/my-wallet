import * as crypto from 'crypto'
import * as sjcl from 'sjcl'
import assert from 'assert'
import * as U from './utils'
import { curry } from 'ramda'
import { Left, Right } from 'data.either'
import { parseJSON } from '../WalletJSON'
import { fromJS } from 'immutable'


// decryptWallet :: Password -> JSON -> Either Error ImmutableWallet
export const decryptWallet = curry(
  (password, data) => parseJSON(data.payload)
                        .chain(decryptWrapper(password))
                        .chain(parseJSON)
                        .map(fromJS)
)

// decruptWrapper :: Password -> JSON -> Either Error String
const decryptWrapper = curry(
  function(password, wrapper){
    try {
      return Right(decryptDataWithPassword(wrapper.payload, password, wrapper.pbkdf2_iterations));
    } catch (e){
      return Left(e)
    }
  }
)

// stretchPassword :: password -> salt -> iterations -> keylen -> Buffer
function stretchPassword (password, salt, iterations, keylen) {

  assert(salt, 'salt missing');
  assert(password, 'password missing');
  assert(iterations, 'iterations missing');
  assert(typeof (sjcl.hash.sha1) === 'function', 'missing sha1, make sure sjcl is configured correctly');
  var hmacSHA1 = function (key) {
    var hasher = new sjcl.misc.hmac(key, sjcl.hash.sha1); // eslint-disable-line new-cap
    this.encrypt = hasher.encrypt.bind(hasher);
  };
  salt = sjcl.codec.hex.toBits(salt.toString('hex'));
  var stretched = sjcl.misc.pbkdf2(password, salt, iterations, keylen || 256, hmacSHA1);
  return new Buffer(sjcl.codec.hex.fromBits(stretched), 'hex');
}

// decryptDataWithPassword :: data -> password -> iterations -> options -> Buffer
function decryptDataWithPassword (data, password, iterations, options) {
  assert(data, 'data missing');
  assert(password, 'password missing');
  assert(iterations, 'iterations missing');

  var dataHex = new Buffer(data, 'base64');
  var iv = dataHex.slice(0, U.SALT_BYTES);
  var payload = dataHex.slice(U.SALT_BYTES);
  //  AES initialization vector is also used as the salt in password stretching
  var salt = iv;
  // Expose stretchPassword for iOS to override
  var key = stretchPassword(password, salt, iterations, U.KEY_BIT_LEN);
  var res = decryptBufferWithKey(payload, iv, key, options);
  return res;
}


// payload: (Buffer)
// iv: initialization vector (Buffer)
// key: AES key (256 bit Buffer)
// options: (optional)
// returns: decrypted payload (e.g. a JSON string)
function decryptBufferWithKey (payload, iv, key, options) {
  options = options || {};
  options.padding = options.padding || U.Iso10126;

  var decryptedBytes = U.AES.decrypt(payload, key, iv, options);
  return decryptedBytes.toString('utf8');
}
