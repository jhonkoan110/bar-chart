import React from 'react';

interface Props {
  x0: number;
  xAxisY: number;
  xAxisLength: number;
  ticks: number;
  dataXMax: number;
  xAxisName?: string;
}

export const XAxis = ({ dataXMax, ticks, x0, xAxisLength, xAxisY, xAxisName }: Props) => {
  return (
    <>
      <line x1={x0} y1={xAxisY} x2={x0 + xAxisLength} y2={xAxisY} stroke="grey" />
      {Array.from({ length: ticks }).map((_, index) => {
        const x = x0 + (index + 1) * (xAxisLength / ticks);
        const xValue = ((index + 1) * (dataXMax / ticks)).toFixed(1);

        return (
          <g key={index}>
            <line x1={x} y1={xAxisY} x2={x} y2={xAxisY + 5} stroke="grey" />
            <text y={xAxisY + 25} x={x} textAnchor="middle">
              {xValue}
            </text>
          </g>
        );
      })}
      {xAxisName && (
        <text x={x0 + xAxisLength + 5} y={xAxisY + 4}>
          {xAxisName}
        </text>
      )}
    </>
  );
};
