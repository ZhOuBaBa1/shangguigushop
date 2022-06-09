//当前模块对Api进行统一管理

import requests from './request';
import mockRequests from './mockRequest';

//三级联动接口  //api/product/getBaseCategoryList get 无参数

export const reqCategoryList = () =>
  requests({ url: '/product/getBaseCategoryList', method: 'get' });

//mock 接口请求

export const mockReqGetBannerList = () => mockRequests.get('/banners');

export const mockReqGetFloorsList = () =>
  mockRequests({ url: '/floors', method: 'get' });

//获取搜索模块  地址：/api/list  获取方式： post

export const reqGetSearchInfo = (params) =>
  requests({ url: '/list', method: 'post', data: params });

//获取商品详情  /item/{skuid} get
export const reqGoodsInfo = (skuid) =>
  requests({ url: `/item/${skuid}`, method: 'get' });

//将产品添加到购物车中，或者更新某一个产品的个数
//   /api/cart/addToCart/{ skuId }/{ skuNum } post
export const reqAddOrUppdateShopCart = (skuId, skuNum) =>
  requests({
    url: `/cart/addToCart/${skuId}/${skuNum}`,
    method: 'post',
  });

//获取购物车列表 /api/cart/cartList
export const reqGetCartList = () =>
  requests({ url: '/cart/cartList', method: 'get' });

//删除购物车产品的接口 /api/cart/deleteCart/{skuId}  delete
export const reqDeleteCartById = (skuId) =>
  requests({ url: `/cart/deleteCart/${skuId}`, method: 'delete' });

//修改购物车中的选中状态  /api/cart/checkCart/{skuID}/{isChecked}
export const reqUpdateChecked = (skuId, isChecked) =>
  requests({ url: `/cart/checkCart/${skuId}/${isChecked}`, method: 'get' });

// 获取验证码接口  /api/user/passport/sendCode/{phone} get
export const reqGetCode = (phone) =>
  requests({ url: `/user/passport/sendCode/${phone}`, method: 'get' });

//用户注册  /api/user/passport/register    phone password code     post
export const reqRegister = (data) =>
  requests({ url: '/user/passport/register', method: 'post', data });

//登入接口 /api/user/passport/login    phone password    post
export const reqUserLogin = (data) =>
  requests({ url: '/user/passport/login', method: 'post', data });

//用户信息 /user/passport/auth/getUserInfo  get  需要带着token
export const reqUserInfo = () =>
  requests({ url: '/user/passport/auth/getUserInfo ', method: 'get' });

//用户退出登录接口  /api/user/passport/logout  get
export const reqLogout = () =>
  requests({ url: '/user/passport/logout', method: 'get' });

//获取用户地址信息接口  /api/user/userAddress/auth/findUserAddressList  get
export const reqAddressInfo = () =>
  requests({
    url: '/user/userAddress/auth/findUserAddressList',
    method: 'get',
  });

//获取订单交易信息 /api/order/auth/trade  get
export const reqGetOrderInfo = () =>
  requests({ url: '/order/auth/trade', method: 'get' });

//提交订单接口  /api/order/auth/submitOrder?tradeNo={tradeNo}  post  data
export const reqSubmitOrder = (tradeNo, data) =>
  requests({
    url: `/order/auth/submitOrder?tradeNo=${tradeNo}`,
    method: 'post',
    data,
  });

//订单支付 /api/payment/weixin/createNative/{orderId}  get
export const reqPayInfo = (orderId) =>
  requests({ url: `/payment/weixin/createNative/${orderId}`, method: 'get' });

//获取订单支付状态 /api/payment/weixin/queryPayStatus/{orderId}  get
export const reqPayStatus = (orderId) =>
  requests({ url: `/payment/weixin/queryPayStatus/${orderId}`, method: 'get' });

//获取个人中心的数据  /api/order/auth/{page}/{limit}  get
export const reqMyOrderList = (page, limit) =>
  requests({ url: `/order/auth/${page}/${limit}`, method: 'get' });
