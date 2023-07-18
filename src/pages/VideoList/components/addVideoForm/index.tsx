import { Form, Input } from 'antd';
import * as React from 'react';
interface Props {
  name: string;
}
const { Item } = Form;
const App: React.FC<Props> = () => {
  const [form] = Form.useForm();
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  return (
    <div>
      <Form {...layout} form={form}>
        <Item label="视频名" name="videoName">
          <Input />
        </Item>
        <Item label="URL" name="url">
          <Input />
        </Item>
        <Item label="类目" name="typeName"></Item>
      </Form>
    </div>
  );
};
export default App;
