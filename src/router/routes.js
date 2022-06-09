import Home from '@/pages/Home';
import Search from '@/pages/Search';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import Detail from '@/pages/Detail';
import AddCartSuccess from '@/pages/AddCartSuccess';
import ShopCart from '@/pages/ShopCart';
import Trade from '@/pages/Trade';
import Pay from '@/pages/Pay';
import PaySuccess from '@/pages/PaySuccess';
// import Center from '@/pages/Center';
//二级组件
import myOrder from '@/pages/Center/myOrder';
import groupOrder from '@/pages/Center/groupOrder';

/*
当打包构建应用时，JavaScript 包会变得非常大，影响页面加载。
如果我们能把不同路由对应的组件分割成不同的代码块，
然后当路由被访问的时候才加载对应组件，这样就会更加高效。
*/

/*
const Home = () => import('@/pages/Home')
*/

export default [
  {
    path: '/center',
    //简化的写法，路由懒加载
    component: () => import('@/pages/Center'),
    meta: { ShowFooter: true },
    children: [
      {
        path: 'myOrder',
        component: myOrder,
      },
      {
        path: 'groupOrder',
        component: groupOrder,
      },
      { path: '/center', redirect: '/center/myOrder' },
    ],
  },
  {
    path: '/paySuccess',
    name: 'paySuccess',
    component: PaySuccess,
    meta: { ShowFooter: true },
  },
  {
    path: '/pay',
    name: 'pay',
    component: Pay,
    meta: { ShowFooter: true },
    beforeEnter: (to, from, next) => {
      if (from.path == '/trade') {
        next();
      } else {
        next(false);
      }
    },
  },
  {
    path: '/trade',
    name: 'trade',
    component: Trade,
    meta: { ShowFooter: true },
    beforeEnter: (to, from, next) => {
      if (from.path == '/shopCart') {
        next();
      } else {
        next(false);
      }
    },
  },
  {
    path: '/shopCart',
    name: 'shopCart',
    component: ShopCart,
    meta: { ShowFooter: true },
  },
  {
    path: '/addCartSuccess',
    name: 'addCartSuccess',
    component: AddCartSuccess,
    meta: { ShowFooter: true },
  },
  {
    path: '/home',
    component: Home,
    meta: { ShowFooter: true },
  },
  {
    path: '/search/:keyword?',
    // path: '/search',
    component: Search,
    meta: { ShowFooter: true },
    name: 'search',
    //新增配置项:props,给路由组件传递props参数
    //第一种布尔模式,相当于把params参数，作为props属性值传递给这个路由组件
    // props:true,

    //第二种:对象形式
    // props:{a:1,b:'我爱你'}

    //第三种写法:函数写法.一般是把query参数与params参数当中props传递给路由组件!!!
    //route就是当前路由
    // props:(route)=>{
    //      //是将当前箭头函数返回结果，作为props传递给search路由组件!!!
    //      return {a:route.params.keyword,b:'可以传递参数'};
    // }
  },
  {
    path: '/login',
    component: Login,
    //路由元信息
    meta: { ShowFooter: false },
  },
  {
    path: '/register',
    component: Register,
    meta: { ShowFooter: false },
  },
  {
    //params占位
    path: '/detail/:skuid',
    component: Detail,
    meta: { ShowFooter: true },
    name: 'detail',
  },
  //重定向
  {
    path: '*',
    redirect: '/home',
  },
];
