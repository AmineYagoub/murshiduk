import {
  GridComponent,
  LegendComponent,
  ToolboxComponent,
  TooltipComponent,
} from 'echarts/components';
import { FC } from 'react';
import { Card } from 'antd';
import * as echarts from 'echarts/core';
import { BarChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';
import ReactEChartsCore from 'echarts-for-react/lib/core';
echarts.use([
  BarChart,
  GridComponent,
  CanvasRenderer,
  LegendComponent,
  ToolboxComponent,
  TooltipComponent,
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
    data: ['تواصل إيجابي', 'تواصل سلبي'],
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
      data: ['2023', '2024', '2025', '2026'],
    },
  ],
  yAxis: [
    {
      type: 'value',
    },
  ],
  series: [
    {
      name: 'تواصل إيجابي',
      type: 'bar',
      label: labelOption,
      emphasis: {
        focus: 'series',
      },
      itemStyle: { color: 'teal' },
      data: [150, 232, 201, 154],
    },
    {
      name: 'تواصل سلبي',
      type: 'bar',
      label: labelOption,
      emphasis: {
        focus: 'series',
      },
      itemStyle: { color: 'orange' },
      data: [98, 77, 101, 99],
    },
  ],
};

const CustomersChart: FC = (props) => {
  return (
    <Card
      {...props}
      title="تصنيف العملاء"
      style={{
        boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
        padding: '0 5px',
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
