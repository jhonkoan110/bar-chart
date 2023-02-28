import React, { useMemo } from 'react';
import { BarChartProps } from '..';
import { useMouseMoveTooltip } from '../../../hooks/useMouseMoveTooltip';
import { getChartCalcs, getNumberValues } from '../../../utils/getChartCalcs';
import { XAxis } from '../XAxis';
import { YAxis } from '../YAxis';

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
  const { handleMouseLeave, handleMouseOver, mouseCoords, showTooltip, tooltipText, tooltipTextColor } =
    useMouseMoveTooltip();
  const { barPlotWidth, dataYMax, dataYMin, dataYRange, x0, xAxisLength, xAxisY, y0, yAxisLength } = useMemo(() => {
    return getChartCalcs({
      height,
      width,
      data,
    });
  }, [width, height, data]);

  // {Array.from({ length: ticks }).map((_, index) => {
  //   const y = y0 + index * (yAxisLength / ticks);
  //   const yValue = Math.round(dataYMax - index * (dataYMax / ticks));

  //   return (
  //     <g key={index}>
  //       <line x1={x0} y1={y} x2={x0 - 5} y2={y} stroke="grey" />
  //       <text x={x0 - 5} y={y + 5} textAnchor="end">
  //         {yValue}
  //       </text>
  //     </g>
  //   );
  // })}

  return (
    <div style={{ width }}>
      <svg width={width} height={height} className={containerClassName}>
        {/* X axis */}
        <line x1={x0} y1={xAxisY} x2={x0 + xAxisLength} y2={xAxisY} stroke="grey" />
        {Array.from({ length: ticks }).map((_, index) => {
          const x = x0 + index * (xAxisLength / ticks);
          const xValue = Math.round(dataYMax - index * (dataYMax / ticks));

          return (
            <g key={index}>
              <line x1={x} y1={xAxisY} x2={x} y2={xAxisY + 5} stroke="grey" />
              <text y={xAxisY + 25} x={x + 10} textAnchor="end">
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

        {/* Y axis */}
        <line x1={x0} y1={y0} x2={x0} y2={y0 + yAxisLength} stroke="grey" />
        {yAxisName && (
          <text x={x0} y={y0 - 15} textAnchor="middle">
            {yAxisName}
          </text>
        )}

        <text x={x0 - 20} y={y0 + yAxisLength + 20}>
          0
        </text>
        {/* <XAxis  /> */}
        {/* <XAxis x0={x0} xAxisLength={xAxisLength} xAxisName={xAxisName} xAxisY={xAxisY} />
        

        <YAxis
          dataYMax={dataYMax}
          dataYRange={dataYRange}
          ticks={ticks}
          x0={x0}
          y0={y0}
          yAxisLength={yAxisLength}
          yAxisName={yAxisName}
        /> */}

        {/* Bars */}
        {useMemo(
          () =>
            data.map((value, index) => {
              const sidePadding = 10;
              const side = index !== 0 ? sidePadding : 0;
              const x = x0 + index * barPlotWidth + side * index;
              const numValues = getNumberValues(value);
              const numValuesAmount = numValues.length;
              const yArr = numValues.map((val) => {
                // const yRatio = (val - dataYMin) / dataYRange;
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
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ backgroundColor: colors?.[i] ?? 'black', width: 15, height: 15 }} /> - <p>{legend}</p>
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
