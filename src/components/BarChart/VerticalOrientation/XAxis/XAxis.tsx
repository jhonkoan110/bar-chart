import { memo } from 'react';
import { CHART_PADDING } from '../../../../constants/barChart';

interface Props {
  xAxisY: number;
  xAxisLength: number;
  xAxisName: string;
}

export const XAxis = memo((props: Props) => {
  // Линия оси.
  const lineX1 = CHART_PADDING;
  const lineY1 = CHART_PADDING + props.xAxisLength;
  const lineX2 = CHART_PADDING + props.xAxisLength;
  const lineY2 = props.xAxisY;

  // Наименование оси.
  const textX = CHART_PADDING + props.xAxisLength + 5;
  const textY = props.xAxisY + 4;

  return (
    <>
      <line x1={lineX1} y1={lineY1} x2={lineX2} y2={lineY2} stroke="grey" />
      {props.xAxisName && (
        <text x={textX} y={textY}>
          {props.xAxisName}
        </text>
      )}
    </>
  );
});
