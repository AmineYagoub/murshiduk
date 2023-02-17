import { FC } from 'react';
import { Card } from 'antd';
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
import { DashboardCountry } from '@/utils/types';
import Loading from '../common/Loading';

echarts.use([
  ToolboxComponent,
  TooltipComponent,
  LegendComponent,
  PieChart,
  CanvasRenderer,
  LabelLayout,
]);

const CustomerCountriesChart: FC<{
  data: DashboardCountry[];
  loading: boolean;
}> = ({ data, loading }) => {
  const option = {
    tooltip: {
      trigger: 'item',
      axisPointer: {
        type: 'shadow',
      },

      formatter: function (params) {
        return `${params.seriesName}<br />
                ${params.name}: ${params.data.value} عميل (${params.percent}%)`;
      },
    },
    legend: {
      top: 'top',
      formatter: '{name}',
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
        name: 'عدد العملاء',
        type: 'pie',
        radius: [30, 100],
        center: ['50%', '50%'],
        roseType: 'area',
        label: {
          formatter: '{c} عميل',
          fontSize: 12,
        },
        emphasis: {
          focus: 'series',
        },
        itemStyle: {
          borderRadius: 8,
        },
        data,
      },
    ],
  };
  return (
    <Card
      title="تصنيف البلدان"
      style={{
        boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
      }}
    >
      {data ? (
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
      ) : (
        <Loading />
      )}
    </Card>
  );
};

export default CustomerCountriesChart;
