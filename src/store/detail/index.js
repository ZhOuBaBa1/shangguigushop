import { reqGoodsInfo, reqAddOrUppdateShopCart } from '@/api';
import { getUUID } from '@/utils/uuid_token';

const state = {
  goodInfo: {},
  //游客临时身份
  uuid_token: getUUID(),
};
const mutations = {
  GETGOODINFO(state, goodInfo) {
    state.goodInfo = goodInfo;
  },
};
const actions = {
  //通过API里的接口函数调用，向服务器发请求，获取数据
  async getGoodInfo({ commit }, skuid) {
    let result = await reqGoodsInfo(skuid);
    if (result.code == 200) {
      commit('GETGOODINFO', result.data);
    }
  },
  async addOrUppdateShopCart({ commit }, { skuId, skuNum }) {
    let result = await reqAddOrUppdateShopCart(skuId, skuNum);
    if (result.code == 200) {
      return 'ok';
    } else {
      return Promise.reject(new Error('请求失败'));
    }
  },
};
const getters = {
  categoryView(state) {
    return state.goodInfo.categoryView || {};
  },
  skuInfo(state) {
    return state.goodInfo.skuInfo || {};
  },
  //产品售卖属性
  spuSaleAttrList(state) {
    return state.goodInfo.spuSaleAttrList || [];
  },
};

export default { state, mutations, actions, getters };
