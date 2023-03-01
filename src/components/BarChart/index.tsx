import React, { memo } from 'react';
import ErrorBoundary from '../ErrorBoundary';
import { HorizontalOrientaion } from './HorizontalOrientation';
import { Legends } from './Legends';
import { VerticalOrientaion } from './VerticalOrientation';

// export type DataType = Array<Record<string, number | string> & { name: string }>;
// export type DataType = Array<Record<>>
export interface DataType {
  name: string;
  values: number[]
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

export const BarChart = memo(({ orientation = 'vertical', legends, colors, ...props }: BarChartProps) => {
  const Chart = charts[orientation];

  return (
    <ErrorBoundary>
      <Chart {...props} colors={colors} />
      {legends && <Legends legends={legends} colors={colors} />}
    </ErrorBoundary>
  );
});
