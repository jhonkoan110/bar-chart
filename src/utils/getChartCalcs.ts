import { DataType } from '../components/BarChart';

export const getNumberValues = (obj: Record<string, unknown>) => {
  return Object.values(obj).filter((val) => typeof val === 'number') as number[];
};

interface GetChartCalcsDTO {
  width: number;
  height: number;
  data: DataType[];
}

export const getChartCalcs = ({ data, height, width }: GetChartCalcsDTO) => {
  const x0 = 50;
  const xAxisLength = width - x0 * 2;

  const y0 = 50;
  const yAxisLength = height - y0 * 2;

  const xAxisY = y0 + yAxisLength;

  const dataYMax = data.reduce((currMax, value) => {
    // const numValues = getNumberValues(value);

    return Math.max(currMax, Math.max(...value.values));
  }, -Infinity);

  const dataYMin = data.reduce((currMin, value) => {
    // const numValues = getNumberValues(value);

    return Math.min(currMin, Math.min(...value.values));
  }, Infinity);

  const dataYRange = dataYMax - dataYMin;

  const barPlotWidth = xAxisLength / data.length - 10;

  return {
    x0,
    y0,
    xAxisLength,
    yAxisLength,
    xAxisY,
    dataYMax,
    dataYMin,
    dataYRange,
    barPlotWidth,
  };
};
