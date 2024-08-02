import { Card } from '@mantine/core';

import { CalendarEvent, EventsCalendarContextMenuProps } from '~/types';

import { HandleSubmitArgs } from '@/types';

import { EventActions } from '../event-actions';

interface ContextMenuProps extends EventsCalendarContextMenuProps {
	handleSubmit: (args: HandleSubmitArgs) => void;
	setPopoverType?: (type: 'view' | 'edit') => void;
	renderCustomEditControls?: (event: CalendarEvent, type: 'icons' | 'buttons', close: () => void) => React.ReactNode;
	renderContextMenuControls?: (event: CalendarEvent) => React.ReactNode;
	closeContextMenu: () => void;
}

export function ContextMenu({
	setPopoverType,
	openPopover,
	onClose,
	event,
	handleSubmit,
	closeContextMenu,
	renderCustomEditControls,
	renderContextMenuControls,
}: ContextMenuProps) {
	return (
		<Card p='0.25rem' withBorder shadow='md'>
			{renderContextMenuControls ? (
				renderContextMenuControls(event)
			) : (
				<EventActions
					setPopoverType={setPopoverType}
					openPopover={openPopover}
					event={event}
					handleSubmit={handleSubmit}
					onClose={onClose}
					closeContextMenu={closeContextMenu}
					renderCustomEditControls={renderCustomEditControls}
					type='buttons'
				/>
			)}
		</Card>
	);
}
