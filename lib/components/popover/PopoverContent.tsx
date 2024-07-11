import { useEffect, useRef, Dispatch, ReactNode } from 'react';
import { CalendarAction } from '~/types';
import { useBindPopover } from './useBindPopover';

interface PopoverContentProps {
	anchor: Element;
	dispatch: Dispatch<CalendarAction>;
	zIndex: number;
	children: ReactNode;
}

export function PopoverContent({ anchor, dispatch, zIndex, children }: PopoverContentProps) {
	const styles = useRef({});
	const { refs, floatingStyles } = useBindPopover({ anchor, dispatch });

	useEffect(() => {
		setTimeout(() => {
			styles.current = { transitionDuration: '250ms', transitionProperty: 'all' };
		}, 100);
	}, []);

	return (
		<div ref={refs.setFloating} style={{ ...floatingStyles, ...styles.current, zIndex: zIndex }}>
			<div onClick={e => e.stopPropagation()}>{children}</div>
		</div>
	);
}
