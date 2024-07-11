import classes from './OverflowArrow.module.css';

interface OverflowArrowProps {
  color: string;
  isHidden: boolean;
  isCompact: boolean;
  dir: 'left' | 'right';
}

export function OverflowArrow({ color, isHidden, isCompact, dir = 'left' }: OverflowArrowProps) {
  if (isHidden) return;
  const arrowSize = isCompact ? 9 : 10;

  const arrowStyle =
    dir === 'left'
      ? { borderRightColor: color, borderRightWidth: arrowSize }
      : { right: 0, borderLeftColor: color, borderLeftWidth: arrowSize, zIndex: 202 };

  return (
    <div
      className={classes.arrow}
      style={{
        width: arrowSize,
        borderTopWidth: arrowSize,
        borderBottomWidth: arrowSize,
        ...arrowStyle,
      }}
    ></div>
  );
}
