import { Card } from 'antd';
import * as React from 'react';

interface Props {
  title: string;
  name: string;
  initData?: ItemType[];
  clickAdd: (name: string) => void;
}

type ItemType = {
  data: {
    createTime: any;
    createTimeService: any;
    deleteTime: any;
    typeName: string;
    updateTime: any;
  };
  id: any;
};
const Type: React.FC<Props> = (props) => {
  const { title = '类目', name = '', clickAdd, initData = [] } = props;
  const ListNode = (): React.ReactNode =>
    initData?.map((i: ItemType) => {
      return <p key={i?.data.createTime}>{i?.data.typeName}</p>;
    });
  return (
    <Card
      style={{ width: '100%' }}
      title={title}
      extra={<a onClick={() => clickAdd(name)}>添加</a>}
    >
      {ListNode()}
    </Card>
  );
};
export default Type;
