import classes from './CircularLoader.module.css';

export function CircularLoader({ visible }: { visible: boolean }) {
  if (!visible) return;
  return (
    <div className={classes.loaderWrapper}>
      <span className={classes.loader}></span>
    </div>
  );
}
