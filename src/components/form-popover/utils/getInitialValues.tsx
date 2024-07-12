import { CalendarEvent } from '~/types';
import { FormPopoverValues } from '../types';

export const getInitialValues = (event: CalendarEvent, defaultGroups?: string[]): FormPopoverValues => {
	return {
		title: event.title,
		info: event.info || '',
		groups: defaultGroups || event.groups?.map(g => g.label) || [],
		start: event.start?.toDate(),
		end: event.end?.toDate(),
		startTime: event.startTime || null,
		endTime: event.endTime || null,
	};
};
