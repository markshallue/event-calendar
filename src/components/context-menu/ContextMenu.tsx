import { Card } from '@mantine/core';

import { EventsCalendarContextMenuProps } from '~/types';

import { HandleSubmitArgs } from '@/utils';

import { EventActions } from '../event-actions';

interface ContextMenuProps extends EventsCalendarContextMenuProps {
	handleSubmit: (args: HandleSubmitArgs) => void;
	setPopoverType?: (type: 'view' | 'edit') => void;
	closeContextMenu: () => void;
}

export function ContextMenu({
	setPopoverType,
	openPopover,
	onClose,
	event,
	handleSubmit,
	closeContextMenu,
}: ContextMenuProps) {
	return (
		<Card p='0.25rem' withBorder shadow='md'>
			<EventActions
				setPopoverType={setPopoverType}
				openPopover={openPopover}
				event={event}
				handleSubmit={handleSubmit}
				onClose={onClose}
				closeContextMenu={closeContextMenu}
				type='buttons'
			/>
		</Card>
	);
}
