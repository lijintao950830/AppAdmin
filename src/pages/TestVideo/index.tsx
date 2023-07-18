import Video from '@/components/RecatVideo';
import { formatTime } from '@/utils/index';
import { Button, Col, Form, Input, InputNumber, Row } from 'antd';
import * as React from 'react';
import './index.less';
const { TextArea } = Input;

interface Props {
  name: string;
}

const videoJsOptions = {
  autoplay: false,
  controls: true,
  responsive: true,
  fluid: true,
  height: 10,
  width: 100,
  sources: [
    {
      src: require('@/assets/videos/test.mp4'),
      type: 'video/mp4',
    },
  ],
};

type Coordinate = number | undefined;
const initData = [
  {
    key: 1,
    count: 1,
    'input-number': 1,
    X: 0,
    Y: 0,
    text: '123',
    width: 50,
    height: 50,
  },
];

type InitDataType = typeof initData;

const App: React.FC<Props> = () => {
  // const [formLayout, setFormLayout] = useState<LayoutType>('horizontal');

  const [canvas_x, setCanvas_x] = React.useState<Coordinate>(0);
  const [canvas_y, setCanvas_y] = React.useState<Coordinate>(0);
  const [currentTime, setCurrentTime] = React.useState(0);
  const [duration, setDuration] = React.useState(0);
  const [allFormData, setAllFormData] = React.useState<any[]>(initData);
  const [inputNumber, setInputNumber] = React.useState(1);
  const [preView, setPreview] = React.useState(false);
  const playerRef = React.useRef(null);

  const [form] = Form.useForm();

  React.useEffect(() => {}, [allFormData]);

  React.useEffect(() => {
    form.setFieldsValue({ ...allFormData[inputNumber - 1] });
  }, [inputNumber]);

  const numberMax = Form.useWatch('count', form);
  const watchtext = Form.useWatch('text', form);
  const watchWidth = Form.useWatch('width', form);
  const watchHeight = Form.useWatch('height', form);
  const watch_X = Form.useWatch('X', form);
  const watch_Y = Form.useWatch('Y', form);

  const handlePlayerReady = (player: any) => {
    const checkTime = () => {
      playerRef.current = player;

      const END_TIME = 20;
      if (player.currentTime() >= END_TIME) {
        player.pause();
        setPreview(false);
      }
    };
    player.on('loadedmetadata', () => {
      console.log('视频时长：', player.duration());
      setDuration(player.duration());
      console.log('视频宽度：', player.videoWidth());
      console.log('视频高度：', player.videoHeight());
    });
    player.on('timeupdate', () => {
      if (preView) {
        checkTime();
      }
      setCurrentTime(player.currentTime());
    });
    // You can handle player events here, for example:
    player.on('waiting', () => {
      //   videojs.log('player is waiting');
      // let modal = player.createModal(<div>nihao</div>);
      // modal.on('modalclose', function () {
      //   player.play();
      // });
    });

    player.on('dispose', () => {
      //   videojs.log('player will dispose');
    });
  };

  const onFinish = (value: InitDataType) => {
    allFormData[inputNumber - 1] = value;
    setAllFormData(
      [...allFormData].map((item: any) => ({
        ...item,
      })),
    );
    const data = {
      time: currentTime,
      data: allFormData,
    };
    console.log(data);
  };

  const changeCountData = (count: number) => {
    let newArr = [];
    console.log(count, allFormData.length);
    const arr = allFormData;
    if (count > arr.length) {
      const pushLength = count - arr.length;
      const [initDataObj] = initData;
      newArr = [...arr, ...new Array(pushLength).fill(initDataObj)];
      setAllFormData(newArr.map((item: InitDataType) => ({ ...item, count })));
      return;
    }
    const subtractionLength = arr.length - count;

    for (let i = 0; i < subtractionLength; i++) {
      arr.pop();
    }
    setAllFormData(arr.map((item: any) => ({ ...item, count })));
  };

  const preViewfn = () => {
    // 预览时间从弹窗出现时间10秒前开始，END_TIME暂停
    setPreview(true);
    const player: any = playerRef.current;
    if (player) {
      player.currentTime(10);
    }
    player.play();
  };

  const onChangeForm = (changedValues: any) => {
    // 当总页数改变
    if (changedValues['count']) {
      form.setFieldValue('input-number', 1);
      changeCountData(changedValues['count']);
      return;
    }
    // 当前页改变
    if (changedValues['input-number']) {
      allFormData[inputNumber - 1] = form.getFieldsValue();
      setAllFormData(
        [...allFormData].map((item: InitDataType) => ({
          ...item,
          'input-number': changedValues['input-number'],
        })),
      );
      setInputNumber(changedValues['input-number']);
    }
  };
  return (
    <div className="AdminVideo">
      <h1>视频管理</h1>
      <div className="videoBox_div">
        <Video options={videoJsOptions} onReady={handlePlayerReady} />
        <p
          style={{
            display: preView ? 'none' : 'block',
            position: 'absolute',
            border: '2px solid #fff',
            wordWrap: 'break-word',
            color: '#fff',
            top: watch_Y,
            left: watch_X,
            width: watchWidth,
            height: watchHeight,
          }}
        >
          {watchtext}
        </p>
        {/* <div
          style={{
            position: 'absolute',
            top: 0,
          }}
        >
          <Stage width={400} height={200}>
            <Layer>
              <Text
                text={text}
                x={canvas_x}
                y={canvas_y}
                draggable
                // fill={this.state.isDragging ? 'green' : 'black'}
                onDragStart={onDragStart}
                onDragEnd={onDragEnd}
              />
            </Layer>
          </Stage>
        </div> */}
      </div>
      <Form
        form={form}
        onFinish={onFinish}
        onValuesChange={onChangeForm}
        initialValues={{
          ...initData[0],
          X: canvas_x,
          Y: canvas_y,
        }}
      >
        <Form.Item label="当前时间:">
          {`${formatTime(currentTime)}/${formatTime(duration)}`}
        </Form.Item>
        <Row>
          <Col>
            <Form.Item label="宽" name="width">
              <InputNumber
                min={1}
                max={400}
                formatter={(value) => `${value}`.replace(/\D/g, '')}
              />
            </Form.Item>
            <Form.Item label="高:" name="height">
              <InputNumber min={1} max={(400 / 16) * 9} />
            </Form.Item>
          </Col>
          <Col style={{ display: 'flex' }} className="grid">
            {/* <div style={{ verticalAlign: 'middle' }}>位置</div> */}
            <div>
              <Form.Item label="X:" name="X">
                <InputNumber min={0} max={400 - watchWidth} />
              </Form.Item>
              <Form.Item label="Y:" name="Y">
                <InputNumber min={0} max={(400 / 16) * 9 - watchHeight} />
              </Form.Item>
            </div>
          </Col>
          <Col>
            <Form.Item label="总层数:" name="count">
              <InputNumber min={1} max={10} />
            </Form.Item>
            <Form.Item label="当前层数:" name="input-number">
              <InputNumber min={1} max={numberMax} />
            </Form.Item>
          </Col>

          <Col>
            <Form.Item label="类目:" name="type">
              <Input />
            </Form.Item>
            <Form.Item label="触发词:" name="trigger">
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item label="文本内容:" name="text">
          <TextArea />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            保存
          </Button>
          <Button type="primary" onClick={preViewfn}>
            预览
          </Button>
        </Form.Item>
      </Form>
      {JSON.stringify(allFormData)}
    </div>
  );
};
export default App;
