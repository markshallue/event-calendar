import classes from './ViewPopover.module.css';

import { CalendarEvent } from '~/types';

import { HandleSubmitArgs } from '@/utils';
import { EventActions } from '@/components';

import { FilledBadge } from './FilledBadge';

interface ViewPopoverToolbarProps {
	event: CalendarEvent;
	onClose: () => void;
	setPopoverType: (type: 'view' | 'edit') => void;
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
		<div className={classes.toolbar}>
			{showBadge && <FilledBadge event={event} />}

			<div style={{ display: 'flex', gap: '0.25rem', flexGrow: 1, justifyContent: 'flex-end' }}>
				<EventActions
					onClose={onClose}
					setPopoverType={setPopoverType}
					event={event}
					handleSubmit={handleSubmit}
					withEditLink={withEditLink}
					withViewLink={withViewLink}
					type={editable ? 'icons' : 'links'}
				/>
			</div>
		</div>
	);
}
