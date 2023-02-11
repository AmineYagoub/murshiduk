import { FC } from 'react';
import { Button, Card, theme } from 'antd';
import ReactEChartsCore from 'echarts-for-react/lib/core';
import * as echarts from 'echarts/core';
import {
  ToolboxComponent,
  TooltipComponent,
  LegendComponent,
} from 'echarts/components';
import { PieChart } from 'echarts/charts';
import { LabelLayout } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
import { AppRoutes } from '@/utils/AppRoutes';

echarts.use([
  ToolboxComponent,
  TooltipComponent,
  LegendComponent,
  PieChart,
  CanvasRenderer,
  LabelLayout,
]);

const CustomerCountriesChart: FC<{
  data: any[];
  loading: boolean;
}> = ({ data, loading }) => {
  const getValue = (level: string) => {
    if (data) {
      return data?.find((el) => el.level === level)?.value || 0;
    }
  };
  const option = {
    tooltip: {
      trigger: 'item',
      axisPointer: {
        type: 'shadow',
      },

      formatter: function (params) {
        return `${params.seriesName}<br />
                ${params.name} سنة: ${params.data.value} طالب (${params.percent}%)`;
      },
    },
    legend: {
      top: 'top',
      formatter: '{name} سنة',
    },
    toolbox: {
      show: true,
      orient: 'vertical',
      left: 'right',
      top: 'bottom',
      feature: {
        mark: { show: true },
        dataView: { show: true, readOnly: false },
        restore: { show: true },
        saveAsImage: { show: true },
      },
    },
    series: [
      {
        name: 'سن الطلاب',
        type: 'pie',
        radius: [30, 100],
        center: ['50%', '50%'],
        roseType: 'area',
        label: {
          formatter: '{c} طالب',
          fontSize: 12,
        },
        emphasis: {
          focus: 'series',
        },
        itemStyle: {
          borderRadius: 8,
        },
        data: [
          {
            value: 'level',
            name: '13',
          },
          { value: 'level', name: '14' },
          { value: 'level', name: '15' },
          { value: 'level', name: '16' },
          { value: 'level', name: '17' },
          { value: 'level', name: '18' },
          { value: 'level', name: '19' },
        ],
      },
    ],
  };

  const {
    token: { colorPrimaryBg },
  } = theme.useToken();

  return (
    <Card
      title="عدد الطلاب المسجلين حسب السن"
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
        showLoading={loading}
      />
    </Card>
  );
};

export default CustomerCountriesChart;
