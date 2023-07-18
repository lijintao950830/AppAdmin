export default {
  routes: [
    { path: '/login', component: '@/pages/Login', layout: false },
    {
      path: '/',
      component: '@/layouts/index',
      menu: {
        flatMenu: true,
      },
      routes: [
        {
          path: '/',
          redirect: '/data',
        },
        {
          name: '数据',
          path: '/data',
          routes: [
            { path: '/data', redirect: 'data/list' },
            {
              path: '/data/list',
              name: '视频数据',
            },
            {
              path: '/data/user',
              name: '用户行为数据',
            },
            {
              path: '/data/video',
              name: '视频点击数据',
            },
          ],
        },
        {
          name: '数据',
          path: '/table',
          component: '@/pages/Table',
        },
        {
          name: '视频管理',
          path: '/video',
          component: '@/pages/TestVideo',
        },

        {
          name: '权限演示',
          path: '/access',
          component: '@/pages/Access',
        },
        {
          name: '视频资源',
          path: '/VideoList',
          component: '@/pages/VideoList',
        },
        {
          // name: '详情',ßß
          path: '/table/userDetails/:id',
          component: '@/pages/Table/page/UserDetails',
        },
        {
          name: '运营',
          path: '/operation',
          component: '@/pages/Operation',
        },
      ],
    },
  ],
};
