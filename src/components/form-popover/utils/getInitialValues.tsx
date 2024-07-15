import { CalendarEvent } from '~/types';
import { FormPopoverValues } from '../types';

export const getInitialValues = (event: CalendarEvent | null, defaultGroups?: string[]): FormPopoverValues => {
	return {
		title: event?.title || 'Untitled',
		info: event?.info || '',
		groups: defaultGroups || event?.groups?.map(g => g.label) || [],
		start: event?.start?.toDate() || new Date(),
		end: event?.end?.toDate() || new Date(),
		startTime: event?.startTime || null,
		endTime: event?.endTime || null,
	};
};
