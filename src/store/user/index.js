//登入和注册模块
import {
  reqGetCode,
  reqRegister,
  reqUserLogin,
  reqUserInfo,
  reqLogout,
} from '@/api';
import { setToken, getToken, removeToken } from '@/utils/token';

const state = {
  code: '',
  token: getToken(),
  userInfo: {},
};
const mutations = {
  GETKEYCODE(state, code) {
    state.code = code;
  },
  USERLOGIN(state, token) {
    state.token = token;
  },
  USERINFO(state, userInfo) {
    state.userInfo = userInfo;
  },
  CLEAR(state) {
    (state.token = ''), (state.userInfo = {}), removeToken();
  },
};
const actions = {
  async getKeyCode({ commit }, phone) {
    //获取验证码接口将验证码返回，但正常情况是后台将数据发送给用户
    let result = await reqGetCode(phone);
    if (result.code == 200) {
      //返回数据
      commit('GETKEYCODE', result.data);
      return 'ok';
    } else {
      return Promise.reject(new Error('failed'));
    }
  },

  async userRegister({ commit }, user) {
    let result = await reqRegister(user);

    if (result.code == 200) {
      //注册成功
      return 'ok';
    } else {
      //注册失败
      return Promise.reject(new Error(result.message));
    }
  },

  async userLogin({ commit }, data) {
    let result = await reqUserLogin(data);
    //服务器下发的token
    if (result.code == 200) {
      commit('USERLOGIN', result.data.token);
      setToken(result.data.token);
      return 'ok';
    } else {
      return Promise.reject(new Error(result.message));
    }
  },

  async getUserInfo({ commit }) {
    let result = await reqUserInfo();
    if (result.code == 200) {
      commit('USERINFO', result.data);
      return 'ok';
    } else {
      //注册失败
      return Promise.reject(new Error(result.message));
    }
  },

  async userLogout({ commit }) {
    let result = await reqLogout();
    //actions中不能操作state，需要提交mutations
    if (result.code == 200) {
      commit('CLEAR');
      return 'ok';
    } else {
      return Promise.reject(new Error(result.message));
    }
  },
};
const getters = {};
export default { state, mutations, actions, getters };
