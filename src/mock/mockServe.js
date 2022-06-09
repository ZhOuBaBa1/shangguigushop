//先引入 mockjs模块
import Mock from 'mockjs';

//引入JSON数据
//webpack中默认对外暴露的：图片、JSON数据格式
import banners from './banners.json';
import floors from './floors.json';

//mock数据：第一个参数请求地址  第二个参数：请求的数据
Mock.mock('/mock/banners', { code: 200, data: banners });
Mock.mock('/mock/floors', { code: 200, data: floors });
