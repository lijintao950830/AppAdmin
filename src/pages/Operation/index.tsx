import { add as addfech, getByWhere } from '@/utils/dbUtils';
import { useToggle } from 'ahooks';
import {
  Card,
  Col,
  Form,
  Input,
  Modal,
  Row,
  Select,
  Space,
  message,
} from 'antd';
import * as React from 'react';
import Type from './compoent/Type';
interface Props {
  name: string;
}
const { Item, useForm } = Form;
type data = {
  data: {
    createTime: any;
    createTimeService: any;
    deleteTime: any;
    typeName: string;
    updateTime: any;
  };
  id: any;
};

type DataArray = {
  keyword_type?: data[];
  grade_type?: data[];
  video_type?: data[];
};

const Operation: React.FC<Props> = () => {
  const [state, { toggle }] = useToggle();
  const [loading, { toggle: loadindToggle }] = useToggle();
  const [dataArray, setDataArray] = React.useState<DataArray>();
  const [type, setType] = React.useState('');
  const [placeholder, setPlaceholder] = React.useState('');
  const [form] = useForm();
  const openModal = (name: string, title: string) => {
    setType(name);
    toggle();
    setPlaceholder(title);
  };
  const getList = async () => {
    const allPromise = await Promise.all([
      getByWhere('keyword_type', {}),
      getByWhere('grade_type', {}),
      getByWhere('video_type', {}),
    ]);
    console.log(allPromise);
    const [keyword_type, grade_type, video_type] = allPromise;
    const res = await getByWhere('keyword_type', {});
    setDataArray({
      keyword_type: keyword_type.data,
      grade_type: grade_type.data,
      video_type: video_type.data,
    });
    console.log(res);
  };
  React.useEffect(() => {
    getList();
  }, []);
  const onCancel = () => {
    form.resetFields();
    setType('');
    toggle();
  };
  const addFn = async () => {
    loadindToggle();
    const data = form.getFieldsValue(true);
    const res = await addfech(type, data);
    loadindToggle();
    if (res?.id) {
      message.success('添加成功');
      onCancel();
    }
  };
  return (
    <div>
      <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
        <Type
          title="关键词类目"
          name="keyword_type"
          initData={dataArray?.keyword_type}
          clickAdd={(name: string) => {
            openModal(name, '关键词类目');
          }}
        />
        <Type
          title="年级类目"
          name="grade_type"
          initData={dataArray?.grade_type}
          clickAdd={(name: string) => {
            openModal(name, '年级类目');
          }}
        />
        <Type
          title="视频类目"
          name="video_type"
          initData={dataArray?.video_type}
          clickAdd={(name: string) => {
            openModal(name, '视频类目');
          }}
        />
        <Card
          style={{ width: '100%' }}
          title="每周书单"
          extra={
            <a onClick={() => openModal('weekly_book', '每周书单')}>添加</a>
          }
        >
          <Row gutter={16}>
            <Col>
              <Card style={{ width: 180, height: 200, textAlign: 'center' }}>
                <p>书名</p>
                <p>一共xx书</p>
              </Card>
            </Col>
            <Col>
              <Card style={{ width: 180, height: 200 }}>
                <p>书名</p>
                <p>一共xx书</p>
              </Card>
            </Col>
            <Col>
              <Card style={{ width: 180, height: 200 }}>
                <p>书名</p>
                <p>一共xx书</p>
              </Card>
            </Col>
            <Col>
              <Card style={{ width: 180, height: 200 }}>
                <p>书名</p>
                <p>一共xx书</p>
              </Card>
            </Col>
          </Row>
        </Card>
        <Card
          style={{ width: '100%' }}
          title="热门推荐"
          extra={
            <a onClick={() => openModal('weekly_book', '每周书单')}>添加</a>
          }
        >
          <Row gutter={16}>
            <Col>
              <Card style={{ width: 180, height: 200, textAlign: 'center' }}>
                <p>书名</p>
                <p>一共xx书</p>
              </Card>
            </Col>
            <Col>
              <Card style={{ width: 180, height: 200 }}>
                <p>书名</p>
                <p>一共xx书</p>
              </Card>
            </Col>
            <Col>
              <Card style={{ width: 180, height: 200 }}>
                <p>书名</p>
                <p>一共xx书</p>
              </Card>
            </Col>
            <Col>
              <Card style={{ width: 180, height: 200 }}>
                <p>书名</p>
                <p>一共xx书</p>
              </Card>
            </Col>
          </Row>
        </Card>
      </Space>

      <Modal
        open={state}
        title="新增"
        onCancel={onCancel}
        okButtonProps={{ loading }}
        onOk={addFn}
      >
        <Form form={form} onFinish={() => {}}>
          {type !== 'weekly_book' ? (
            <Item name="typeName">
              <Input placeholder={placeholder} />
            </Item>
          ) : (
            <>
              <Item name="typeName" label="书单名">
                <Input placeholder={placeholder} />
              </Item>
              <Item name="typeName" label="书名">
                <Select
                  placeholder="选择书名"
                  options={[{ label: '水浒传', key: 123 }]}
                />
              </Item>
            </>
          )}
        </Form>
      </Modal>
    </div>
  );
};
export default Operation;
