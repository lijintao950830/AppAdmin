// import { intl } from '@/utils/utils';
import VideoImg from '@/components/VideoImg';
import moment from 'moment';

const colums = (viewFn?: any) => {
  return [
    {
      title: '名称',
      dataIndex: 'name',
      width: 200,
      align: 'left',
    },
    {
      title: '视频id',
      dataIndex: 'id',
      ellipsis: true,
      width: 200,
      align: 'left',
    },
    {
      title: '视频详情',
      dataIndex: 'status',
      ellipsis: true,
      width: 200,
      align: 'left',
      renderText: () => {
        return (
          <VideoImg
            videoUrl={require('@/assets/videos/test.mp4')}
            width={200}
            height={120}
          />
        );
      },
    },
    {
      title: '更新时间',
      dataIndex: ['audit.createdTime'],
      ellipsis: true,
      width: 200,
      align: 'center',
      sorter: true,
      render: (_: any, row: any) => {
        return row?.audit?.createdTime
          ? moment(row?.audit?.createdTime).format('YYYY-MM-DD HH:mm:ss')
          : '--';
      },
    },
    {
      title: '创建时间',
      ellipsis: true,
      dataIndex: 'endTime',
      width: 200,
      align: 'center',
      sorter: true,
      render: (_: any, row: any) => {
        return row?.endTime
          ? moment(row?.endTime).format('YYYY-MM-DD HH:mm:ss')
          : '--';
      },
    },
    {
      title: '创建人',
      dataIndex: ['audit', 'createdByName'],
      ellipsis: true,
      width: 200,
      align: 'center',
      render: (v: string) => v || '--',
    },
    {
      title: '操作',
      fixed: 'right',
      width: 200,
      align: 'center',
      render: (_: string, row: any) => (
        <span
          className="view"
          style={{
            color: 'rgb(22, 155, 213)',
            cursor: 'pointer',
          }}
          onClick={() => viewFn(row?.taskId)}
        >
          查看
        </span>
      ),
    },
  ];
};

export { colums };
