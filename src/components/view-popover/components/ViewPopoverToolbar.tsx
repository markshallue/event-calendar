import { CalendarEvent } from '~/types';

import { HandleSubmitArgs } from '@/types';
import { EventActions } from '@/components';

import { FilledBadge } from './FilledBadge';
import { Group } from '@mantine/core';

interface ViewPopoverToolbarProps {
	event: CalendarEvent;
	onClose: () => void;
	setPopoverType?: (type: 'view' | 'edit') => void;
	withViewLink: boolean;
	withEditLink: boolean;
	editable: boolean;
	handleSubmit?: (args: HandleSubmitArgs) => void;
}

export function ViewPopoverToolbar({
	withViewLink,
	withEditLink,
	editable,
	onClose,
	setPopoverType,
	event,
	handleSubmit,
}: ViewPopoverToolbarProps) {
	// Variants
	const showBadge = event.groups && event.groups.length !== 0;

	if (!showBadge && !withEditLink && !withViewLink) return;

	return (
		<Group px='md' py='xs' style={{ flexShrink: 0, borderTop: '1px solid var(--mantine-color-gray-3)' }}>
			{showBadge && <FilledBadge event={event} />}

			<Group gap='0.25rem' justify='flex-end' style={{ flexGrow: 1 }}>
				<EventActions
					onClose={onClose}
					setPopoverType={setPopoverType}
					event={event}
					handleSubmit={handleSubmit}
					withEditLink={withEditLink}
					withViewLink={withViewLink}
					type={editable ? 'icons' : 'links'}
				/>
			</Group>
		</Group>
	);
}
