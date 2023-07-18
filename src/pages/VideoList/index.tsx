import ProTable from '@/components/Table';
import Upload from '@/components/Upload';

import services from '@/services/demo';
import { PageContainer } from '@ant-design/pro-components';
import { useBoolean } from 'ahooks';
import { Button, Modal } from 'antd';
import * as React from 'react';
import { colums } from './colums';
const { queryVides } = services.UserController;
interface Props {
  name: string;
}

const App: React.FC<Props> = () => {
  const [state, { toggle, setTrue, setFalse }] = useBoolean(false);
  const [params, setParams] = React.useReducer((params: any, action: any) => {
    return { ...params, ...action };
  }, {});

  const getTaskHistories = async (value: any) => {
    const {
      params: { current, pageSize },
      sorts,
    } = value;
    const data = { ...params, page: current - 1, size: pageSize, sorts };

    return await queryVides(data);
  };
  return (
    <>
      <Upload />
      <Button
        type="primary"
        onClick={() => {
          setTrue();
        }}
      >
        新增
      </Button>
      <PageContainer
        header={{
          title: '视频列表',
        }}
      >
        <ProTable
          className="ProTable"
          rowKey="id"
          resizable
          request={getTaskHistories}
          params={params}
          columns={colums()}
          scroll={{
            y: 'calc(100vh - 365px)',
            x: 1200,
          }}
        />
      </PageContainer>
      <Modal open={state} onCancel={setFalse}></Modal>
    </>
  );
};
export default App;
