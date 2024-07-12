import { Badge } from '@mantine/core';
import { splitColourCSS } from '~/utils/functions';
import { CalendarEvent } from '~/types';

interface FilledBadgeProps {
	event: CalendarEvent;
}

export function FilledBadge({ event }: FilledBadgeProps) {
	if (!event.groups || event.groups.length === 0) return;
	const colors = event.groups.map(g => g.color);
	const label = event.groups.map(g => g.label).join(' • ');
	return (
		<Badge styles={{ root: { border: 0, backgroundImage: splitColourCSS(colors) } }} variant='filled'>
			{label}
		</Badge>
	);
}
