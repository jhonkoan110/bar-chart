import React, { memo, useMemo } from 'react';
import { useMouseMoveTooltip } from '../../hooks/useMouseMoveTooltip';
import { getChartCalcs, getNumberValues } from '../../utils/getChartCalcs';
import { HorizontalOrientaion } from './HorizontalOrientation';
import { Legends } from './Legends';
import './test.css';
import { VerticalOrientaion } from './VerticalOrientation';
import { XAxis } from './XAxis';
import { YAxis } from './YAxis';

export interface BarChartProps {
  data: any[];
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

export const TestChart = memo(({ orientation = 'vertical', ...props }: BarChartProps) => {
  // const { handleMouseLeave, handleMouseOver, mouseCoords, showTooltip, tooltipText, tooltipTextColor } =
  //   useMouseMoveTooltip();
  // const { barPlotWidth, dataYMax, dataYMin, dataYRange, x0, xAxisLength, xAxisY, y0, yAxisLength } = useMemo(() => {
  //   return getChartCalcs({
  //     height,
  //     width,
  //     data,
  //   });
  // }, [width, height, data]);

  if (orientation === 'vertical') return <VerticalOrientaion {...props} />;

  return <HorizontalOrientaion {...props} />;
});
