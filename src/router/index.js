import store from '@/store';
import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import routes from './routes';

//备份一份push方法
const originPush = VueRouter.prototype.push;
const originreplace = VueRouter.prototype.replace;

// 重写push/replace
VueRouter.prototype.push = function (location, resolve, reject) {
  if (resolve && reject) {
    originPush.call(this, location, resolve, reject);
  } else {
    originPush.call(
      this,
      location,
      () => {},
      () => {}
    );
  }
};

VueRouter.prototype.replace = function (location, resolve, reject) {
  if (resolve && reject) {
    originreplace.call(this, location, resolve, reject);
  } else {
    originreplace.call(
      this,
      location,
      () => {},
      () => {}
    );
  }
};

let router = new VueRouter({
  // 配置路由
  routes,
  scrollBehavior() {
    //跳转路由后滚动条位置在最上方
    return { y: 0 };
  },
});

router.beforeEach(async (to, from, next) => {
  // next:放行的函数,一般需要加判断条件
  let token = store.state.user.token;
  let name = store.state.user.userInfo.name;
  if (token) {
    if (to.path == '/login') {
      next('/');
    } else {
      //登录后，跳转的不是login，需要判断是否有name
      if (name) {
        next();
      } else {
        try {
          await store.dispatch('getUserInfo');
          next();
        } catch (error) {
          //token 失效了，重新登入
          await store.dispatch('userLogout');
          next('/login');
        }
      }
    }
  } else {
    //未登录不能去交易相关
    let toPath = to.path;
    if (
      toPath.indexOf('/trade') != -1 ||
      toPath.indexOf('/pay') != -1 ||
      toPath.indexOf('/center') != -1
    ) {
      next('/login?redirect=' + toPath);
    } else {
      next();
    }
  }
});

export default router;
