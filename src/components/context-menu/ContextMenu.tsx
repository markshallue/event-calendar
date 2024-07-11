import { Card } from '@mantine/core';

import { EventsCalendarContextMenuProps } from '~/types';
import { EventActions } from '../event-actions';

interface ContextMenuProps extends EventsCalendarContextMenuProps {
	handleSubmit: (args: unknown) => void;
	closeContextMenu: () => void;
}

export function ContextMenu({ setPopoverType, onClose, event, handleSubmit, closeContextMenu }: ContextMenuProps) {
	return (
		<Card p='0.25rem' withBorder shadow='md'>
			<EventActions
				setPopoverType={setPopoverType}
				event={event}
				handleSubmit={handleSubmit}
				onClose={onClose}
				closeContextMenu={closeContextMenu}
				type='buttons'
			/>
		</Card>
	);
}
