import Vue from 'vue';
import Vuex from 'vuex';
//状态管理仓库，集中式管理项目中的组件共用的数据，一般适用于大型项目，state、mutations、actions、getters、modules

Vue.use(Vuex);
//state：仓库存储数据的地方，
// const state = {};
// //mutations：修改state的唯一手段
// const mutations = {};
// //actions:处理action，可以书写自己的业务逻辑，也可以处理异步
// const actions = {};
// //getters：理解为计算属性，用于简化仓库的数据，用于组件获取仓库的数据更加方便
// const getters = {};

//模块化仓库
import home from './home';
import search from './search';
import detail from './detail';
import shopCart from './shopCart';
import user from './user';
import trade from './Trade';

export default new Vuex.Store({
  modules: { home, search, detail, shopCart, user, trade },
});
