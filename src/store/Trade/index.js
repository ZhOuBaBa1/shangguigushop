import { reqAddressInfo, reqGetOrderInfo } from '@/api';

const state = {
  userAddress: [],
  orderInfo: {},
};
const mutations = {
  USERADDRESS(state, userAddress) {
    state.userAddress = userAddress;
  },
  GETORDERINFO(state, orderInfo) {
    state.orderInfo = orderInfo;
  },
};
const actions = {
  async getUserAddress({ commit }) {
    let result = await reqAddressInfo();
    if (result.code == 200) {
      commit('USERADDRESS', result.data);
      return 'ok';
    } else {
      return Promise.reject(new Error('请求失败'));
    }
  },

  async getOrderInfo({ commit }) {
    let result = await reqGetOrderInfo();
    if (result.code == 200) {
      commit('GETORDERINFO', result.data);
      return 'ok';
    } else {
      return Promise.reject(new Error(result.message));
    }
  },
};
const getters = {
  detailArrayList() {
    return state.orderInfo.detailArrayList || [];
  },
};

export default { state, mutations, actions, getters };
