import { addBook, getBooksList } from '@/services';
import { PageContainer } from '@ant-design/pro-components';
import { Access, useAccess } from '@umijs/max';
import { Button } from 'antd';
import * as React from 'react';
const AccessPage: React.FC = () => {
  const access = useAccess();
  const [dataList, setdataList] = React.useState([]);
  const getlist = () => {
    getBooksList().then((res: any) => {
      console.log(res);
      setdataList(res.data);
    });
  };
  React.useEffect(() => {
    console.log(access);
    getlist();
  }, []);
  const add = async () => {
    try {
      const res = await addBook('三国演义');
      getlist();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <PageContainer
      ghost
      header={{
        title: '权限示例',
      }}
    >
      <Access accessible={access.canSeeAdmin}>
        <Button onClick={add}>只有 Admin 可以看到这个按钮 新增 图书</Button>
        <>
          {dataList.map((item: any) => (
            <p key={item?._id}>{item?.name}</p>
          ))}
        </>
      </Access>
    </PageContainer>
  );
};

export default AccessPage;
