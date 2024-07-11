import { MouseEvent, useCallback, useRef, useState } from 'react';

interface useLongPressProps {
  onLongPress: () => void;
  onPressEnd?: () => void;
  onClick?: () => void;
  delay?: number;
}

export const useLongPress = ({
  onLongPress,
  onPressEnd,
  onClick,
  delay = 250,
}: useLongPressProps) => {
  const [longPressTriggered, setLongPressTriggered] = useState(false);
  const timeout = useRef<NodeJS.Timeout>();

  const start = useCallback(() => {
    timeout.current = setTimeout(() => {
      onLongPress();
      setLongPressTriggered(true);
    }, delay);
  }, [onLongPress, delay]);

  const clear = useCallback(
    (shouldTriggerClick: boolean = true) => {
      timeout.current && clearTimeout(timeout.current);
      shouldTriggerClick && !longPressTriggered && onClick && onClick();
      onPressEnd && onPressEnd();
      setLongPressTriggered(false);
    },
    [longPressTriggered, onClick, onPressEnd]
  );

  return {
    onMouseDown: (e: MouseEvent) => {
      e.stopPropagation();
      start();
    },
    onTouchStart: () => start(),
    onMouseUp: () => clear(),
    onMouseLeave: () => clear(false),
    onTouchEnd: () => clear(),
  };
};
