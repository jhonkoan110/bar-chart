import { memo } from 'react';
import ErrorBoundary from 'components/ErrorBoundary';
import { HorizontalOrientaion } from './HorizontalOrientation';
import { Legends } from './Legends';
import { VerticalOrientaion } from './VerticalOrientation';

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

const charts = {
  vertical: VerticalOrientaion,
  horizontal: HorizontalOrientaion,
};

export const BarChart = memo(({ orientation = 'vertical', ...props }: BarChartProps) => {
  const Chart = charts[orientation];

  return (
    <ErrorBoundary>
      <Chart {...props} colors={props.colors} />
      {props.legends && <Legends legends={props.legends} colors={props.colors} />}
    </ErrorBoundary>
  );
});
