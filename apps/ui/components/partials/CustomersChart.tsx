import {
  GridComponent,
  LegendComponent,
  ToolboxComponent,
  TooltipComponent,
} from 'echarts/components';
import { FC } from 'react';
import { Card, theme } from 'antd';
import * as echarts from 'echarts/core';
import { BarChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';
import ReactEChartsCore from 'echarts-for-react/lib/core';
echarts.use([
  ToolboxComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  BarChart,
  CanvasRenderer,
]);

const labelOption = {
  show: true,
  position: 'insideBottom',
  distance: 10,
  rotate: 90,
  align: 'left',
  verticalAlign: 'middle',
  formatter: '{c}',
  fontSize: 16,
  rich: {
    name: {},
  },
};
const option = {
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow',
    },
  },
  legend: {
    data: [
      'عدد المسابقات',
      'طلاب مشاركين مع مشرفين',
      'طلاب مشاركين بدون مشرفين',
    ],
  },
  toolbox: {
    show: true,
    orient: 'vertical',
    left: 'right',
    top: 'center',
    feature: {
      mark: { show: true },
      dataView: { show: true, readOnly: false },
      magicType: { show: true, type: ['line', 'bar', 'stack'] },
      restore: { show: true },
      saveAsImage: { show: true },
    },
  },
  xAxis: [
    {
      type: 'category',
      axisTick: { show: false },
      data: ['2022', '2023', '2024', '2025'],
    },
  ],
  yAxis: [
    {
      type: 'value',
    },
  ],
  series: [
    {
      name: 'عدد المسابقات',
      type: 'bar',
      label: labelOption,
      emphasis: {
        focus: 'series',
      },
      data: [33, 45, 55, 32],
    },
    {
      name: 'طلاب مشاركين مع مشرفين',
      type: 'bar',
      label: labelOption,
      emphasis: {
        focus: 'series',
      },
      data: [150, 232, 201, 154],
    },
    {
      name: 'طلاب مشاركين بدون مشرفين',
      type: 'bar',
      label: labelOption,
      emphasis: {
        focus: 'series',
      },
      data: [98, 77, 101, 99],
    },
  ],
};

const CustomersChart: FC = (props) => {
  const {
    token: { colorPrimaryBg },
  } = theme.useToken();
  return (
    <Card
      {...props}
      title="أخر المسابقات"
      style={{
        backgroundColor: colorPrimaryBg,
        boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
      }}
    >
      <ReactEChartsCore
        echarts={echarts}
        option={option}
        notMerge={true}
        lazyUpdate={true}
        theme={'theme_name'}
        style={{
          height: 400,
        }}
      />
    </Card>
  );
};

export default CustomersChart;
