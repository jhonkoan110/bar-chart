import React from 'react';

interface Props {
  x0: number;
  y0: number;
  yAxisLength: number;
  yAxisName: string;
}

export const YAxis = ({ x0, y0, yAxisLength, yAxisName }: Props) => {
  return (
    <>
      <line x1={x0} y1={y0} x2={x0} y2={y0 + yAxisLength} stroke="grey" />
      {yAxisName && (
        <text x={x0} y={y0 - 15} textAnchor="middle">
          {yAxisName}
        </text>
      )}
    </>
  );
};
