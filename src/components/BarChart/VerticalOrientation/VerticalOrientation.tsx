import { Fragment, useMemo } from 'react';
import { useMouseMoveTooltip } from 'hooks/useMouseMoveTooltip';
import { Tooltip } from 'components/Tooltip/Tooltip';
import { XAxis } from './XAxis';
import { YAxis } from './YAxis';
import { BarChartProps } from 'types/BarChart';
import { useChartCalcs } from 'hooks/useChartCalcs';
import { CHART_PADDING } from 'constants/barChart';

export const VerticalOrientaion = ({
  ticks = 5,
  xAxisName = 'x',
  yAxisName = 'y',
  ...props
}: Omit<BarChartProps, 'orientation'>) => {
  const { handleMouseLeave, handleMouseOver, mouseCoords, showTooltip, tooltipText } = useMouseMoveTooltip();
  const { barPlotWidth, dataYMax, xAxisLength, xAxisY, yAxisLength } = useChartCalcs({
    height: props.height,
    width: props.width,
    data: props.data,
  });

  return (
    <div style={{ width: props.width }}>
      <svg width={props.width} height={props.height} className={props.containerClassName}>
        <XAxis xAxisLength={xAxisLength} xAxisName={xAxisName} xAxisY={xAxisY} />

        <YAxis dataYMax={dataYMax} ticks={ticks} yAxisLength={yAxisLength} yAxisName={yAxisName} />

        {/* Bars */}
        {useMemo(
          () =>
            props.data.map((value, index) => {
              const sidePadding = 10;
              const side = index !== 0 ? sidePadding : 0;
              const x = CHART_PADDING + index * barPlotWidth + side * index;
              const numValues = value.values;
              const numValuesAmount = numValues.length;
              const yArr = numValues.map((val) => {
                const yRatio = val / dataYMax;

                return {
                  y: CHART_PADDING + (1 - yRatio) * yAxisLength,
                  height: yRatio * yAxisLength,
                  val,
                };
              });

              return (
                <g key={index}>
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
                          onMouseMove={handleMouseOver(val)}
                          onMouseLeave={handleMouseLeave}
                          fill={props.colors?.[i]}
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
          [props.width, props.height, props.data],
        )}
      </svg>
      {showTooltip && <Tooltip text={tooltipText} {...mouseCoords} />}
    </div>
  );
};
