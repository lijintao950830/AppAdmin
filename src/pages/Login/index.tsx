import { login } from '@/services';
import { Button, Form, Input } from 'antd';
import { history } from 'umi';
import './index.less';

const Login = () => {
  /**
   * Logs the values received from a form submission.
   *
   * @param {any} values - the values submitted from the form
   */
  const onFinish = async (values: any) => {
    console.log('Received values of form: ', values);
    // await login(values);
    const res = await login(values);
    const [useInfo] = res?.result.data.useInfo;
    window.sessionStorage.setItem('useInfo', JSON.stringify(useInfo));
    window.sessionStorage.setItem('token', res?.result.data.access_token);
    history.push('/');
  };
  return (
    <div className="login-container">
      <Form
        name="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input placeholder="Username" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password placeholder="Password" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Log in
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
