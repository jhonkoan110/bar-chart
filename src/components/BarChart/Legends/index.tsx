import React, { memo } from 'react';
import styles from './Legends.module.css';

interface Props {
  legends: string[];
  colors?: string[];
}

export const Legends = memo(({ legends, colors }: Props) => {
  return (
    <div className={styles.legends}>
      {legends.map((legend, i) => (
        <div className={styles.ledendItem}>
          <div className={styles.legendRect} style={{ backgroundColor: colors?.[i] ?? 'black' }} /> - <p>{legend}</p>
        </div>
      ))}
    </div>
  );
});
