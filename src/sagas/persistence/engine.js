import { api } from '../../services'

export function save(state) {
  // window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  return Promise.resolve({});
}

export function getWallet() {
  console.log('====> MYLOG :: real getWallet running...');
  return api.fetchWallet();
}
