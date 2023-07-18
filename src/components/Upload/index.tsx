import { UploadOutlined } from '@ant-design/icons';
import tcb from '@cloudbase/js-sdk';
import type { UploadProps } from 'antd';
import { Button, Upload } from 'antd';
import * as React from 'react';
const app = tcb.init({
  env: 'cloud1-5grmes7r14f01703',
});

const customRequest = async (options: any) => {
  const { onSuccess, file } = options;
  app
    .uploadFile({ cloudPath: `fileList/${file.name}`, filePath: file })
    .then((res) => {
      console.log(res);
    });
  console.log(file);
  onSuccess();
};
const Uploader: React.FC = () => {
  const props: UploadProps = {
    name: 'file',
    customRequest,
    headers: {
      authorization: 'authorization-text',
    },
  };

  return (
    <div>
      <Upload {...props}>
        <Button icon={<UploadOutlined />}>Click to Upload</Button>
      </Upload>
    </div>
  );
};
export default Uploader;
