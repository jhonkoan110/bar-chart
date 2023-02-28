import React, { Fragment, useMemo } from 'react';
import { BarChartProps } from '..';
import { useMouseMoveTooltip } from '../../../hooks/useMouseMoveTooltip';
import { getChartCalcs, getNumberValues } from '../../../utils/getChartCalcs';
import { XAxis } from '../XAxis';
import { YAxis } from '../YAxis';

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
  const { handleMouseLeave, handleMouseOver, mouseCoords, showTooltip, tooltipText, tooltipTextColor } =
    useMouseMoveTooltip();
  const { barPlotWidth, dataYMax, dataYMin, dataYRange, x0, xAxisLength, xAxisY, y0, yAxisLength } = useMemo(() => {
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

        <YAxis
          dataYMax={dataYMax}
          dataYRange={dataYRange}
          ticks={ticks}
          x0={x0}
          y0={y0}
          yAxisLength={yAxisLength}
          yAxisName={yAxisName}
        />

        {/* Bars */}
        {useMemo(
          () =>
            data.map((value, index) => {
              const sidePadding = 10;
              const tmp = index !== 0 ? sidePadding : 0;
              const x = x0 + index * barPlotWidth + tmp * index;
              const numValues = getNumberValues(value);
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
                        {/* <defs>
                          <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop
                              offset="0%"
                              style={{
                                stopColor: '#ec7979',
                                stopOpacity: 0.5,
                              }}
                            />
                            <stop
                              offset="0%"
                              style={{
                                stopColor: '#e41010',
                                stopOpacity: 1,
                              }}
                            />
                            <stop
                              offset="0%"
                              style={{
                                stopColor: '#ec7979',
                                stopOpacity: 0.5,
                              }}
                            />
                          </linearGradient>
                        </defs> */}
                        <rect
                          key={i}
                          x={startX}
                          y={y}
                          height={height}
                          width={barPlotWidth / numValuesAmount}
                          onMouseMove={handleMouseOver(val, colors?.[i])}
                          onMouseLeave={handleMouseLeave}
                          // fill={colors?.[i]}
                          fill="url(#grad1)"
                          // style={{}}
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
          [width, height, data],
        )}
      </svg>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, paddingLeft: 50 }}>
        {legends?.map((legend, i) => (
          <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <div
              style={{ backgroundColor: colors?.[i] ?? 'black', width: 15, height: 15, transform: 'translateY(1px)' }}
            />{' '}
            - <p>{legend}</p>
          </div>
        ))}
      </div>
      {showTooltip && (
        <h1 style={{ position: 'fixed', color: tooltipTextColor, top: mouseCoords.y, left: mouseCoords.x }}>
          {tooltipText}
        </h1>
      )}
    </div>
  );
};
