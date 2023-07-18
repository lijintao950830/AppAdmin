import ViewDescriptions from '@/components/ViewDescriptions';
import { PageContainer } from '@ant-design/pro-components';
import { Divider } from 'antd';
import * as React from 'react';
interface Props {
  name: string;
}
const DescriptionsConfig = [
  {
    label: '用户id',
    dataIndex: 'name',
    span: 1,
  },
  {
    label: '性别',
    dataIndex: 'name',
    span: 1,
  },
  {
    label: '年龄',
    dataIndex: 'name',
    span: 1,
  },
  {
    label: '注册时间',
    dataIndex: 'name',
    span: 1,
  },
  {
    label: '注册时长',
    dataIndex: 'name',
    span: 1,
  },
  {
    label: '联系方式',
    dataIndex: 'name',
    span: 1,
  },
];
const UserDetails: React.FC<Props> = (props) => {
  return (
    <div>
      {props.name}
      <PageContainer title="用户详情">
        <ViewDescriptions
          size="small"
          DescriptionsConfig={DescriptionsConfig}
          dataSource={{}}
          // column={2}
        />
        <Divider />
        <div>
          <span>用户偏好：</span>
        </div>
        <Divider />
        <div>
          <span>关键词：</span>
        </div>
        <Divider />
        <div>
          <span>用户历史行为：</span>
        </div>
        <Divider />
        <div>
          <span>浏览视频：</span>
        </div>
      </PageContainer>
    </div>
  );
};
export default UserDetails;
