import { Form, Input, TimePicker } from 'antd';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import * as React from 'react';
interface Props {
  name: string;
}
const { Item } = Form;
dayjs.extend(customParseFormat);

const FrameForm: React.FC<Props> = () => {
  const onChange = (value: Dayjs | null, dateString: string) => {
    console.log(value, dateString);
  };
  const [form] = Form.useForm();
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  return (
    <div>
      <Form {...layout} form={form}>
        <Item label="关键字" name="keyword">
          <Input />
        </Item>
        <Item label="关键帧" name="frame">
          <TimePicker
            onChange={onChange}
            defaultOpenValue={dayjs('00:00:00', 'HH:mm:ss')}
          />
        </Item>
        <Item label="类目"></Item>
      </Form>
    </div>
  );
};
export default FrameForm;
