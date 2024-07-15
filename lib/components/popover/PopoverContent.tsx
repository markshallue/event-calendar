import { useEffect, useRef, ReactNode } from 'react';
import { useBindPopover } from './useBindPopover';

interface PopoverContentProps {
	anchor: Element;
	zIndex: number;
	children: ReactNode;
}

export function PopoverContent({ anchor, zIndex, children }: PopoverContentProps) {
	const styles = useRef({});
	const { refs, floatingStyles } = useBindPopover({ anchor });

	// Only apply repositioning styles after element is mounted
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
