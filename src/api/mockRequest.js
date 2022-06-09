// axios的二次封装
import axios from 'axios';
//请求进度条
import nprogress from 'nprogress';
import 'nprogress/nprogress.css';

const mockRequests = axios.create({
  //发送请求时，路径中会出现下列字符
  baseURL: '/mock',
  timeout: 5000, //超时时间
});

//请求拦截器，在发送请求之前，请求拦截器可以检测到发送请求之前需要做的一些事件
mockRequests.interceptors.request.use((config) => {
  //config： 配置对象，对象中有一个属性很重要，Header请求头
  nprogress.start();
  return config;
});

mockRequests.interceptors.response.use(
  (res) => {
    //成功的回调函数，服务器响应数据后，响应拦截器可以检测到，可以做一些事件
    nprogress.done();
    return res.data;
  },
  (error) => {
    //响应失败的回调函数
    console.log(error);
    return Promise.reject(new Error('faile'));
  }
);

export default mockRequests;
