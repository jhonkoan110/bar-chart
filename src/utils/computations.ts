const getViewDimension = (svgSide: number, padding: number) => svgSide - padding * 2;

const getValueRatio = (viewSide: number, delta: number) => viewSide / delta;

const getPointsRatio = (viewSide: number, dataLength: number) => viewSide / dataLength;

const getDelta = (minVal: number, maxVal: number) => maxVal - minVal;

export { getViewDimension, getValueRatio, getPointsRatio, getDelta };
