import React from 'react';

interface Props {
  legends: string[];
  x0: number;
  y0: number;
  yAxisLength: number;
  colors?: string[];
  width: number;
}

export const Legends = ({ legends, width, x0, y0, yAxisLength, colors }: Props) => {
  return (
    <>
      {legends?.map((legend, index) => (
        <g key={legend}>
          <rect
            x={x0 + (width / legends.length) * index}
            y={y0 + yAxisLength + 30}
            width={20}
            height={20}
            fill={colors?.[index]}
          />
          <text x={x0 + (width / legends.length) * index + 25} y={y0 + yAxisLength + 45}>
            {' '}
            - {legend}
          </text>
        </g>
      ))}
    </>
  );
};
