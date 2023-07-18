import { defineConfig } from '@umijs/max';
import routes from './src/routes';
export default defineConfig({
  antd: { configProvider: {}, appConfig: {} },
  access: {},
  model: {},
  initialState: {},
  request: {},
  hash: true,
  history: {
    type: 'hash', // router hash
  },
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  layout: {
    title: '@umijs/max',
  },
  // routes: [
  //   {
  //     path: '/',
  //     redirect: '/home',
  //   },
  //   {
  //     name: '首页',
  //     path: '/home',
  //     component: './Home',
  //   },
  //   {
  //     name: 'login',
  //     path: '/login',
  //     component: './Login',
  //     routes: [{ layout: false }],
  //   },
  //   {
  //     name: '用户数据',
  //     path: '/table',
  //     component: './Table',
  //   },
  //   {
  //     name: '视频管理',
  //     path: '/video',
  //     component: './TestVideo',
  //   },

  //   {
  //     name: '权限演示',
  //     path: '/access',
  //     component: './Access',
  //   },
  //   {
  //     name: '视频资源',
  //     path: '/VideoList',
  //     component: './VideoList',
  //   },
  //   {
  //     // name: '详情',
  //     path: '/table/userDetails/:id',
  //     component: './Table/page/UserDetails',
  //   },
  // ],
  ...routes,
  npmClient: 'yarn',
});
