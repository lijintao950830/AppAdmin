import { Auth } from '@/utils/index';
import { LogoutOutlined } from '@ant-design/icons';
import { Dropdown } from 'antd';
// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
// 更多信息见文档：https://umijs.org/docs/api/runtime-config#getinitialstate
export async function getInitialState(): Promise<{ name: string }> {
  return { name: '@umijs/max' };
}
const AuthLogin = new Auth();

AuthLogin.getloginState();
export function render(oldRender: any) {
  if (!window.sessionStorage.getItem('token')) {
    location.href = '#/login';
  }
  oldRender();
}
export const layout = () => {
  return {
    logo: 'https://img.alicdn.com/tfs/TB1YHEpwUT1gK0jSZFhXXaAtVXa-28-27.svg',
    // menu: {
    //   locale: false,
    // },
    layout: 'mix',
    avatarProps: {
      src: 'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
      size: 'small',
      title:
        JSON.parse(sessionStorage.getItem('useInfo') || '')?.name || 'admin',
      render: (_: any, dom: any) => {
        return (
          <Dropdown
            menu={{
              items: [
                {
                  key: 'logout',
                  icon: <LogoutOutlined />,
                  label: '退出登录',
                },
              ],
            }}
          >
            {dom}
          </Dropdown>
        );
      },
    },
  };
};
