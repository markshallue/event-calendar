import dayjs from 'dayjs';
import classes from './TimeIndicator.module.css';

const NOW = dayjs();

export function TimeIndicator({ isDayView }: { isDayView?: boolean }) {
  return (
    <div
      className={classes.wrapper}
      style={{
        gridColumn: isDayView ? 1 : NOW.day() + 1,
        gridRow: NOW.hour() * 4 + Math.round(NOW.minute() / 15) + 1,
      }}
    >
      <div className={classes.dot}></div>
      <div className={classes.line}></div>
    </div>
  );
}
