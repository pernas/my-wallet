var Async = require('control.async')(Task)
import 'isomorphic-fetch'
import Maybe from 'data.maybe'
import Task from 'data.task'
import * as WCrypto from '../WalletCrypto';
import { Left, Right } from 'data.either'
import { curry, merge } from 'ramda'

export var API_BLOCKCHAIN_INFO = 'https://api.blockchain.info/'
export var BLOCKCHAIN_INFO     = 'https://blockchain.info/'
export var API_CODE            = '1770d5d9-bcea-4d28-ad21-6cbd5be018a8'
var SERVER_TIME_OFFSET         = null

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

const isNumber = function (num) {
  return typeof num === 'number' && !isNaN(num);
};

// sync clocks with network time protocol
const handleNTPResponse = curry((clientTime, obj) => {
  // Calculate serverTimeOffset using NTP algo
  var nowTime = (new Date()).getTime();
  if (obj.clientTimeDiff && obj.serverTime) {
    var serverClientResponseDiffTime = nowTime - obj.serverTime;
    var responseTime = (obj.clientTimeDiff - nowTime + clientTime - serverClientResponseDiffTime) / 2;
    var thisOffset = (serverClientResponseDiffTime - responseTime) / 2;
    if (isNumber(SERVER_TIME_OFFSET)) {
      SERVER_TIME_OFFSET = (SERVER_TIME_OFFSET + thisOffset) / 2;
    } else {
      SERVER_TIME_OFFSET = thisOffset;
    }
    console.log('Server Time offset ' + SERVER_TIME_OFFSET + 'ms - This offset ' + thisOffset);
  }
  return Task.of(obj);
});


// checkStatus :: Response -> Task Error Response
const checkStatus = (r) =>
  r.ok ? Task.of(r) : Task.rejected({ initial_error: 'http network error, status ' + r.status })
  // r.ok ? Task.of(r) : Task.rejected(r)

// extractData :: Response -> Task Error (JSON | BLOB | TEXT)
const extractData = (r) => {
  const responseOfType = (t) => r.headers.get('content-type') && r.headers.get('content-type').indexOf(t) > -1
  switch (true) {
    case responseOfType('application/json'):
      return Async.fromPromise(r.json())
    case responseOfType('image/jpeg'):
      return Async.fromPromise(r.blob())
    default:
      return Async.fromPromise(r.text())
  }
}

// encodeFormData :: Object -> String
const encodeFormData = (data) =>
  Object.keys(data).map((k) => encodeURIComponent(k) + '=' + encodeURIComponent(data[k])).join('&')

////////////////////////////////////////////////////////////////////////////////
// API EXPORTS

/* Permitted extra headers:
   sessionToken -> "Authorization Bearer <token>" */
export const request = (action, method, data, extraHeaders) => {
  data = data || {};
  if (API_CODE != null) data.api_code = API_CODE;

  var url = BLOCKCHAIN_INFO + method;
  var body = data ? encodeFormData(data) : '';
  var time = (new Date()).getTime();

  var options = {
    method: action,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    credentials: 'omit'
  };

  if (extraHeaders) {
    if (extraHeaders.sessionToken) {
      options.headers['Authorization'] = 'Bearer ' + extraHeaders.sessionToken;
    }
  }

  if (action === 'GET') url += '?' + body;
  if (action === 'POST') options.body = body;

  return Async.fromPromise(fetch(url, options))
                           .chain(checkStatus)
                           .chain(extractData)
                           .chain(handleNTPResponse(time))
};

// fetchWalletTask :: () -> Task Error JSON
export const fetchWallet = (guid, sharedKey) => {
  var data = { guid, sharedKey, method: 'wallet.aes.json', format: 'json'};
  return request('POST', 'wallet', data);
}
// const transformSharedKey = (sharedKey) => {
//   // Rather than sending the shared key plain text
//   // send a hash using a totp scheme
//   var now = new Date().getTime();
//   var timestamp = parseInt((now - SERVER_TIME_OFFSET) / 10000, 10);
//   var SKHashHex = WCrypto.sha256(sharedKey.toLowerCase() + timestamp).toString('hex');
//   var i = 0;
//   var tSKUID = SKHashHex.substring(i, i += 8) + '-' +
//                SKHashHex.substring(i, i += 4) + '-' +
//                SKHashHex.substring(i, i += 4) + '-' +
//                SKHashHex.substring(i, i += 4) + '-' +
//                SKHashHex.substring(i, i += 12);
//   return {
//     sharedKey: tSKUID,
//     sKTimestamp: timestamp,
//     sKDebugHexHash: SKHashHex,
//     sKDebugTimeOffset: SERVER_TIME_OFFSET,
//     sKDebugOriginalClientTime: now,
//     sKDebugOriginalSharedKey: sharedKey
//   };
// };
////////////////////////////////////////////////////////////////////////////////
// export const securePost = function (url, data, extraHeaders) {
//   const x = merge(data, transformSharedKey(data.sharedKey));
//   const y = merge({format: 'plain'}, x);
//   return request('POST', url, data, extraHeaders);
// };

// fetchWalletTask ::old() -> Task Error JSON

// export const oldfetchWallet = (guid, sharedKey) => {
//
//   var data = {
//     guid,
//     sharedKey,
//     method: 'wallet.aes.json',
//     format: 'json'
//   };
//
//   var body = data ? encodeFormData(data) : '';
//
//   var options = {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
//     credentials: 'omit'
//   };
//
//   options.body = body;
//   const url    = BLOCKCHAIN_INFO + 'wallet';
//   return Async.fromPromise(fetch(url, options))
//                            .chain(checkStatus)
//                            .chain(extractData)
// }
