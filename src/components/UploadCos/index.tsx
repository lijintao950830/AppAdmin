import { Button, Upload, message } from 'antd';
import COS from 'cos-js-sdk-v5';
import React, { useState } from 'react';
const UploadComponent: React.FC = () => {
  const [fileList, setFileList] = useState<any[]>([]);

  const cos = new COS({
    // SecretId: 'your-secret-id',
    // SecretKey: 'your-secret-key',
    // Region: 'your-region',
  });

  const handleFileChange = (info: any) => {
    let fileList = [...info.fileList];

    // 限制只上传一个文件
    fileList = fileList.slice(-1);

    // 更新文件列表
    setFileList(fileList);
  };

  const handleUpload = () => {
    const file = fileList[0];

    if (file) {
      const params = {
        Bucket: 'your-bucket-name',
        Region: 'your-region',
        Key: 'path/to/remote/file.jpg',
        Body: file.originFileObj,
      };

      cos.putObject(params, (err: any, data: any) => {
        if (err) {
          console.log(err);
          message.error('文件上传失败');
        } else {
          console.log(data);
          message.success('文件上传成功');
        }
      });
    }
  };

  return (
    <div>
      <Upload
        fileList={fileList}
        onChange={handleFileChange}
        beforeUpload={() => false} // 阻止自动上传
      >
        <Button>选择文件</Button>
      </Upload>
      <Button onClick={handleUpload} disabled={fileList.length === 0}>
        上传
      </Button>
    </div>
  );
};

export default UploadComponent;
