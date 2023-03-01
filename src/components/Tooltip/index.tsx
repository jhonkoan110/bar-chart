import React from 'react';
import styles from './Tooltip.module.css';

interface Props {
  x: number;
  y: number;
  text: string;
}

export const Tooltip = ({ x, y, text }: Props) => {
  return (
    <div className={styles.container} style={{ left: x, top: y }}>
      {text}
    </div>
  );
};
