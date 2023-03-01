import React, { Fragment, useMemo } from 'react';
import { BarChartProps } from '..';
import { useMouseMoveTooltip } from '../../../hooks/useMouseMoveTooltip';
import { getChartCalcs } from '../../../utils/getChartCalcs';
import { Tooltip } from '../../Tooltip';
import { Legends } from '../Legends';
import { XAxis } from './XAxis';
import { YAxis } from './YAxis';

export const VerticalOrientaion = ({
  data,
  height,
  width,
  colors,
  containerClassName,
  legends,
  ticks = 5,
  xAxisName = 'x',
  yAxisName = 'y',
}: Omit<BarChartProps, 'orientation'>) => {
  const { handleMouseLeave, handleMouseOver, mouseCoords, showTooltip, tooltipText } = useMouseMoveTooltip();
  const { barPlotWidth, dataYMax, x0, xAxisLength, xAxisY, y0, yAxisLength } = useMemo(() => {
    return getChartCalcs({
      height,
      width,
      data,
    });
  }, [width, height, data]);

  return (
    <div style={{ width }}>
      <svg width={width} height={height} className={containerClassName}>
        <XAxis x0={x0} xAxisLength={xAxisLength} xAxisName={xAxisName} xAxisY={xAxisY} />

        <YAxis dataYMax={dataYMax} ticks={ticks} x0={x0} y0={y0} yAxisLength={yAxisLength} yAxisName={yAxisName} />

        {/* Bars */}
        {useMemo(
          () =>
            data.map((value, index) => {
              const sidePadding = 10;
              const side = index !== 0 ? sidePadding : 0;
              const x = x0 + index * barPlotWidth + side * index;
              const numValues = value.values;
              const numValuesAmount = numValues.length;
              const yArr = numValues.map((val) => {
                const yRatio = val / dataYMax;

                return {
                  y: y0 + (1 - yRatio) * yAxisLength,
                  height: yRatio * yAxisLength,
                  val,
                };
              });

              return (
                <g key={index} className="group">
                  {yArr.map(({ y, height, val }, i) => {
                    let startX;

                    if (i === 0) {
                      startX = x;
                    } else {
                      const diff = (barPlotWidth / numValuesAmount) * (i - 1);

                      startX = x + barPlotWidth / numValuesAmount + diff + 0.5;
                    }

                    return (
                      <Fragment key={i}>
                        <rect
                          key={i}
                          x={startX}
                          y={y}
                          height={height}
                          width={barPlotWidth / numValuesAmount}
                          onMouseMove={handleMouseOver(val, colors?.[i])}
                          onMouseLeave={handleMouseLeave}
                          fill={colors?.[i]}
                        />
                      </Fragment>
                    );
                  })}
                  <text x={x + barPlotWidth / 2} y={xAxisY + 16} textAnchor="middle">
                    {value.name}
                  </text>
                </g>
              );
            }),
          // eslint-disable-next-line
          [width, height, data],
        )}
      </svg>
      {legends && <Legends legends={legends} colors={colors} />}
      {showTooltip && <Tooltip text={tooltipText} {...mouseCoords} />}
    </div>
  );
};
