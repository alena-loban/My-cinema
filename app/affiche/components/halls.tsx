import { Progress, ProgressProps } from 'antd';
import styles from './styles.module.scss';

const classNames: ProgressProps['classNames'] = {
  root: 'demo-progress-root',
  rail: 'demo-progress-rail',
  track: 'demo-progress-track',
};

const stylesFn: ProgressProps['styles'] = info => {
  const percent = info?.props?.percent ?? 0;
  const hue = 200 - (200 * percent) / 100;
  return {
    track: {
      backgroundImage: `
    linear-gradient(
      90deg,
      rgb(85, 100, 244) 50.02%,
      rgb(255, 58, 70) 100%
    )`,
      borderRadius: 8,
      transition: 'all 0.3s ease',
    },
    rail: {
      backgroundColor: 'rgba(0, 0, 0, 0.1)',
      borderRadius: 8,
    },
  } satisfies ProgressProps['styles'];
};
const Halls = () => {
  return (
    <div className={styles.hallsWrapper}>
      <div className={styles.hall}>
        <div>21.10</div>
        <div className={styles.hr} />
        <div className={styles.info}>
          <span>RU</span>
          <span>2D</span>
          <span>DD</span>
        </div>
        <Progress
          styles={stylesFn}
          percent={90}
          percentPosition={{ align: 'start', type: 'inner' }}
          size={[300, 20]}
          //   strokeColor="rgb(85, 100, 244)"
          className={styles.progress}
          showInfo={false}
        />

        <div className={styles.hr} />
      </div>
    </div>
  );
};
export default Halls;
