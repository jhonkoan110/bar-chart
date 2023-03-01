import { memo } from 'react';
import styles from './Legends.module.css';

interface Props {
  legends: string[];
  colors?: string[];
}

export const Legends = memo((props: Props) => {
  return (
    <div className={styles.legends}>
      {props.legends.map((legend, i) => (
        <div key={i} className={styles.ledendItem}>
          <div className={styles.legendRect} style={{ backgroundColor: props.colors?.[i] ?? 'black' }} /> -{' '}
          <p>{legend}</p>
        </div>
      ))}
    </div>
  );
});
