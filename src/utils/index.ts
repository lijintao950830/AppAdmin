import cloudbase from '@cloudbase/js-sdk';
import { formatTime } from './format';

const app = cloudbase.init({
  env: 'cloud1-5grmes7r14f01703',
  region: 'ap-shanghai',
});
const auth = app.auth({
  persistence: 'local',
});

class Auth {
  async getloginState() {
    await auth.anonymousAuthProvider().signIn();
    const loginState = await auth.getLoginState();
    return loginState;
  }
}
// async function Auth() {
//   await auth.anonymousAuthProvider().signIn();
//   // 匿名登录成功检测登录状态isAnonymous字段为true
//   const loginState = await auth.getLoginState();
//   console.log(loginState); // true
// }

export { formatTime, Auth };
