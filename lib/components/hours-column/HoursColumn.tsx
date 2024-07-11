import classes from './HoursColumn.module.css';

const hourLabels = [
  '1 AM',
  '2 AM',
  '3 AM',
  '4 AM',
  '5 AM',
  '6 AM',
  '7 AM',
  '8 AM',
  '9 AM',
  '10 AM',
  '11 AM',
  '12 PM',
  '1 PM',
  '2 PM',
  '3 PM',
  '4 PM',
  '5 PM',
  '6 PM',
  '7 PM',
  '8 PM',
  '9 PM',
  '10 PM',
  '11 PM',
];

export function HoursColumn() {
  return (
    <div className={classes.hoursColumn}>
      {hourLabels.map((hour) => (
        <div className={classes.hour} key={hour}>
          <span className={classes.hourLabel}>{hour}</span>
        </div>
      ))}
    </div>
  );
}
