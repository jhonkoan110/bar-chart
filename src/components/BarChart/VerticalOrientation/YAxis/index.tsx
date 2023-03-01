import React, { memo } from 'react';

interface Props {
  x0: number;
  y0: number;
  yAxisLength: number;
  ticks: number;
  dataYMax: number;
  yAxisName?: string;
}

export const YAxis = memo(({ dataYMax, ticks, x0, y0, yAxisLength, yAxisName }: Props) => {
  return (
    <>
      <line x1={x0} y1={y0} x2={x0} y2={y0 + yAxisLength} stroke="grey" />
      {Array.from({ length: ticks }).map((_, index) => {
        const y = y0 + index * (yAxisLength / ticks);
        const yValue = (dataYMax - index * (dataYMax / ticks)).toFixed(1);

        return (
          <g key={index}>
            <line x1={x0} y1={y} x2={x0 - 5} y2={y} stroke="grey" />
            <text x={x0 - 10} y={y + 3} textAnchor="end">
              {yValue}
            </text>
          </g>
        );
      })}
      {yAxisName && (
        <text x={x0} y={y0 - 15} textAnchor="middle">
          {yAxisName}
        </text>
      )}

      <text x={x0 - 20} y={y0 + yAxisLength + 20}>
        0
      </text>
    </>
  );
});
