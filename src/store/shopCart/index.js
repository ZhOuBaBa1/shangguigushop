import {
  reqGetCartList,
  reqDeleteCartById,
  reqUpdateChecked,
} from '@/api/index';

const state = {
  cartList: {},
};
const mutations = {
  GETCARTLIST(state, cartList) {
    state.cartList = cartList;
  },
};
const actions = {
  async getCartList({ commit }) {
    let result = await reqGetCartList();
    if (result.code == 200) {
      commit('GETCARTLIST', result.data);
    }
  },

  async deleteCartListBySkuId({ commit }, skuId) {
    let result = await reqDeleteCartById(skuId);
    if (result.code == 200) {
      return 'ok';
    } else {
      return Promise.reject(new Error('请求失败'));
    }
  },

  async updateCheckedByid({ commit }, { skuId, isChecked }) {
    let result = await reqUpdateChecked(skuId, isChecked);
    if (result.code == 200) {
      return 'ok';
    } else {
      return Promise.reject(new Error('请求失败'));
    }
  },

  //删除全部勾选的产品
  deleteAllCheckedCart({ dispatch, getters }) {
    //获取购物车中全部的商品
    let PromiseAll = [];
    getters.cartList.cartInfoList.forEach((item) => {
      let promise =
        item.isChecked == 1
          ? dispatch('deleteCartListBySkuId', item.skuId)
          : '';
      PromiseAll.push(promise);
    });
    return Promise.all(PromiseAll);
  },

  //修改全选状态
  updateAllCartIsChecked({ dispatch, state }, isChecked) {
    let PromiseAll = [];
    state.cartList[0].cartInfoList.forEach((item) => {
      let promise = dispatch('updateCheckedByid', {
        skuId: item.skuId,
        isChecked,
      });
      PromiseAll.push(promise);
    });
    return Promise.all(PromiseAll);
  },
};
const getters = {
  cartList() {
    return state.cartList[0] || {};
  },
  //不能直接计算出cartInfoList,类型错误
  //   cartInfoList() {
  //     return state.cartList.cartInfoList || [];
  //   },
};

export default { state, mutations, actions, getters };
