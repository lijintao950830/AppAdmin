import { Column, Line, Pie } from '@ant-design/plots';
import { PageContainer } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import { Col, Row } from 'antd';
import React from 'react';
import styles from './index.less';

const HomePage: React.FC = () => {
  const [data, setData] = React.useState([
    { date: '2021-01-01', value: 100, type: '总数' },
    { date: '2021-01-02', value: 120, type: '总数' },
    { date: '2021-01-03', value: 150, type: '总数' },
    { date: '2021-01-01', value: 10, type: '增长' },
    { date: '2021-01-02', value: 20, type: '增长' },
    { date: '2021-01-03', value: 30, type: '增长' },
  ]);

  const [usrDate, setUsrDate] = React.useState([
    { date: '2021-01-01', value: 100, type: '活跃用户' },
    { date: '2021-01-02', value: 120, type: '活跃用户' },
    { date: '2021-01-03', value: 90, type: '活跃用户' },
    { date: '2021-01-04', value: 80, type: '活跃用户' },
    { date: '2021-01-05', value: 60, type: '活跃用户' },
    { date: '2021-01-06', value: 100, type: '活跃用户' },
  ]);
  const [videoData, setVideoData] = React.useState([
    { day: 'Monday', views: 100 },
    { day: 'Tuesday', views: 200 },
    { day: 'Wednesday', views: 150 },
    { day: 'Thursday', views: 300 },
    { day: 'Friday', views: 400 },
    { day: 'Saturday', views: 250 },
    { day: 'Sunday', views: 150 },
  ]);

  const { name } = useModel('global');
  const config = {
    data, // 数据源
    xField: 'date', // x轴字段
    yField: 'value', // y轴字段
    seriesField: 'type', // 分组字段
    // legend: { position: 'top' }, // 图例
    // smooth: true, //
  };
  return (
    <PageContainer ghost>
      <div className={styles.container}>
        <Row gutter={[16, 32]}>
          <Col span={8}>
            <Line {...config} />
            <p style={{ textAlign: 'center' }}>用户总数与增长情况</p>
          </Col>
          <Col span={8}>
            <Line {...config} data={usrDate} />
          </Col>
          <Col span={8}>
            <Pie
              data={[
                { type: '男性', value: 56 },
                { type: '女性', value: 44 },
                { type: '未知', value: 12 },
              ]}
              angleField="value"
              colorField="type"
              radius={0.8}
              label={{
                type: 'inner',
                offset: '-30%',
                content: '{value}',
                style: {
                  textAlign: 'center',
                  fontSize: 14,
                },
              }}
            />
          </Col>
          <Col span={12}>
            <Column
              {...config}
              data={videoData}
              color={'#1890ff'}
              seriesField={'type'} // 分组字段
              xField={'day'} // x轴字段
              yField={'views'}
            />
          </Col>
          {/* <Col span={12}>
            <Line {...config} />
          </Col> */}
        </Row>
      </div>
    </PageContainer>
  );
};

export default HomePage;
