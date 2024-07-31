import { ReactNode } from 'react';
import { PopoverContent } from './PopoverContent';

interface PopoverProps {
	anchor: HTMLDivElement;
	isOpen: boolean;
	zIndex?: number;
	children: ReactNode;
}

export function EventsCalendarPopover({ anchor, isOpen, zIndex = 100, children }: PopoverProps) {
	return (
		<>
			{isOpen && anchor && (
				<PopoverContent anchor={anchor} zIndex={zIndex}>
					{children}
				</PopoverContent>
			)}
		</>
	);
}
