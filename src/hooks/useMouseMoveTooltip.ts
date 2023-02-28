import { useState } from 'react';

export const useMouseMoveTooltip = () => {
  const [mouseCoords, setMouseCoords] = useState({ x: 0, y: 0 });
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipText, setTooltipText] = useState('');
  const [tooltipTextColor, setTooltipTextColor] = useState('black');

  const handleMouseOver =
    (val: number, color: React.CSSProperties['color'] = 'black') =>
    (e: React.MouseEvent<SVGRectElement>) => {
      const { clientX, clientY } = e;

      setTooltipTextColor(color);
      setMouseCoords({ x: clientX, y: clientY });
      setTooltipText(String(val));

      if (!showTooltip) {
        setShowTooltip(true);
      }
    };

  const handleMouseLeave = () => {
    setShowTooltip(false);
    setMouseCoords({ x: 0, y: 0 });
  };

  return { mouseCoords, showTooltip, tooltipText, tooltipTextColor, handleMouseOver, handleMouseLeave };
};
