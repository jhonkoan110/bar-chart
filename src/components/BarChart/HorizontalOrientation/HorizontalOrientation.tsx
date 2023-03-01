import { Fragment, useMemo } from 'react';
import { BarChartProps } from '../../..';
import { CHART_PADDING } from '../../../constants/barChart';
import { useChartCalcs } from '../../../hooks/useChartCalcs';
import { useMouseMoveTooltip } from '../../../hooks/useMouseMoveTooltip';
import { Tooltip } from '../../Tooltip';
import { XAxis } from './XAxis';
import { YAxis } from './YAxis';

export const HorizontalOrientaion = ({
  ticks = 5,
  xAxisName = 'x',
  yAxisName = 'y',
  ...props
}: Omit<BarChartProps, 'orientation'>) => {
  const { handleMouseLeave, handleMouseOver, mouseCoords, showTooltip, tooltipText } = useMouseMoveTooltip();
  const {
    dataYMax: dataXMax,
    xAxisLength,
    xAxisY,
    yAxisLength,
  } = useChartCalcs({
    height: props.height,
    width: props.width,
    data: props.data,
  });

  const barPlotHeight = yAxisLength / props.data.length - 10;

  return (
    <div style={{ width: props.width }}>
      <svg width={props.width} height={props.height} className={props.containerClassName}>
        <XAxis dataXMax={dataXMax} ticks={ticks} xAxisLength={xAxisLength} xAxisY={xAxisY} xAxisName={xAxisName} />
        <YAxis yAxisLength={yAxisLength} yAxisName={yAxisName} />

        <text x={CHART_PADDING - 20} y={CHART_PADDING + yAxisLength + 20}>
          0
        </text>

        {/* Bars */}
        {useMemo(
          () =>
            props.data.map((value, index) => {
              const sidePadding = 10;
              const side = index !== 0 ? sidePadding : 0;
              const y = yAxisLength - index * barPlotHeight - side * index + CHART_PADDING;
              const numValues = value.values;
              const numValuesAmount = numValues.length;
              const xArr = numValues.map((val) => {
                const xRatio = val / dataXMax;

                return {
                  x: CHART_PADDING,
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
                          onMouseMove={handleMouseOver(val)}
                          onMouseLeave={handleMouseLeave}
                          fill={props.colors?.[i]}
                        />
                      </Fragment>
                    );
                  })}
                  <text x={CHART_PADDING - 30} y={y - barPlotHeight / 2}>
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
