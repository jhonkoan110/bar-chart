import { memo } from 'react';
import { CHART_PADDING } from '../../../../constants/barChart';

interface Props {
  yAxisLength: number;
  ticks: number;
  dataYMax: number;
  yAxisName?: string;
}

export const YAxis = memo((props: Props) => {
  // Линия оси.
  const lineX1 = CHART_PADDING;
  const lineY1 = CHART_PADDING;
  const lineX2 = CHART_PADDING;
  const lineY2 = CHART_PADDING + props.yAxisLength;

  return (
    <>
      <line x1={lineX1} y1={lineY1} x2={lineX2} y2={lineY2} stroke="grey" />
      {Array.from({ length: props.ticks }).map((_, index) => {
        const y = CHART_PADDING + index * (props.yAxisLength / props.ticks);
        const yValue = (props.dataYMax - index * (props.dataYMax / props.ticks)).toFixed(1);

        return (
          <g key={index}>
            <line x1={CHART_PADDING} y1={y} x2={CHART_PADDING - 5} y2={y} stroke="grey" />
            <text x={CHART_PADDING - 10} y={y + 3} textAnchor="end">
              {yValue}
            </text>
          </g>
        );
      })}
      {props.yAxisName && (
        <text x={CHART_PADDING} y={CHART_PADDING - 15} textAnchor="middle">
          {props.yAxisName}
        </text>
      )}

      <text x={CHART_PADDING - 20} y={CHART_PADDING + props.yAxisLength + 20}>
        0
      </text>
    </>
  );
});
