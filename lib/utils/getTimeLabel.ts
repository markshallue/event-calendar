import { CalendarEvent } from '~/types';

export function getTimeLabel(event: CalendarEvent, timeDuration: number) {
	if (!event.start || !event.end) return '';
	const leadingComma = timeDuration <= 30 ? ', ' : '';
	return event.start.isBefore(event.end)
		? `${leadingComma}${event.start.format('h:mma')} - ${event.end.format('h:mma')}`
		: `${leadingComma}${event.end.format('h:mma')} - ${event.start.format('h:mma')}`;
}
