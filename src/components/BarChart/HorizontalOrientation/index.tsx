import React, { Fragment, useMemo } from 'react';
import { BarChartProps } from '..';
import { useMouseMoveTooltip } from '../../../hooks/useMouseMoveTooltip';
import { getChartCalcs } from '../../../utils/getChartCalcs';
import { Tooltip } from '../../Tooltip';
import { Legends } from '../Legends';
import { XAxis } from './XAxis';
import { YAxis } from './YAxis';

export const HorizontalOrientaion = ({
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
  const {
    dataYMax: dataXMax,
    x0,
    xAxisLength,
    xAxisY,
    y0,
    yAxisLength,
  } = useMemo(() => {
    return getChartCalcs({
      height,
      width,
      data,
    });
  }, [width, height, data]);

  const barPlotHeight = yAxisLength / data.length - 10;

  return (
    <div style={{ width }}>
      <svg width={width} height={height} className={containerClassName}>
        <XAxis
          dataXMax={dataXMax}
          ticks={ticks}
          x0={x0}
          xAxisLength={xAxisLength}
          xAxisY={xAxisY}
          xAxisName={xAxisName}
        />

        <YAxis x0={x0} y0={y0} yAxisLength={yAxisLength} yAxisName={yAxisName} />

        <text x={x0 - 20} y={y0 + yAxisLength + 20}>
          0
        </text>

        {/* Bars */}
        {useMemo(
          () =>
            data.map((value, index) => {
              const sidePadding = 10;
              const side = index !== 0 ? sidePadding : 0;
              const y = yAxisLength - index * barPlotHeight - side * index + y0;
              const numValues = value.values;
              const numValuesAmount = numValues.length;
              const xArr = numValues.map((val) => {
                const xRatio = val / dataXMax;

                return {
                  x: x0,
                  width: xRatio * xAxisLength,
                  val,
                };
              });

              return (
                <g key={index} className="group">
                  {xArr.map(({ x, val, width }, i) => {
                    let startY;

                    if (i === 0) {
                      startY = y - barPlotHeight / numValuesAmount;
                    } else {
                      const diff = (barPlotHeight / numValuesAmount) * (i - 1);

                      startY = y - (2 * barPlotHeight) / numValuesAmount - diff - 0.5;
                    }

                    return (
                      <Fragment key={i}>
                        <rect
                          key={i}
                          x={x}
                          y={startY}
                          height={barPlotHeight / numValuesAmount}
                          width={width}
                          onMouseMove={handleMouseOver(val, colors?.[i])}
                          onMouseLeave={handleMouseLeave}
                          fill={colors?.[i]}
                        />
                      </Fragment>
                    );
                  })}
                  <text x={x0 - 30} y={y - barPlotHeight / 2}>
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
