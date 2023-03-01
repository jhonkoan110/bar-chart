import { useMemo } from 'react';
import { CHART_PADDING } from '../constants/barChart';
import { DataType } from '../types/BarChart';

interface GetChartCalcsDTO {
  width: number;
  height: number;
  data: DataType[];
}

export const useChartCalcs = ({ data, height, width }: GetChartCalcsDTO) => {
  const xAxisLength = width - CHART_PADDING * 2;
  const yAxisLength = height - CHART_PADDING * 2;

  const xAxisY = CHART_PADDING + yAxisLength;

  const dataYMax = data.reduce((currMax, value) => {
    return Math.max(currMax, Math.max(...value.values));
  }, -Infinity);

  const dataYMin = data.reduce((currMin, value) => {
    return Math.min(currMin, Math.min(...value.values));
  }, Infinity);

  const dataYRange = dataYMax - dataYMin;

  const barPlotWidth = xAxisLength / data.length - 10;

  return useMemo(
    () => ({
      // x0,
      // y0,
      xAxisLength,
      yAxisLength,
      xAxisY,
      dataYMax,
      dataYMin,
      dataYRange,
      barPlotWidth,
    }),
    // eslint-disable-next-line
    [data, height, width],
  );
};
