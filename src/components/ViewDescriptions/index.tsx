import { Descriptions } from 'antd';
import { ReactNode, useEffect, useState } from 'react';

interface Description {
  label?: string;
  value?: unknown;
  dataIndex?: string;
  span?: number;
  renderValue?: ({ value }: any) => JSX.Element;
}

type Props = {
  DescriptionsConfig?: Description[];
  dataSource?: any;
  [key: string]: any;
};

const { Item } = Descriptions;

export default function ViewDescriptions(props: Props) {
  const { DescriptionsConfig = [], dataSource, ...DescriptionsProps } = props;
  const [dataElement, setDataElement] = useState([]) as any;

  const mergeDataSourceInConfig = () => {
    DescriptionsConfig?.map((item: Description) => {
      return Object.keys(dataSource).forEach((key: string) => {
        if (key === item.dataIndex) {
          // eslint-disable-next-line no-param-reassign
          item.value = dataSource[key];
        }
        return false;
      });
    });

    setDataElement([...DescriptionsConfig]);
  };

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    dataSource && mergeDataSourceInConfig();
  }, [dataSource]);

  return (
    <div className="ViewDescriptions">
      <Descriptions {...DescriptionsProps}>
        {dataElement?.map((i: any): ReactNode => {
          if (i.render) {
            return (
              // 自定义item及样式
              <Item span={i?.span || 1} key={i?.label}>
                {i.render({
                  label: i?.label,
                  value: dataSource,
                  action: i?.renderAction,
                })}
              </Item>
            );
          }
          if (i.renderValue) {
            return (
              <Item span={i?.span || 1} label={i?.label} key={i?.label}>
                {i?.renderValue({ value: dataSource })}
              </Item>
            );
          }
          return (
            <Item span={i?.span || 1} label={i?.label} key={i?.label}>
              {i.value || '--'}
            </Item>
          );
        })}
      </Descriptions>
    </div>
  );
}
