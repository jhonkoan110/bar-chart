export interface DataType {
  name: string;
  values: number[];
}

export interface BarChartProps {
  data: DataType[];
  width: number;
  height: number;
  ticks?: number;
  colors?: string[];
  legends?: string[];
  xAxisName?: string;
  yAxisName?: string;
  containerClassName?: string;
  orientation?: 'vertical' | 'horizontal';
}
