import { CHART_PADDING } from '../../../../constants/barChart';

interface Props {
  yAxisLength: number;
  yAxisName: string;
}

export const YAxis = (props: Props) => {
  // Линия оси.
  const lineX1 = CHART_PADDING;
  const lineY1 = CHART_PADDING;
  const lineX2 = CHART_PADDING;
  const lineY2 = CHART_PADDING + props.yAxisLength;

  // Наименование оси.
  const textX = CHART_PADDING;
  const textY = CHART_PADDING - 15;

  return (
    <>
      <line x1={lineX1} y1={lineY1} x2={lineX2} y2={lineY2} stroke="grey" />
      {props.yAxisName && (
        <text x={textX} y={textY} textAnchor="middle">
          {props.yAxisName}
        </text>
      )}
    </>
  );
};
