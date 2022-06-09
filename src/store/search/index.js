import { reqGetSearchInfo } from '@/api';

const state = {
  searchList: {},
};
const mutations = {
  GETSEARCHLIST(state, searchList) {
    state.searchList = searchList;
  },
};
const actions = {
  //获取search数据
  async getSearchList({ commit }, params = {}) {
    //params形参：是当用户派发action的时候，第二个参数传递过来的，至少是一个空对象
    let result = await reqGetSearchInfo(params);
    if (result.code == 200) {
      commit('GETSEARCHLIST', result.data);
    }
  },
};
//用于计算属性，在项目中主要的作用是简化仓库中的数据,组件中方便获取数据
const getters = {
  //当前形参state为仓库中的state，而非大仓库中的state
  goodsList(state) {
    //加入没有网应该返回一个空数组
    return state.searchList.goodsList || [];
  },
  trademarkList(state) {
    return state.searchList.trademarkList || [];
  },
  attrsList(state) {
    return state.searchList.attrsList || [];
  },
};

export default { state, mutations, actions, getters };
