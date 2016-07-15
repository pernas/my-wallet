const REQUEST = 'REQUEST'
const SUCCESS = 'SUCCESS'
const FAILURE = 'FAILURE'

function createRequestTypes(base) {
  const res = {};
  [REQUEST, SUCCESS, FAILURE].forEach(type => res[type] = `${base}_${type}`)
  return res;
}

export const FEES = createRequestTypes('FEES')

export const LOAD_FEES = 'LOAD_FEES'

function action(type, payload = {}) {
  return {type, ...payload}
}

export const fees = {
  request: login => action(FEES.REQUEST, {login}),
  success: (login, response) => action(FEES.SUCCESS, {login, response}),
  failure: (login, error) => action(FEES.FAILURE, {login, error}),
}

export const loadFees = (login, requiredFields = []) => action(LOAD_USER_PAGE, {login, requiredFields})
