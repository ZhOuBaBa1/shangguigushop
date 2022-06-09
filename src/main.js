import Vue from 'vue';
import App from './App.vue';
import router from '@/router';
//注册全局组件
import TypeNav from '@/components/TypeNav';
import Carousel from '@/components/Carousel';
import Pagination from '@/components/Pagination';
import { Button, MessageBox } from 'element-ui';
Vue.component(Button.name, Button);
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;

Vue.component(TypeNav.name, TypeNav);
Vue.component(Carousel.name, Carousel);
Vue.component(Pagination.name, Pagination);

import store from './store';

//引入MockServer.js
import '@/mock/mockServe';
import 'swiper/css/swiper.css';
import * as API from '@/api';
import VueLazyload from 'vue-lazyload';
import jzimg from '@/assets/1.gif';

//表单验证插件
import '@/pulgins/validate';

Vue.config.productionTip = false;
Vue.use(VueLazyload, {
  //懒加载的图片
  loading: jzimg,
});

new Vue({
  // el: '#app',
  render: (h) => h(App),
  //全局事件总线
  beforeCreate() {
    Vue.prototype.$bus = this;
    Vue.prototype.$API = API;
  },
  //注册路由,当这里书写router的时候组件身上都拥有$route,$router属性
  //$route获取路由信息 【路径、query、params等等】
  //$router一般进行编程式导航进行路由跳转【push|replac】
  router,
  store,
}).$mount('#app');
