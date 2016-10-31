import * as types from '../../constants/ActionTypes';

export const PersistenceType = {
  IMMEDIATE: 'IMMEDIATE',
  DEBOUNCE: 'DEBOUNCE'
};

const Whitelist = {
  [types.VERIFY_MNEMONIC]: PersistenceType.IMMEDIATE,
  [types.UNVERIFY_MNEMONIC]: PersistenceType.DEBOUNCE
};

export function getPersistenceType(type) {
  return Whitelist[type] || null;
}
