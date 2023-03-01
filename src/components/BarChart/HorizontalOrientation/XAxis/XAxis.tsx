import { CHART_PADDING } from 'constants/barChart';

interface Props {
  xAxisY: number;
  xAxisLength: number;
  ticks: number;
  dataXMax: number;
  xAxisName?: string;
}

export const XAxis = (props: Props) => {
  // Линия оси.
  const lineX1 = CHART_PADDING;
  const lineY1 = props.xAxisY;
  const lineX2 = CHART_PADDING + props.xAxisLength;
  const lineY2 = props.xAxisY;

  return (
    <>
      <line x1={lineX1} y1={lineY1} x2={lineX2} y2={lineY2} stroke="grey" />

      {/* Разделители оси и названия */}
      {Array.from({ length: props.ticks }).map((_, index) => {
        const x = CHART_PADDING + (index + 1) * (props.xAxisLength / props.ticks);
        const xValue = ((index + 1) * (props.dataXMax / props.ticks)).toFixed(1);

        return (
          <g key={index}>
            <line x1={x} y1={props.xAxisY} x2={x} y2={props.xAxisY + 5} stroke="grey" />
            <text y={props.xAxisY + 25} x={x} textAnchor="middle">
              {xValue}
            </text>
          </g>
        );
      })}
      {props.xAxisName && (
        <text x={CHART_PADDING + props.xAxisLength + 5} y={props.xAxisY + 4}>
          {props.xAxisName}
        </text>
      )}
    </>
  );
};
