import {
  reqCategoryList,
  mockReqGetBannerList,
  mockReqGetFloorsList,
} from '@/api';

const state = {
  //默认初始值的数据类型根据返回的数据类型决定
  categoryList: [],
  bannersList: [],
  floorsList: [],
};
const mutations = {
  CATEGORYLIST(state, categoryList) {
    state.categoryList = categoryList;
  },
  GETBANNERSLIST(state, bannersList) {
    state.bannersList = bannersList;
  },
  GETFLOORSLIST(state, floorsList) {
    state.floorsList = floorsList;
  },
};
const actions = {
  //通过API里的接口函数调用，向服务器发请求，获取数据
  async categoryList({ commit }) {
    let result = await reqCategoryList();
    if (result.code == 200) {
      commit('CATEGORYLIST', result.data);
    }
  },
  async getBannersList({ commit }) {
    let result = await mockReqGetBannerList();
    if (result.code == 200) {
      commit('GETBANNERSLIST', result.data);
    }
  },
  async getFloorsList({ commit }) {
    let result = await mockReqGetFloorsList();
    if (result.code == 200) {
      commit('GETFLOORSLIST', result.data);
    }
  },
};
const getters = {};

export default { state, mutations, actions, getters };
