import { Dispatch, ReactNode } from 'react';
import { PopoverContent } from './PopoverContent';
import { CalendarAction } from '~/types';

interface PopoverProps {
	anchor: Element | null;
	dispatch: Dispatch<CalendarAction>;
	isOpen: boolean;
	zIndex?: number;
	children: ReactNode;
}

export function Popover({ anchor, dispatch, isOpen, zIndex = 500, children }: PopoverProps) {
	return (
		<>
			{isOpen && anchor && (
				<PopoverContent anchor={anchor} dispatch={dispatch} zIndex={zIndex}>
					{children}
				</PopoverContent>
			)}
		</>
	);
}
