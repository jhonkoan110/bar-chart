import React from 'react';

interface Props {
  x0: number;
  xAxisY: number;
  xAxisLength: number;
  xAxisName: string;
}

export const XAxis = ({ x0, xAxisLength, xAxisName, xAxisY }: Props) => {
  return (
    <>
      <line x1={x0} y1={xAxisY} x2={x0 + xAxisLength} y2={xAxisY} stroke="grey" />
      {xAxisName && (
        <text x={x0 + xAxisLength + 5} y={xAxisY + 4}>
          {xAxisName}
        </text>
      )}
    </>
  );
};
