import classes from './InfoCard.module.css';

import { EventActions } from '@/components';
import { CalendarEvent } from '~/types';
import { FilledBadge } from './FilledBadge';
import { HandleSubmitArgs } from '@/components/form-card/types';

interface InfoCardToolbarProps {
	event: CalendarEvent;
	onClose: () => void;
	setPopoverType: (type: 'view' | 'edit') => void;
	handleSubmit: (args: HandleSubmitArgs) => void;
	withViewLink: boolean;
	withEditLink: boolean;
	editable: boolean;
}

export function InfoCardToolbar({
	withViewLink,
	withEditLink,
	editable,
	onClose,
	setPopoverType,
	event,
	handleSubmit,
}: InfoCardToolbarProps) {
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
