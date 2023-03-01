import styles from './Tooltip.module.css';

interface Props {
  x: number;
  y: number;
  text: string;
}

export const Tooltip = (props: Props) => {
  return (
    <div className={styles.container} style={{ left: props.x + 15, top: props.y + 10 }}>
      {props.text}
    </div>
  );
};
